import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import context from '../../BaseComponents/context'

export interface IOccupationalAbilityProps {
	name: string
	category: 'investigative' | 'general'
}

export default function OccupationalAbility(props: IOccupationalAbilityProps) {
	const { name, category } = props
	const { state } = useContext(context)
	const { editMode } = state
	const { register } = useFormContext()

	return (
		<input
			className={twMerge('mr-2 self-center', editMode === 'view' && 'hidden')}
			type='checkbox'
			title='Occupational ability'
			{...register(`skills.${category}.${name}.isOccupational`)}
		/>
	)
}
