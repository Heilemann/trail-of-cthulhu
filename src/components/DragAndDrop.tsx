// This file handles translating drag and drop events sent through postMessage
// into native drag and drop events. This is necessary because the iframe'd system
// does not have access to the native drag and drop events form the platform otherwise.
import { useCallback, useEffect } from 'react'
import useSyntheticEvent from './BaseComponents/hooks/UseSyntheticEvent'

export interface IDragAndDropProps {
	children: React.ReactNode
}

type TDragAndDropMessages = {
	message: 'onDragOver' | 'onDrop'
	source: 'App' | 'Aux'
	pointer?: { x: number; y: number }
}

let currentElement: Element | null = null // To keep track of the current element

export default function DragAndDrop(props: IDragAndDropProps) {
	const { children } = props
	// const { state } = useContext(context)
	// const { documents } = state
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

	const simulateDragEnterEvent = (element: Element) => {
		const dragLeaveEvent = new DragEvent('dragenter', {
			bubbles: true,
			cancelable: true,
		})
		element.dispatchEvent(dragLeaveEvent)
	}

	const simulateDragLeaveEvent = (element: Element) => {
		const dragLeaveEvent = new DragEvent('dragleave', {
			bubbles: true,
			cancelable: true,
		})
		element.dispatchEvent(dragLeaveEvent)
	}

	const simulateDropEvent = (x: number, y: number) => {
		console.log('simulate drop')
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
						simulateDragEnterEvent(newElement)
						handleDragEnterFromParent(e)
					}
					currentElement = newElement
				}

				switch (message) {
					case 'onDragOver':
						simulateDragEvent(pointer.x, pointer.y)
						handleDragOverFromParent(e)
						break

					case 'onDrop':
						console.log('drop')
						// simulateDropEvent(pointer.x, pointer.y) // simulate drop event
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

	// const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
	// 	if (e.dataTransfer) {
	// 		const droppedDocumentId = e.dataTransfer.getData('documentId')[0]
	// 		const droppedDoc = documents.find(d => d._id === droppedDocumentId)

	// 		if (!droppedDoc) {
	// 			throw new Error(
	// 				`Could not find dropped document. ID: ${droppedDocumentId}`,
	// 			)
	// 		}

	// 		const type: string = droppedDoc.type

	// 		console.log('dropped type', type)

	// 	}
	// }

	const handleInitialLoad = () => {
		window.addEventListener('message', postMessageListener)

		return () => {
			window.removeEventListener('message', postMessageListener)
		}
	}
	useEffect(handleInitialLoad, [postMessageListener])

	return <div className='h-full min-h-full'>{children}</div>
}
