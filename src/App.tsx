import { useReducer } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import './App.css'
import './assets/logo.png'
import Container from './components/BaseComponents/Container'
import DragAndDrop from './components/BaseComponents/DragAndDrop'
import Context from './components/BaseComponents/context'
import { useDocumentParams } from './components/BaseComponents/hooks/useDocumentParams'
import Reducer from './components/BaseComponents/reducer'
import DiceResults from './components/DiceResults'
import { TState, TValues } from './interfaces/interfaces'

function App() {
	const [state, dispatch] = useReducer(Reducer, {
		showAllSkills: true,
		// ... other initial state properties
	} as TState)
	const form = useForm<TValues>({
		shouldUnregister: true,
	})

	const { id, dice } = useDocumentParams()

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
