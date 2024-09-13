import { useWatch } from 'react-hook-form'
import HInput from '../../BaseComponents/Form/HInput'

export interface IBuildPointsProps {
	watchKey: string
	label: string
}

export default function BuildPoints(props: IBuildPointsProps) {
	const { watchKey, label } = props

	const skills = useWatch({
		name: watchKey,
		defaultValue: {},
	})

	const total = Object.keys(skills).reduce((acc, skillName) => {
		const skill = skills[skillName]
		const rating = parseInt(skill.rating, 10)
		const { isOccupational } = skill

		return acc + (isOccupational ? rating / 2 : rating)
	}, 0)

	return (
		<HInput
			label={label}
			placeholder={total + '' || '&mdash;'}
			className='rounded-xl border pl-2 pr-1'
			labelClassName='w-4/5'
			inputClassName='w-1/5 text-center'
		/>
	)
}
