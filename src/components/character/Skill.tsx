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
	note?: JSX.Element
}

export default function Skill(props: ISkillProps) {
	const { name, specialities, note } = props
	const { state } = useContext(context)
	const { document, editMode, messageToApp } = state
	const { values } = document
	const { skills } = values
	const { register } = useFormContext()

	const rating = useWatch({
		name: `skills.${name}.rating`,
		defaultValue: (skills && skills[name]?.rating) || 0,
	})
	const pool = useWatch({
		name: `skills.${name}.pool`,
		defaultValue: (skills && skills[name]?.pool) || 0,
	})

	// 'convert' rating to array to map over
	const ratingArray = Array(rating || 0).fill(0) || []

	const handleSpend = () => {
		if (!messageToApp) return

		messageToApp('send message', {
			message: `Spend 1 point of ${name}`,
		})
	}

	return (
		<div
			className={twMerge(
				'py-1 px-2 text-base',
				borderStyle,
				editMode === 'view' && 'cursor-pointer hover:bg-gray-800',
			)}
			style={{
				fontFamily: 'DustismoRoman',
			}}
		>
			<div
				onClick={() => {
					!editMode && handleSpend()
				}}
				className={'flex dark:text-gray-300'}
			>
				<OccupationalAbility name={name} />
				<span className='flex-1 self-center'>{name}</span>
				<Input
					type='number'
					title='Pool points'
					className={twMerge(
						'w-12 bg-gray-50 py-0.5 text-right dark:bg-gray-800/50',
						editMode === 'view' && 'hidden',
					)}
					placeholder='0'
					defaultValue={pool}
					{...register(`skills.${name}.pool`, {
						// min: 0,
						max: rating || 0,
						valueAsNumber: true,
					})}
				/>
				{editMode === 'view' && <div>{pool}</div>}
				<span className='mx-1 self-center'>/</span>
				<Input
					type='number'
					title='Rating points'
					className={twMerge(
						'w-12 bg-gray-50 py-0.5 dark:bg-gray-800/50',
						editMode === 'view' && 'hidden',
					)}
					placeholder='0'
					defaultValue={rating}
					{...register(`skills.${name}.rating`, {
						min: 0,
						valueAsNumber: true,
					})}
				/>
				{editMode === 'view' && <div>{rating}</div>}
			</div>

			{note}

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
