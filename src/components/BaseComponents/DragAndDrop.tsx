// This file handles translating drag and drop events sent through postMessage
// into native drag and drop events. This is necessary because the iframe'd system
// does not have access to the native drag and drop events form the platform otherwise.
import { useCallback, useEffect } from 'react'

export interface IDragAndDropProps {
	children: React.ReactNode
}

type TDragAndDropMessages = {
	message: 'onDragOver' | 'onDrop'
	source: 'App' | 'Aux'
	pointer?: { x: number; y: number }
}

// to keep track leave/enter events:
let currentElement: Element | null = null

export default function DragAndDrop(props: IDragAndDropProps) {
	const { children } = props

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
		const element = document.elementFromPoint(x, y)
		if (element) {
			const dropEvent = new DragEvent('drop', {
				bubbles: true,
				cancelable: true,
			})
			element.dispatchEvent(dropEvent)
		}
	}

	const postMessageListener = useCallback((e: MessageEvent) => {
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
				}
				if (newElement) {
					simulateDragEnterEvent(newElement)
				}
				currentElement = newElement
			}

			switch (message) {
				case 'onDragOver':
					simulateDragEvent(pointer.x, pointer.y)
					break

				case 'onDrop':
					simulateDropEvent(pointer.x, pointer.y) // simulate drop event
					break
			}
		}
	}, [])

	useEffect(() => {
		window.addEventListener('message', postMessageListener)

		return () => {
			window.removeEventListener('message', postMessageListener)
		}
	}, [postMessageListener])

	return <div className='h-full min-h-full'>{children}</div>
}
