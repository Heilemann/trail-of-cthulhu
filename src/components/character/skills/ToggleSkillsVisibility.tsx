import { useContext } from 'react'
import Button from '../../BaseComponents/Form/Button'
import context from '../../BaseComponents/context'

export default function ToggleSkillsVisibility() {
	const { state, dispatch } = useContext(context)
	const { showAllSkills } = state

	const handleToggle = () => {
		dispatch({ type: 'TOGGLE_SHOW_ALL_SKILLS' })
	}

	return (
		<Button onClick={handleToggle} className='w-full sm:w-auto'>
			{showAllSkills ? 'Hide Unrated Skills' : 'Show All Skills'}
		</Button>
	)
}
