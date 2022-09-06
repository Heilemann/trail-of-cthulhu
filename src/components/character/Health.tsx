import * as React from 'react'
import { useWatch } from 'react-hook-form'
import Skill from './Skill'

export interface IHealthProps {}

export default function Health(props: IHealthProps) {
	const health = useWatch({
		name: 'skills.Health',
	})

	console.log(health)

	const note = (
		<>
			{health?.pool && health.pool <= 0 && health.pool >= -5 ? (
				<div className='text-red-500'>You are hurt.</div>
			) : null}
			{health?.pool && health.pool <= -6 && health.pool >= -11 ? (
				<div className='text-red-500'>You are seriously wounded.</div>
			) : null}
			{health?.pool && health.pool <= -12 ? (
				<div className='text-red-500'>You are dead.</div>
			) : null}
		</>
	)

	return (
		<div>
			<Skill name='Health' note={note} />
		</div>
	)
}
