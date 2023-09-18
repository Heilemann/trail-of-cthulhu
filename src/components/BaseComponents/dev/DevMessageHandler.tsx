import { useEffect } from 'react'

export default function DevMessageHandler() {
	// handle window messages
	// the realms app does this in real life, but for development we need
	// to have a way to check that our messages are being sent and
	// received, and that they are formatted correctly
	const handleMessage = (event: MessageEvent) => {
		console.log('Message Received:', event)

		// syntax checking goes here
	}

	// listen for window messages
	const messageListener = () => {
		window.addEventListener('message', handleMessage)
		return () => window.removeEventListener('message', handleMessage)
	}

	useEffect(messageListener, [])

	return null
}
