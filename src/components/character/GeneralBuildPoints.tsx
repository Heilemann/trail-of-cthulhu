import { useWatch } from 'react-hook-form'
import HInput from '../HInput'

export interface IGeneralBuildPointsProps {}

export default function GeneralBuildPoints(props: IGeneralBuildPointsProps) {
	const skills = useWatch({
		name: 'skills.general',
		defaultValue: {},
	})

	// for every skill, add the rating to the total, the rating costs half if it's an occupational skill
	const total = Object.keys(skills).reduce((acc, skillName) => {
		const skill = skills[skillName]
		const rating = parseInt(skill.rating, 10)
		const { isOccupational } = skill

		return acc + (isOccupational ? rating / 2 : rating)
	}, 0)

	// console.log('total general', total)

	return (
		<HInput
			label='General Build Points'
			placeholder={total + '' || '&mdash;'}
		/>
	)
}
