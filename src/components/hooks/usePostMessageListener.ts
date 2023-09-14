// listen for messages from the app in window.parent
// (which are forwarded by aux) deal with them as needed
import _ from 'lodash'
import { MutableRefObject, useCallback, useContext, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { TDocument, TSystemReceivableMessages, TValues } from '../../interfaces'
import context from '../context'

type Props = {
	resetInProgress: MutableRefObject<boolean>
}

const usePostMessageListener = ({ resetInProgress }: Props) => {
	const { state, dispatch } = useContext(context)
	const { reset } = useFormContext<TValues>()

	const messageListener = useCallback(
		(e: MessageEvent) => {
			const messagePayload = e.data as TSystemReceivableMessages
			const { message, source, data } = { ...messagePayload }
			const wrongSource = source !== 'Aux' && source !== 'App'

			if (wrongSource) return

			console.log('System received message:', message, data)

			switch (message) {
				case 'load':
					console.log('System received load message:', data)
					const { documentId } = data
					const document = data.documents?.find(
						(d: TDocument) => d._id === documentId,
					)

					if (!document) {
						throw new Error(`document with id ${documentId} not found by aux`)
					}

					const payload = {
						...data,
						document,
					}

					dispatch({
						type: 'LOAD',
						payload,
					})

					reset(payload.document.values)

					break

				case 'update data': {
					const { documentId } = data
					const newDocument = data.documents?.find(
						(d: TDocument) => d._id === documentId,
					)

					// if (!newDocument) {
					// 	console.error('New document not found')
					// 	return
					// }
					console.log('newDocument', newDocument)
					if (
						_.isEqual(data.documents, state.documents) &&
						_.isEqual(newDocument, state.document) &&
						_.isEqual(data.assets, state.assets)
					) {
						return
					}
					console.log('made it to the top')
					dispatch({
						type: 'LOAD',
						payload: {
							...data,
							document: newDocument,
						},
					})

					resetInProgress.current = true

					reset(newDocument?.values)
					console.log('made it to the bottom')
					break
				}

				case 'update document mode':
					dispatch({
						type: 'LOAD',
						payload: data,
					})
					break
			}
		},
		[dispatch, reset, resetInProgress], // eslint-disable-line react-hooks/exhaustive-deps
	)

	useEffect(() => {
		window.addEventListener('message', messageListener)
		return () => window.removeEventListener('message', messageListener)
	}, [state, messageListener])
}

export default usePostMessageListener
