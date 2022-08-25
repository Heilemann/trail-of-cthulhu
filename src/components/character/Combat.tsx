import Build from './Build'
import DamageBonus from './DamageBonus'
import HitPoints from './HitPoints'
import MagicPoints from './MagicPoints'
import Move from './Move'
import Sanity from './Sanity'

export interface ICombatProps {}

export default function Combat(props: ICombatProps) {
	return (
		<div className='grid grid-cols-4 xl:grid-cols-8 gap-4'>
			<HitPoints />
			<Sanity />
			<MagicPoints />
			<Move />
			<Build />
			<DamageBonus />
			{/* <Dodge /> */}
		</div>
	)
}
