import { useCallback, useEffect } from 'react'
import useSyntheticEvent from './hooks/UseSyntheticEvent'

export interface IDragAndDropProps {
	children: React.ReactNode
}

type TDragAndDropMessages = {
	message: 'onDragOver' | 'onDrop'
	source: 'App' | 'Aux'
	pointer?: { x: number; y: number }
}

let currentElement: Element | null = null

export default function DragAndDrop(props: IDragAndDropProps) {
	const { children } = props
	const fireSyntheticEvent = useSyntheticEvent()

	const handleDropFromParent = useCallback(
		(e: MessageEvent) => fireSyntheticEvent(e, 'drop'),
		[fireSyntheticEvent],
	)

	const simulateEvent = (eventType: string, x: number, y: number) => {
		const element = document.elementFromPoint(x, y)
		if (element) {
			const event = new DragEvent(eventType, {
				bubbles: true,
				cancelable: true,
				clientX: x,
				clientY: y,
			})
			element.dispatchEvent(event)
		}
	}

	const postMessageListener = useCallback(
		(e: MessageEvent) => {
			const { message, source, pointer } = e.data as TDragAndDropMessages

			if (['App', 'Aux'].includes(source) && pointer) {
				const newElement = document.elementFromPoint(pointer.x, pointer.y)

				if (newElement !== currentElement) {
					if (currentElement) simulateEvent('dragleave', pointer.x, pointer.y)
					if (newElement) simulateEvent('dragenter', pointer.x, pointer.y)
					currentElement = newElement
				}

				if (message === 'onDragOver')
					simulateEvent('dragover', pointer.x, pointer.y)
				else if (message === 'onDrop') handleDropFromParent(e)
			}
		},
		[handleDropFromParent],
	)

	useEffect(() => {
		console.log('>>>>>>>>>> DragAndDrop, useEffect')
		window.addEventListener('message', postMessageListener)
		return () => window.removeEventListener('message', postMessageListener)
	}, [postMessageListener])

	return <div className='h-full min-h-full'>{children}</div>
}
