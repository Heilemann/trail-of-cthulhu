import { useMemo } from 'react'
import { useWatch } from 'react-hook-form'

type Props = {
	name: string
	category: 'investigative' | 'general'
}

const SkillSpecialitiesList = ({ name, category }: Props) => {
	const rating = useWatch({
		name: `skills.${category}.${name}.rating`,
		defaultValue: 0,
	})
	const specialities = useWatch({
		name: `skills.${category}.${name}.specialities`,
		defaultValue: [],
	})

	const emptyCount = useMemo(() => {
		return (
			rating - specialities.filter((speciality: string) => !speciality).length
		)
	}, [rating, specialities])

	const namedSpecialities = useMemo(() => {
		return specialities.filter((speciality: string) => speciality).join(', ')
	}, [specialities])

	const remainingPhrase = useMemo(() => {
		return emptyCount > 0 ? ` (${emptyCount} remaining)` : ''
	}, [emptyCount])

	console.log(
		name,
		specialities,
		emptyCount,
		namedSpecialities,
		remainingPhrase,
	)

	return (
		<div className='ml-2 text-sm text-gray-500'>
			{namedSpecialities}
			{remainingPhrase}
		</div>
	)
}

export default SkillSpecialitiesList
