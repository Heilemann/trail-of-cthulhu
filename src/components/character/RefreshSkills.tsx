import { useFormContext, useWatch } from 'react-hook-form'
import Button from '../Button'

export interface IRefreshSkillsProps {}

export default function RefreshSkills(props: IRefreshSkillsProps) {
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

	return <Button onClick={handleRefresh}>Refresh Pool Points</Button>
}
