import { DragEvent, useCallback, useContext, useEffect } from 'react'
import useSyntheticEvent from './UseSyntheticEvent'
import context from './context'

export interface IDragAndDropProps {
	children: React.ReactNode
}

type TDragAndDropMessages =
	| {
			message: 'onDragEnter'
			source: 'App'
	  }
	| {
			message: 'onDragOver'
			source: 'App'
	  }
	| {
			message: 'onDrop'
			source: 'App'
	  }

export default function DragAndDrop(props: IDragAndDropProps) {
	const { children } = props
	const { state } = useContext(context)
	const { documents } = state
	const fireSyntheticEvent = useSyntheticEvent()

	const handleDragEnterFromParent = useCallback(
		(e: MessageEvent) => fireSyntheticEvent(e, 'dragEnter'),
		[fireSyntheticEvent],
	)

	const handleDragOverFromParent = useCallback(
		(e: MessageEvent) => fireSyntheticEvent(e, 'dragOver'),
		[fireSyntheticEvent],
	)

	const handleDropFromParent = useCallback(
		(e: MessageEvent) => fireSyntheticEvent(e, 'drop'),
		[fireSyntheticEvent],
	)

	const postMessageListener = useCallback(
		(e: MessageEvent) => {
			const payload: TDragAndDropMessages = e.data
			const { message, source } = payload
			const wrongSource = source !== 'App' && source !== 'Aux'

			if (wrongSource) return
			// if (e.origin !== parentOrigin || source !== 'App') return

			console.log('drag and drop message listener', message, source)

			switch (message) {
				case 'onDragEnter':
					handleDragEnterFromParent(e)
					break

				case 'onDragOver':
					handleDragOverFromParent(e)
					break

				case 'onDrop':
					handleDropFromParent(e)
					break
			}
		},
		[handleDragEnterFromParent, handleDragOverFromParent, handleDropFromParent],
	)

	const handleDrop = (e: DragEvent) => {
		const droppedDocumentId = e.dataTransfer.getData('documentId')[0]
		const droppedDoc = documents.find(d => d._id === droppedDocumentId)

		if (!droppedDoc)
			throw new Error(
				`Could not find dropped document. ID: ${droppedDocumentId}`,
			)

		const type: string = droppedDoc.type

		console.log('dropped type', type)

		// if (type in dropHandlers.current) dropHandlers.current[type](e)
	}

	const handleInitialLoad = () => {
		window.addEventListener('message', postMessageListener)

		return () => {
			window.removeEventListener('message', postMessageListener)
		}
	}
	useEffect(handleInitialLoad, [postMessageListener])

	return (
		<div className='min-h-full h-full' onDrop={handleDrop}>
			{children}
		</div>
	)
}
