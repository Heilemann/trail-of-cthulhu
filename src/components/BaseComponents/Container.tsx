// The Container component is the parent of all the other components. It is responsible for
// rendering the correct component based on the document type. It also handles outbound
// communication to the platform.
import _ from 'lodash'
import { useContext, useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { TDocument, TDocumentType, TValues } from '../../interfaces'
import useMessageToApp from './hooks/UseMessageToApp'
import usePostMessageListener from './hooks/usePostMessageListener'
import TypeSwitcher from '../TypeSwitcher'
import context from './context'

export default function Container() {
	const { state, dispatch } = useContext(context)
	const [document, setDocument] = useState<TDocument | null>(state.document)
	const [type, setType] = useState<TDocumentType | null>(state.document?.type)
	const { watch } = useFormContext<TValues>()
	const resetInProgress = useRef(false)
	const messageToApp = useMessageToApp()
	usePostMessageListener({ resetInProgress })

	const handleDocumentChanges = () => {
		// type controls the sheet to show, if the document is updated
		// we update the type as well
		setType(document?.type || null)

		const subscription = watch(values => {
			if (!values || !document) return
			if (_.isEqual(values, document.values)) return
			if (resetInProgress.current) {
				resetInProgress.current = false
				return
			}

			console.log('>>>>>>>>>> TOC values changed', values)

			const payload = {
				...document,
				values: {
					...document.values,
					...values,
				},
			}

			dispatch({
				type: 'UPDATE_DOCUMENT_VALUES',
				payload: {
					documentId: document._id,
					values: values,
				},
			})

			messageToApp({ message: 'save', data: payload })
		})

		return () => {
			subscription.unsubscribe()
		}
	}
	useEffect(handleDocumentChanges, [document]) // eslint-disable-line

	useEffect(() => {
		// tell the platform we're ready to receive messages,
		// the first of which will be 'load' containing our data
		messageToApp({ message: 'system is ready', data: null })
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (!state.document) return
		setDocument(state.document)
		setType(state.document.type)
	}, [state.document])

	if (!type) return null

	return <TypeSwitcher type={type} />
}
