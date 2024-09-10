import { TAppReceivableMessages } from '../../../interfaces'

// hook that returns function to send messages to the parent window
export default function useMessageToApp() {
	const messageToApp = ({ message, data }: TAppReceivableMessages) => {
		window.parent.postMessage(
			{
				source: 'System',
				message,
				data: {
					...data,
				},
			} as TAppReceivableMessages,
			'*',
		)
	}

	return messageToApp
}
