import { useEffect, useReducer } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import './App.css'
import './assets/logo.png'
import Container from './components/BaseComponents/Container'
import DragAndDrop from './components/BaseComponents/DragAndDrop'
import Context from './components/BaseComponents/context'
import Reducer from './components/BaseComponents/reducer'
import DiceResults from './components/DiceResults'
import { useDocumentParams } from './hooks/useDocumentParams'
import { TState, TValues } from './interfaces/interfaces'

function App() {
	const [state, dispatch] = useReducer(Reducer, {} as TState)
	const form = useForm<TValues>({
		shouldUnregister: true,
	})

	const { id, dice } = useDocumentParams()

	useEffect(() => {
		console.log('App received params:', { id, dice })
	}, [id, dice])

	return (
		<Context.Provider value={{ state, dispatch }}>
			<FormProvider {...form}>
				<DragAndDrop>
					{id && <Container />}
					{dice && <DiceResults diceData={dice} />}
					{!id && !dice && <div>No valid parameters provided</div>}
				</DragAndDrop>
			</FormProvider>
		</Context.Provider>
	)
}

export default App
