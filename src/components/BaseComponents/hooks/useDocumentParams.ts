import { useEffect, useState } from 'react'

// hook determines whether we're in dev mode
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
			let searchParams: URLSearchParams

			try {
				// Try to access window.parent.location
				searchParams = new URLSearchParams(window.parent.location.search)
			} catch (error) {
				// If access fails, we're not in a srcdoc, use our own URL params
				searchParams = new URLSearchParams(window.location.search)
			}

			setParams({
				id: searchParams.get('id'),
				dice: searchParams.get('dice'),
			})
		}

		getParams()
	}, [])

	return params
}
