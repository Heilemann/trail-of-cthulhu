import { TAppReceivableMessages } from '../../../interfaces'

// this is a hook that returns a function that sends a message to the parent window
export default function useMessageToApp() {
	let searchParams = new URLSearchParams(window.parent.location.search)
	let documentId = searchParams.get('id') || 'character'

	if (documentId === null) {
		console.warn('Document ID not found in AUX URL.')
	}

	const messageToApp = ({ message, data }: TAppReceivableMessages) => {
		console.log('System sending message to app:', { message, data })

		window.parent.postMessage({
			source: 'System',
			message,
			data: {
				payload: data,
				documentId,
			},
		} as TAppReceivableMessages)
	}

	return messageToApp
}
