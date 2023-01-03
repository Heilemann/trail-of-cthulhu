import { useCallback, useContext, useEffect, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { TDocument, TSystemReceivableMessages, TValues } from '../interfaces'
import DragAndDrop from './DragAndDrop'
import useMessageToApp from './UseMessageToApp'
import Character from './character/Character'
import context from './context'
import Handout from './handout/Handout'
import Note from './note/Note'
import Scene from './scene/Scene'
import Weapon from './weapon/Weapon'

export default function Container() {
	const { state, dispatch } = useContext(context)
	const { document } = state
	const type = document?.type || null
	const { watch, reset } = useFormContext<TValues>()
	const resetInProgress = useRef(false)
	const messageToApp = useMessageToApp()

	useEffect(() => {
		alert('Container useEffect')
	}, [])

	const handleFormChanges = () => {
		const subscription = watch(values => {
			if (!values || !document) return
			if (JSON.stringify(values) === JSON.stringify(document.values)) return
			if (resetInProgress.current) {
				resetInProgress.current = false
				return
			}

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
	useEffect(handleFormChanges, [JSON.stringify(document)]) // eslint-disable-line

	// listen for messages from the app in window.parent
	// (which are forwarded by aux) deal with them as needed
	const messageListener = useCallback(
		(e: MessageEvent) => {
			const messagePayload = e.data as TSystemReceivableMessages
			const { message, source, data } = { ...messagePayload }
			const wrongSource = source !== 'Aux' && source !== 'App'

			if (wrongSource) return

			// make an alert that shows the message
			alert('Message: ' + message)

			console.log('system message received', messagePayload)

			switch (message) {
				case 'load data':
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

				case 'update data':
					const newDocument = data.documents?.find(
						(d: TDocument) => d._id === state.documentId,
					)

					if (
						JSON.stringify(newDocument?.values) ===
						JSON.stringify(state.document?.values)
					) {
						return
					}

					dispatch({
						type: 'LOAD',
						payload: {
							...data,
							document: newDocument,
						},
					})

					resetInProgress.current = true

					reset(newDocument?.values)

					break

				case 'update document mode':
					dispatch({
						type: 'LOAD',
						payload: data,
					})
					break
			}
		},
		[dispatch, reset, state.document?.values, state.documentId],
	)

	const initMessageListener = () => {
		window.addEventListener('message', messageListener)

		return () => {
			window.removeEventListener('message', messageListener)
		}
	}
	useEffect(initMessageListener, [state, messageListener])

	if (!type) return null

	return (
		<DragAndDrop>
			<div
				className='bottom-0 box-border flex min-h-full w-full flex-col bg-gray-100 p-4 text-sm text-gray-900 dark:bg-gray-900 dark:text-gray-100'
				onDrop={e => {
					console.log('dropped on iframe', e)
				}}
			>
				{/* <Sizes /> */}
				{type === 'character' && <Character />}
				{type === 'note' && <Note />}
				{type === 'scene' && <Scene />}
				{type === 'weapon' && <Weapon />}
				{type === 'handout' && <Handout />}
			</div>
		</DragAndDrop>
	)
}
