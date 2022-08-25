import { useMemo } from 'react'
import { useWatch } from 'react-hook-form'
import { TSkill } from '../../interfaces'
import Depletable from './Depletable'

export interface ISanityProps {}

export default function Sanity(props: ISanityProps) {
	const power = useWatch({
		name: 'characteristics.power',
		defaultValue: '0',
	}) as string

	const cthulhuMythos = useWatch({
		name: 'skills.Cthulhu-Mythos',
	}) as TSkill

	const autocalcMax = useMemo(() => {
		const mythos = parseInt(cthulhuMythos?.value || '0', 10)
		const pow = parseInt(power, 10)
		const max = Math.min(pow, 99 - mythos)
		const result = Math.max(0, max).toString()

		return result
	}, [cthulhuMythos, power])

	return (
		<Depletable
			className='col-span-2'
			label='Sanity'
			currentName='sanity.current'
			maxName='sanity.max'
			maxPlaceholder={autocalcMax}
		/>
	)
}
