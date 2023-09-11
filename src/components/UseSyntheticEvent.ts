interface CustomPayload {
	pointer: {
		x: number
		y: number
	}
	data: string
}

interface CustomMessageEvent extends MessageEvent {
	data: CustomPayload
}

const useSyntheticEvent = () => {
	const getElementFromEvent = (e: CustomMessageEvent) => {
		const y = e.data.pointer.y
		const x = e.data.pointer.x
		return document.elementsFromPoint(x, y)[0]
	}

	const fireFakeEvent = (e: CustomMessageEvent, type: string) => {
		const x = e.data.pointer.x
		const y = e.data.pointer.y
		const targetElement = getElementFromEvent(e)

		const event = new MouseEvent(type, {
			bubbles: true,
			cancelable: true,
			clientX: x,
			clientY: y,
		})

		;(event as any).dataTransfer = {
			data: {
				documentId: e.data.data,
			},
			setData(type: string, val: string) {
				this.data[type] = val
			},
			getData(type: string) {
				return this.data[type]
			},
		}

		targetElement.dispatchEvent(event)
	}

	return fireFakeEvent
}

export default useSyntheticEvent
