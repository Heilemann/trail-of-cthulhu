import { useEffect, useReducer } from 'react'
import './App.css'
import Container from './components/Container'
import Context from './components/context'
import DevToolbar from './components/DevToolbar'
import Reducer from './components/reducer'
import { TState } from './interfaces'

function App() {
	// @ts-ignore
	const [state, dispatch] = useReducer(Reducer, {} as TState)
	const isDevelopment = process.env.NODE_ENV === 'development'

	// console log if state is updated
	useEffect(() => {
		console.log('trail of cthulhu: state updated', state)
	}, [state])

	return (
		<Context.Provider value={{ state, dispatch }}>
			{isDevelopment && <DevToolbar />}
			{/* <DevToolbar /> */}
			<Container />
		</Context.Provider>
	)
}

export default App
