import { useCallback, useContext, useEffect } from 'react'
import useSyntheticEvent from './hooks/UseSyntheticEvent'
import context from './context'

export interface IDragAndDropProps {
	children: React.ReactNode
}

type TDragAndDropMessages = {
	message: 'onDragEnter' | 'onDragOver' | 'onDrop'
	source: 'App' | 'Aux'
	pointer?: { x: number; y: number } // Added pointer to get coordinates
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

	const simulateDragEvent = (x: number, y: number) => {
		const element = document.elementFromPoint(x, y)
		if (element) {
			const dragEvent = new DragEvent('dragover', {
				bubbles: true,
				cancelable: true,
			})
			element.dispatchEvent(dragEvent)
		}
	}

	const postMessageListener = useCallback(
		(e: MessageEvent) => {
			const payload: TDragAndDropMessages = e.data
			const { message, source, pointer } = payload // Extract pointer
			const wrongSource = source !== 'App' && source !== 'Aux'

			if (wrongSource) return

			if (pointer) {
				simulateDragEvent(pointer.x, pointer.y)
			}

			switch (message) {
				case 'onDragEnter':
					console.log('drag enter')
					handleDragEnterFromParent(e)
					break
				case 'onDragOver':
					console.log('drag over')
					handleDragOverFromParent(e)
					break
				case 'onDrop':
					console.log('drop')
					handleDropFromParent(e)
					break
			}
		},
		[handleDragEnterFromParent, handleDragOverFromParent, handleDropFromParent],
	)

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		if (e.dataTransfer) {
			const droppedDocumentId = e.dataTransfer.getData('documentId')[0]
			const droppedDoc = documents.find(d => d._id === droppedDocumentId)

			if (!droppedDoc) {
				throw new Error(
					`Could not find dropped document. ID: ${droppedDocumentId}`,
				)
			}

			const type: string = droppedDoc.type

			console.log('dropped type', type)

			// if (type in dropHandlers.current) dropHandlers.current[type](e);
		}
	}

	const handleInitialLoad = () => {
		window.addEventListener('message', postMessageListener)

		return () => {
			window.removeEventListener('message', postMessageListener)
		}
	}
	useEffect(handleInitialLoad, [postMessageListener])

	return (
		<div className='h-full min-h-full' onDrop={handleDrop}>
			{children}
		</div>
	)
}
