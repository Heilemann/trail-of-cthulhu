import { useFormContext, useWatch } from 'react-hook-form'
import Button from '../../Button'

export interface IRefreshAllSkillsProps {}

export default function RefreshAllSkills(props: IRefreshAllSkillsProps) {
	const { setValue } = useFormContext()

	const skills = useWatch({
		name: 'skills',
		defaultValue: {},
	})

	const handleRefresh = () => {
		const newSkills = { ...skills }

		Object.keys(newSkills.investigative).forEach(skillName => {
			const skill = newSkills.investigative[skillName]
			skill.pool = skill.rating

			newSkills.investigative[skillName] = skill
		})

		Object.keys(newSkills.general).forEach(skillName => {
			const skill = newSkills.general[skillName]
			skill.pool = skill.rating

			newSkills.general[skillName] = skill
		})

		setValue('skills', newSkills, { shouldDirty: true })
	}

	return (
		<Button onClick={handleRefresh} className='w-full sm:w-auto'>
			Refresh All
		</Button>
	)
}
