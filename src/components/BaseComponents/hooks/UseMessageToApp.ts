import { TAppReceivableMessages } from '../../../interfaces'
import { useMemo } from 'react'

export default function useMessageToApp() {
	const documentId = useMemo(() => {
		const searchParams = new URLSearchParams(window.parent.location.search)
		return searchParams.get('id')
	}, [])

	if (documentId === null) {
		console.warn('Document ID is not specified in the parent URL.')
	}

	const messageToApp = ({ message, data }: TAppReceivableMessages) => {
		if (documentId !== null) {
			window.parent.postMessage({
				source: 'System',
				documentId,
				message,
				data,
			} as TAppReceivableMessages)
		}
	}

	return messageToApp
}
