import { useReducer } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import './App.css'
import Container from './components/Container'
import DevToolbar from './components/DevToolbar'
import Context from './components/context'
import Reducer from './components/reducer'
import { TState, TValues } from './interfaces'

function App() {
	const [state, dispatch] = useReducer(Reducer, {} as TState)
	const isDevelopment = process.env.NODE_ENV === 'development'
	const form = useForm<TValues>({
		shouldUnregister: true,
	})

	// const initMessageListener = () => {
	// 	const messageListener = (event: MessageEvent) => {
	// 		const { message, source, data } = event.data

	// 		console.log('messageListener', message, source, data)
	// 	}

	// 	window.addEventListener('message', messageListener)

	// 	return () => {
	// 		window.removeEventListener('message', messageListener)
	// 	}
	// }
	// useEffect(initMessageListener, [state, initMessageListener])

	return (
		<Context.Provider value={{ state, dispatch }}>
			<FormProvider {...form}>
				{isDevelopment && <DevToolbar />}
				<Container />
			</FormProvider>
		</Context.Provider>
	)
}

export default App
