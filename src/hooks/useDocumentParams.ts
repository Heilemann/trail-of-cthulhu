import { useEffect, useState } from 'react'

export function useDocumentParams() {
	const [params, setParams] = useState<{
		id: string | null
		dice: string | null
	}>({
		id: null,
		dice: null,
	})

	useEffect(() => {
		const getParams = () => {
			// Check if we're in an iframe
			if (window.parent !== window) {
				// We're in an iframe, likely a srcdoc
				const handleMessage = (event: MessageEvent) => {
					if (event.data && event.data.type === 'DOCUMENT_PARAMS') {
						setParams({
							id: event.data.id || null,
							dice: event.data.dice || null,
						})
					}
				}

				window.addEventListener('message', handleMessage)

				// Request params from parent
				window.parent.postMessage({ type: 'REQUEST_DOCUMENT_PARAMS' }, '*')

				return () => {
					window.removeEventListener('message', handleMessage)
				}
			} else {
				// We're not in an iframe, use URL params
				const searchParams = new URLSearchParams(window.location.search)
				setParams({
					id: searchParams.get('id'),
					dice: searchParams.get('dice'),
				})
			}
		}

		getParams()
	}, [])

	return params
}
