import { useEffect } from 'react'
import useMessageToApp from './hooks/UseMessageToApp'

const useFocusHandler = () => {
	const messageToApp = useMessageToApp()

	useEffect(() => {
		const onFocus = () => {
			messageToApp({ message: 'focus', data: undefined })
		}
		window.addEventListener('pointerdown', onFocus)
		return () => {
			window.removeEventListener('pointerdown', onFocus)
		}
	}, [messageToApp])
}

export default useFocusHandler
