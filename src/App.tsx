import { useReducer } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import './App.css'
import Container from './components/Container'
import DevToolbar from './components/dev/DevToolbar'
import Context from './components/context'
import Reducer from './components/BaseComponents/reducer'
import { TState, TValues } from './interfaces'

function App() {
	const [state, dispatch] = useReducer(Reducer, {} as TState)
	const isDevelopment = process.env.NODE_ENV === 'development'
	const form = useForm<TValues>({
		shouldUnregister: true,
	})

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
