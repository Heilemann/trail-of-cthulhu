import { useCallback, useContext, useEffect, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { TDocument, TSystemReceivableMessages, TValues } from '../interfaces'
import Character from './character/Character'
import context from './context'
import DragAndDrop from './DragAndDrop'
import Handout from './handout/Handout'
import Note from './note/Note'
import Scene from './scene/Scene'
import Weapon from './weapon/Weapon'

export interface IContainerProps {}

export default function Container(props: IContainerProps) {
	// const isDevelopment = process.env.NODE_ENV === 'development'
	const { state, dispatch } = useContext(context)
	const { document } = state
	const type = document?.type || null
	const form = useForm<TValues>({
		shouldUnregister: true,
	})

	const messageToApp = (message: string, data?: any) => {
		window.parent.postMessage({
			source: 'System',
			message,
			data,
		})
	}

	const resetInProgress = useRef(false)

	const handleFormChanges = () => {
		const subscription = form.watch(values => {
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

			messageToApp('save', payload)
		})

		return () => {
			subscription.unsubscribe()
		}
	}
	useEffect(handleFormChanges, [JSON.stringify(document)]) // eslint-disable-line

	const messageListener = useCallback(
		(e: MessageEvent) => {
			const messagePayload = e.data as TSystemReceivableMessages
			const { message, source, data } = { ...messagePayload }
			const wrongSource = source !== 'Aux' && source !== 'App'

			if (wrongSource) return

			switch (message) {
				case 'load':
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

					console.log('trail of chtulhu: load', payload)

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

					form.reset(newDocument?.values)

					break

				case 'update document mode':
					dispatch({
						type: 'LOAD',
						payload: data,
					})
					break
			}
		},
		// eslint-disable-next-line
		[dispatch, form, JSON.stringify(state)],
	)

	const initMessageListener = () => {
		window.addEventListener('message', messageListener)

		return () => {
			window.removeEventListener('message', messageListener)
		}
	}

	useEffect(initMessageListener, [state, messageListener])

	const addMessageToAppToState = useCallback(() => {
		dispatch({
			type: 'LOAD',
			payload: {
				messageToApp,
			},
		})

		messageToApp('system is ready')
	}, [dispatch])

	useEffect(addMessageToAppToState, [addMessageToAppToState])

	if (!type) return null

	return (
		<FormProvider {...form}>
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
		</FormProvider>
	)
}
