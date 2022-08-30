import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import context from '../context'
import Input from '../Input'

export interface ISkillSpecialitiesProps {
	name: string
	index: number
}

export default function SkillSpecialities(props: ISkillSpecialitiesProps) {
	const { name, index } = props
	const { state } = useContext(context)
	const { document, editMode, messageToApp } = state
	const { register } = useFormContext()

	return (
		<Input
			type='text'
			className='mt-1'
			placeholder='&mdash;'
			{...register(`skills.${name}.specialities[${index}]`)}
		/>
	)
}
