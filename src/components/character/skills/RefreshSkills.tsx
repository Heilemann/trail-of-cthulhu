import { useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import Button from '../../BaseComponents/Form/Button'

export interface IRefreshAllSkillsProps {}

export default function RefreshAllSkills(props: IRefreshAllSkillsProps) {
	const { setValue } = useFormContext()
	const [error, setError] = useState<string | null>(null)

	const skills = useWatch({
		name: 'skills',
		defaultValue: {},
	})

	const handleRefresh = () => {
		setError(null)
		try {
			if (!skills || typeof skills !== 'object') {
				throw new Error('Skills data is invalid or not available')
			}

			const newSkills = { ...skills }

			// Check if the skills structure is valid
			if (!newSkills.investigative || !newSkills.general) {
				throw new Error(
					'Skills structure is invalid. Please make sure you have both investigative and general skills.',
				)
			}

			// Refresh investigative skills
			Object.keys(newSkills.investigative).forEach(skillName => {
				const skill = newSkills.investigative[skillName]
				if (skill && typeof skill.rating !== 'undefined') {
					skill.pool = skill.rating
				}
			})

			// Refresh general skills
			Object.keys(newSkills.general).forEach(skillName => {
				const skill = newSkills.general[skillName]
				if (skill && typeof skill.rating !== 'undefined') {
					skill.pool = skill.rating
				}
			})

			setValue('skills', newSkills, { shouldDirty: true })
		} catch (error) {
			console.error('Error refreshing skills:', error)
			setError(
				error instanceof Error ? error.message : 'An unknown error occurred',
			)
		}
	}

	return (
		<Button onClick={handleRefresh} className='w-full sm:w-auto'>
			Refresh All
		</Button>
	)
}
