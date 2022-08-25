import { useWatch } from 'react-hook-form'
import Depletable from './Depletable'

export interface IHitPointsProps {}

export default function HitPoints(props: IHitPointsProps) {
	const siz = useWatch({ name: 'characteristics.size', defaultValue: 0 })
	const con =
		useWatch({
			name: 'characteristics.constitution',
			defaultValue: 0,
		}) || 0

	const maxHp = Math.floor(
		(parseInt(con, 10) + parseInt(siz, 10)) / 10,
	).toString()

	return (
		<Depletable
			label='Hitpoints'
			currentName='hitpoints.current'
			maxName='hitpoints.max'
			maxPlaceholder={maxHp}
			className='col-span-2'
		/>
	)
}
