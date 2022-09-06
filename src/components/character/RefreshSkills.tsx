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

		Object.keys(newSkills).forEach(skillName => {
			const skill = newSkills[skillName]
			skill.pool = skill.rating

			newSkills[skillName] = skill
		})

		setValue('skills', newSkills, { shouldDirty: true })
	}

	return <Button onClick={handleRefresh}>Refresh Pool Points</Button>
}
