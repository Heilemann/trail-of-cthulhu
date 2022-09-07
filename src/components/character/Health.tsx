import { useWatch } from 'react-hook-form'
import Skill from './Skill'

export interface IHealthProps {}

export default function Health(props: IHealthProps) {
	const health = useWatch({
		name: 'skills.Health',
	})

	const note = (
		<div className='text-red-500'>
			{health?.pool && health.pool <= 0 && health.pool >= -5
				? 'You are hurt.'
				: null}
			{health?.pool && health.pool <= -6 && health.pool >= -11
				? 'You are seriously wounded.'
				: null}
			{health?.pool && health.pool <= -12 ? 'You are dead.' : null}
		</div>
	)

	return <Skill name='Health' note={note} />
}
