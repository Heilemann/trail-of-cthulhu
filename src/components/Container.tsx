import { useContext, useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { TDocument, TDocumentType, TValues } from '../interfaces'
import DragAndDrop from './DragAndDrop'
import useMessageToApp from './UseMessageToApp'
import Book from './book/Book'
import Character from './character/Character'
import context from './context'
import Handout from './handout/Handout'
import Note from './note/Note'
import Scene from './scene/Scene'
import Weapon from './weapon/Weapon'
import usePostMessageListener from './hooks/usePostMessageListener'

export default function Container() {
	const { state, dispatch } = useContext(context)
	const [document, setDocument] = useState<TDocument | null>(state.document)
	const [type, setType] = useState<TDocumentType | null>(state.document?.type)
	const { watch } = useFormContext<TValues>()
	const resetInProgress = useRef(false)

	const messageToApp = useMessageToApp()
	usePostMessageListener({ resetInProgress })

	// type is how we control which sheet to show, if the document is updated
	// we want to make sure we update the type as well
	useEffect(() => {
		setType(document?.type || null)
	}, [document])

	const handleDocumentChanges = () => {
		const subscription = watch(values => {
			if (!values || !document) return
			if (JSON.stringify(values) === JSON.stringify(document.values)) return
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
				payload: { values: values },
			})

			messageToApp({ message: 'save', data: payload })
		})

		return () => {
			subscription.unsubscribe()
		}
	}
	useEffect(handleDocumentChanges, [JSON.stringify(document)]) // eslint-disable-line

	// tell the platform we're ready to receive messages,
	// the first of which will be 'load' containing our data
	useEffect(() => {
		messageToApp({ message: 'system is ready', data: null })
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (!state.document) return
		setDocument(state.document)
		setType(state.document.type)
	}, [state.document])

	if (!type) return null

	return (
		<DragAndDrop>
			<div className='bottom-0 box-border flex min-h-full w-full flex-col bg-gray-100 p-4 text-sm text-gray-900 dark:bg-gray-900 dark:text-gray-100'>
				{type === 'character' && <Character />}
				{type === 'note' && <Note />}
				{type === 'book' && <Book />}
				{type === 'scene' && <Scene />}
				{type === 'weapon' && <Weapon />}
				{type === 'handout' && <Handout />}
			</div>
		</DragAndDrop>
	)
}
