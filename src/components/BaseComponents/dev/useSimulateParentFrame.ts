// This hook is used by the DevMode component to simulate how the platform
// handles post messages from the system. It's very incomplete, but will get built
// out later. Source in these messages is 'Aux' because in production the 'App'
// sends message to 'Aux' which then forwards them to the system.
import { useContext, useEffect } from 'react'
import { TEditMode, TState } from '../../../interfaces/interfaces'
import defaultDocuments from '../../defaultData'
import context from '../context'

let initialData: TState = {
	editMode: 'edit' as TEditMode,
	documentId: defaultDocuments.allIds[0],
	document: defaultDocuments.byId[defaultDocuments.allIds[0]],
	documents: defaultDocuments,
	assets: {
		byId: {},
		allIds: [],
	},
}

const useSimulateParentFrame = () => {
	const { state } = useContext(context)

	const simulatedMessages = ({ data: payload }: any) => {
		const { message, source, data } = payload

		if (source !== 'System') return

		switch (message) {
			case 'system is ready':
				let loadedState = JSON.parse(localStorage.getItem('state') || '{}')

				if (Object.keys(loadedState).length)
					initialData = {
						...initialData,
						...loadedState,
					}

				console.log('App sending initial load message to system:', initialData)

				window.parent.postMessage({
					source: 'Aux',
					message: 'load',
					data: initialData,
				})

				break

			case 'save':
				if (!Object.keys(state).length) return

				const newState = { ...state }

				// update the document in the state
				newState.documents.byId[data._id] = data

				localStorage.setItem('state', JSON.stringify(newState))

				break

			case 'upload asset':
				console.log(
					'App received "upload asset" (does nothing in devmode):',
					data,
				)

				break

			case 'remove asset':
				console.log(
					'App received "remove asset" (does nothing in devmode):',
					data,
				)

				break

			case 'send message':
				console.log(
					'App received "send message" (does nothing in devmode):',
					data,
				)

				break

			case 'set scene':
				console.log('App received "set scene" (does nothing in devmode):', data)

				break

			case 'open document':
				console.log(
					'App received "open document" (does nothing in devmode):',
					data,
				)

				break

			case 'generate':
				console.log('App received "generate" (does nothing in devmode):', data)

				break
		}
	}

	useEffect(() => {
		console.log('usesimulateparentframe, listen for messages')
		window.addEventListener('message', simulatedMessages)
		return () => {
			window.removeEventListener('message', simulatedMessages)
		}
	}, []) // eslint-disable-line react-hooks/exhaustive-deps
}

export default useSimulateParentFrame
