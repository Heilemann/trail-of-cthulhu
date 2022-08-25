import { useMemo } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import Characteristic from './Characteristic'

export interface IMagicPointsProps {}

export default function MagicPoints(props: IMagicPointsProps) {
	const { register } = useFormContext()

	const power = useWatch({
		name: 'characteristics.power',
	}) as string

	const autocalc = useMemo(() => {
		if (power) {
			return Math.floor(parseInt(power) / 2).toString()
		} else {
			return '—'
		}
	}, [power])

	return (
		<Characteristic
			label='Magic'
			placeholder={autocalc}
			{...register('magicpoints')}
		/>
	)
}
