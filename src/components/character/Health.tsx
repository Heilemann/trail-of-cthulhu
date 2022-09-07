import { useWatch } from 'react-hook-form'
import Skill from './Skill'

export interface IHealthProps {}

export default function Health(props: IHealthProps) {
	const health = useWatch({
		name: 'skills.Health',
	})
	const pool = health?.pool

	const note = (
		<div className='text-red-500'>
			{pool && pool <= 0 && pool >= -5 ? 'You are hurt.' : null}
			{pool && pool <= -6 && pool >= -11 ? 'You are seriously wounded.' : null}
			{pool && pool <= -12 ? 'You are dead.' : null}
		</div>
	)

	return <Skill name='Health' category='general' note={note} />
}
