import { useEffect } from 'react'
import useMessageToApp from './hooks/UseMessageToApp'

const useFocusHandler = () => {
	const messageToApp = useMessageToApp()

	useEffect(() => {
		const onFocus = () => {
			messageToApp({ message: 'focus', data: undefined })
		}
		window.addEventListener('click', onFocus)
		window.addEventListener('pointerdown', onFocus)
		return () => {
			window.removeEventListener('focus', onFocus)
			window.removeEventListener('pointerdown', onFocus)
		}
	}, [])
}

export default useFocusHandler
