import { useContext } from 'react'
import { TAppReceivableMessages } from '../../../interfaces'
import context from '../context'

// this is a hook that returns a function that sends a message to the parent window
export default function useMessageToApp() {
	const { state } = useContext(context)

	const messageToApp = ({ message, data }: TAppReceivableMessages) => {
		console.log('messageToApp', state?.document?._id, message, data)

		window.parent.postMessage({
			source: 'System',
			message,
			data,
		} as TAppReceivableMessages)
	}

	return messageToApp
}
