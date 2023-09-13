import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import Input from '../../Input'
import context from '../../context'

export interface ISkillSpecialitiesProps {
	name: string
	category: 'investigative' | 'general'
	index: number
}

export default function SkillSpecialities(props: ISkillSpecialitiesProps) {
	const { name, category, index } = props
	const { state } = useContext(context)
	const { editMode } = state
	const { register } = useFormContext()

	return (
		<Input
			type='text'
			className={twMerge('mt-1 py-1')}
			placeholder='&mdash;'
			disabled={editMode === 'view'}
			{...register(`skills.${category}.${name}.specialities[${index}]`)}
		/>
	)
}
