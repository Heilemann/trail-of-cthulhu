import { useContext } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { borderStyle } from '../borderStyle'
import context from '../context'
import Input from '../Input'
import OccupationalAbility from './OccupationalAbility'
import SkillSpecialities from './SkillSpecialities'

export interface ISkillProps {
	name: string
	specialities?: boolean
}

export default function Skill(props: ISkillProps) {
	const { name, specialities } = props
	const { state } = useContext(context)
	const { document, messageToApp } = state
	const { values } = document
	const { skills } = values
	const { register } = useFormContext()

	const rating = useWatch({
		name: `skills.${name}.rating`,
		defaultValue: (skills && skills[name]?.rating) || 0,
	})

	// 'convert' rating to array to map over
	const ratingArray = Array(parseInt(rating || 0, 10)).fill(0) || []

	const handleSpend = () => {
		if (!messageToApp) return

		messageToApp('send message', {
			message: `Spend 1 point of ${name}`,
		})
	}

	return (
		<div
			className={twMerge('py-1 text-base', borderStyle)}
			style={{
				fontFamily: 'DustismoRoman',
			}}
		>
			<div onClick={handleSpend} className='flex'>
				<OccupationalAbility name={name} />
				&nbsp;
				<span className='flex-1 self-center'>{name}</span>
				<Input
					type='number'
					className='w-12 py-1'
					title='Pool points'
					placeholder='&mdash;'
					{...register(`skills.${name}.pool`)}
				/>
				<span className='mx-1 self-center'>/</span>
				<Input
					type='number'
					className='w-12 py-1'
					title='Rating points'
					placeholder='&mdash;'
					{...register(`skills.${name}.rating`)}
				/>
			</div>
			{specialities &&
				ratingArray.map((_, index) => (
					<SkillSpecialities name={name} index={index} />
				))}

			{/* <div
				className='text-gray-500'
				dangerouslySetInnerHTML={{ __html: (skillList as any)[name] }}
			/> */}
		</div>
	)
}
