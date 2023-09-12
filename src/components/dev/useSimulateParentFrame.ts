// This hook simulates how the platform handles post messages from the system
// It's very incomplete, but will get built out later.
// Source in these messages is 'Aux' because in production the 'App' sends message
// to 'Aux' which then forwards them to the system.
import { useContext, useEffect } from 'react'
import { TDocument, TEditMode, TState } from '../../interfaces'
import context from '../context'
import defaultDocuments from './defaultData'

let initialData: TState = {
	editMode: 'edit' as TEditMode,
	documentId: defaultDocuments[0]._id,
	document: defaultDocuments[0],
	documents: defaultDocuments,
	assets: [],
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
				const documentIndex = newState.documents?.findIndex(
					(document: TDocument) => document._id === data._id,
				)
				newState.documents[documentIndex] = data

				localStorage.setItem('state', JSON.stringify(newState))

				break

			case 'upload asset':
				console.log(
					'App received upload asset message (this does nothing in devmode):',
					data,
				)

				break

			case 'remove asset':
				console.log(
					'App received remove asset message (this does nothing in devmode):',
					data,
				)

				break

			case 'send message':
				console.log(
					'App received send message message (this does nothing in devmode):',
					data,
				)

				break

			case 'set scene':
				console.log(
					'App received set scene message (this does nothing in devmode):',
					data,
				)

				break

			case 'open document':
				console.log(
					'App received open document message (this does nothing in devmode):',
					data,
				)

				break

			case 'generate':
				console.log(
					'App received generate message (this does nothing in devmode):',
					data,
				)

				break
		}
	}

	useEffect(() => {
		window.addEventListener('message', simulatedMessages)

		return () => {
			window.removeEventListener('message', simulatedMessages)
		}
	}, []) // eslint-disable-line react-hooks/exhaustive-deps
}

export default useSimulateParentFrame
