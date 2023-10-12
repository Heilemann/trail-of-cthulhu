import { useFormContext, useWatch } from 'react-hook-form'
import Button from '../../BaseComponents/Form/Button'

export default function Refresh24Hour() {
	const { setValue } = useFormContext()

	const skills = useWatch({
		name: 'skills',
		defaultValue: {},
	})

	const handleRefresh = () => {
		const newSkills = { ...skills }
		const generalSkillsToRefresh = [
			'Athletics',
			'Fleeing',
			'Driving',
			'Riding',
			'Piloting',
			'Firearms',
			'Scuffling',
			'Weapons',
		]

		// Refresh only the specified general skills
		Object.keys(newSkills.general).forEach(skillName => {
			if (generalSkillsToRefresh.includes(skillName)) {
				const skill = newSkills.general[skillName]
				skill.pool = skill.rating
				newSkills.general[skillName] = skill
			}
		})

		setValue('skills', newSkills, { shouldDirty: true })
	}

	return (
		<Button onClick={handleRefresh} className='w-full sm:w-auto'>
			Refresh 24h
		</Button>
	)
}
