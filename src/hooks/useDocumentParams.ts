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
		console.log('useDocumentParams effect running')

		const getParams = () => {
			try {
				// Try to access window.parent.location
				const parentLocation = window.parent.location
				console.log('Running in srcdoc')

				// We're in a srcdoc, use parent's URL params
				const searchParams = new URLSearchParams(parentLocation.search)
				const newParams = {
					id: searchParams.get('id'),
					dice: searchParams.get('dice'),
				}
				console.log('Setting params from parent URL:', newParams)
				setParams(newParams)
			} catch (error) {
				console.log('Running in main window')
				// We're not in a srcdoc, use our own URL params
				const searchParams = new URLSearchParams(window.location.search)
				const newParams = {
					id: searchParams.get('id'),
					dice: searchParams.get('dice'),
				}
				console.log('Setting params from own URL:', newParams)
				setParams(newParams)
			}
		}

		getParams()
	}, [])

	console.log('useDocumentParams returning:', params)
	return params
}
