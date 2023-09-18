import { TAppReceivableMessages } from '../../../interfaces'

// this is a hook that returns a function that sends a message to the parent window
export default function useMessageToApp() {
	let searchParams = new URLSearchParams(window.parent.location.search)
	let documentId = searchParams.get('id')
	console.log('--------> documentId', documentId)

	if (documentId === null) {
		console.warn('Document ID is not specified in the parent URL.')
	}

	const messageToApp = ({ message, data }: TAppReceivableMessages) => {
		window.parent.postMessage({
			source: 'System',
			message,
			documentId,
			data,
		} as TAppReceivableMessages)
	}

	return messageToApp
}
