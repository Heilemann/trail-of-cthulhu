import { useContext } from 'react'
import { TAppReceivableMessages } from '../../../interfaces'
import context from '../context'

// this is a hook that returns a function that sends a message to the parent window
export default function useMessageToApp() {
	const { state } = useContext(context)
	const { document } = state || {}
	const { _id } = document || {}

	const messageToApp = ({ message, data }: TAppReceivableMessages) => {
		if (!_id) {
			console.error('Document or _id is undefined')
			return
		}

		console.log('messageToApp', _id, message, data)

		window.parent.postMessage({
			source: 'System',
			message,
			data,
		} as TAppReceivableMessages)
	}

	return messageToApp
}
