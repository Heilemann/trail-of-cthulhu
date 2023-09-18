import { useContext } from 'react'
import { TAppReceivableMessages } from '../../../interfaces'
import context from '../context'

// this is a hook that returns a function that sends a message to the parent window
export default function useMessageToApp() {
	const { state } = useContext(context)

	// read the url of the parent window and console log it
	// this is useful for debugging
	// Inside the iframe
	let searchParams = new URLSearchParams(window.parent.location.search)
	let documentId = searchParams.get('id') // Replace 'myParam' with the actual parameter name
	console.log(
		'120348102i2490124901902r019ru the systems documentId',
		documentId,
	)

	const messageToApp = ({ message, data }: TAppReceivableMessages) => {
		window.parent.postMessage({
			source: 'System',
			message,
			data: {
				...data,
				documentId: state?.document?._id ?? null,
			},
		} as TAppReceivableMessages)
	}

	return messageToApp
}
