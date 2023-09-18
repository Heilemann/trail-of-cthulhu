import { useContext } from 'react'
import { TAppReceivableMessages } from '../../../interfaces'
import context from '../context'

// this is a hook that returns a function that sends a message to the parent window
export default function useMessageToApp() {
	const { state } = useContext(context)

	const messageToApp = ({ message, data }: TAppReceivableMessages) => {
		window.parent.postMessage({
			source: 'System',
			message,
			data: {
				...data,
				documentId: state.document._id,
			},
		} as TAppReceivableMessages)
	}

	return messageToApp
}
