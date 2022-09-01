import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import context from '../context'

export interface IOccupationalAbilityProps {
	name: string
}

export default function OccupationalAbility(props: IOccupationalAbilityProps) {
	const { name } = props
	const { state } = useContext(context)
	const { editMode } = state
	const { register } = useFormContext()

	return (
		<input
			className={twMerge('mr-1 self-center', editMode === 'view' && 'hidden')}
			type='checkbox'
			title='Occupational ability'
			{...register(`skills.${name}.pool`)}
		/>
	)
}
