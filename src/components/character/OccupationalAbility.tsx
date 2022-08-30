import { useFormContext } from 'react-hook-form'

export interface IOccupationalAbilityProps {
	name: string
}

export default function OccupationalAbility(props: IOccupationalAbilityProps) {
	const { name } = props
	const { register } = useFormContext()

	return (
		<input
			className='self-center'
			type='checkbox'
			title='Occupational ability'
			{...register(`skills.${name}.pool`)}
		/>
	)
}
