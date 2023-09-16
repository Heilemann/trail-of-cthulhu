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

let currentElement: Element | null = null // To keep track of the current element

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

	const handleDragLeaveFromParent = useCallback(
		(e: MessageEvent) => fireSyntheticEvent(e, 'dragLeave'),
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

	const simulateDropEvent = (x: number, y: number) => {
		const element = document.elementFromPoint(x, y)
		if (element) {
			const dropEvent = new DragEvent('drop', {
				bubbles: true,
				cancelable: true,
			})
			element.dispatchEvent(dropEvent)
		}
	}

	const postMessageListener = useCallback(
		(e: MessageEvent) => {
			const payload: TDragAndDropMessages = e.data
			const { message, source, pointer } = payload
			const wrongSource = source !== 'App' && source !== 'Aux'

			if (wrongSource) return

			if (pointer) {
				const newElement = document.elementFromPoint(pointer.x, pointer.y)

				if (newElement !== currentElement) {
					// If the dragged item has moved to a new element
					if (currentElement) {
						simulateDragLeaveEvent(currentElement)
						handleDragLeaveFromParent(e)
					}
					if (newElement) {
						simulateDragEvent(pointer.x, pointer.y)
						handleDragEnterFromParent(e)
					}
					currentElement = newElement
				}

				switch (message) {
					case 'onDragEnter':
						console.log('drag enter')
						simulateDragEvent(pointer.x, pointer.y)
						handleDragEnterFromParent(e)
						break
					case 'onDragOver':
						console.log('drag over')
						simulateDragEvent(pointer.x, pointer.y)
						handleDragOverFromParent(e)
						break
					case 'onDrop':
						console.log('drop')
						simulateDropEvent(pointer.x, pointer.y) // simulate drop event
						handleDropFromParent(e)
						break
				}
			}
		},
		[
			handleDragEnterFromParent,
			handleDragOverFromParent,
			handleDropFromParent,
			handleDragLeaveFromParent,
		],
	)

	const simulateDragLeaveEvent = (element: Element) => {
		const dragLeaveEvent = new DragEvent('dragleave', {
			bubbles: true,
			cancelable: true,
		})
		element.dispatchEvent(dragLeaveEvent)
	}

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
