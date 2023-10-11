import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import context from '../../BaseComponents/context'
import Checkbox from '../../BaseComponents/Form/Checkbox'

export interface IOccupationalAbilityProps {
	name: string
	category: 'investigative' | 'general'
}

export default function OccupationalAbility({
	name,
	category,
}: IOccupationalAbilityProps) {
	const { state } = useContext(context)
	const { editMode } = state
	const { register } = useFormContext()

	return (
		<Checkbox
			className={twMerge('self-center', editMode === 'view' && 'hidden')}
			title='Occupational ability'
			{...register(`skills.${category}.${name}.isOccupational`)}
		/>
	)
}
