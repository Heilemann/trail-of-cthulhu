import { TAppReceivableMessages } from '../../../interfaces'

// this is a hook that returns a function that sends a message to the parent window
export default function useMessageToApp() {
	const messageToApp = ({ message, data }: TAppReceivableMessages) => {
		window.parent.postMessage({
			source: 'System',
			message,
			data: {
				...data,
			},
		} as TAppReceivableMessages)
	}

	return messageToApp
}
