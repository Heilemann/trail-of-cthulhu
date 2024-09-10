import { useReducer } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import './App.css'
import './assets/logo.png'
import Container from './components/BaseComponents/Container'
import DragAndDrop from './components/BaseComponents/DragAndDrop'
import Context from './components/BaseComponents/context'
import Reducer from './components/BaseComponents/reducer'
import DiceResults from './components/DiceResults'
import { TState, TValues } from './interfaces'

function App() {
	const [state, dispatch] = useReducer(Reducer, {} as TState)
	// const isDevelopment = process.env.NODE_ENV === 'development'
	const form = useForm<TValues>({
		shouldUnregister: true,
	})

	// Add this function to parse URL parameters
	const getUrlParams = () => {
		const searchParams = new URLSearchParams(window.location.search)
		return {
			id: searchParams.get('id'),
			dice: searchParams.get('dice'),
		}
	}

	const { id, dice } = getUrlParams()

	return (
		<Context.Provider value={{ state, dispatch }}>
			<FormProvider {...form}>
				<DragAndDrop>
					{/* {isDevelopment && <DevToolbar />} */}
					{id && <Container />}
					{dice && <DiceResults diceData={dice} />}
					{!id && !dice && <div>No valid parameters provided</div>}
				</DragAndDrop>
			</FormProvider>
		</Context.Provider>
	)
}

export default App
