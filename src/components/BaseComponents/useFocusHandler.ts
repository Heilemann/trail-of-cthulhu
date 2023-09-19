import { useEffect } from 'react'
import useMessageToApp from './hooks/UseMessageToApp'

const useFocusHandler = () => {
	const messageToApp = useMessageToApp()

	useEffect(() => {
		const onFocus = () => {
			messageToApp({ message: 'focus', data: undefined })
		}
		window.addEventListener('focus', onFocus)
		return () => {
			window.removeEventListener('focus', onFocus)
		}
	}, [])
}

export default useFocusHandler
