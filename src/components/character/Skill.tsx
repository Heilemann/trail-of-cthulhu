import { useContext } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import Input from '../Input'
import { borderStyle } from '../borderStyle'
import context from '../context'
import OccupationalAbility from './OccupationalAbility'
import SkillSpecialities from './SkillSpecialities'
import SkillSpendButton from './SkillSpendButton'

export interface ISkillProps {
	name: string
	category: 'investigative' | 'general'
	specialities?: boolean
	note?: JSX.Element
}

export default function Skill({
	name,
	category,
	specialities,
	note,
}: ISkillProps) {
	const { state } = useContext(context)
	const { document, editMode } = state
	const { values } = document
	const { skills } = values
	const { register } = useFormContext()

	const rating = useWatch({
		name: `skills.${category}.${name}.rating`,
		defaultValue: (skills && skills[category][name]?.rating) || 0,
	})
	const pool = useWatch({
		name: `skills.${category}.${name}.pool`,
		defaultValue: (skills && skills[category][name]?.pool) || 0,
	})

	// 'convert' rating to array to map over
	const ratingArray = Array(rating || 0).fill(0) || []

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
			<div className={'flex dark:text-gray-300'}>
				<OccupationalAbility name={name} category={category} />
				<span className='flex-1 self-center'>{name}</span>
				<Input
					className={twMerge(
						'w-12 bg-gray-50 py-0.5 text-right dark:bg-gray-800/50',
						editMode === 'view' && 'hidden',
					)}
					type='number'
					title='Pool points'
					placeholder='0'
					defaultValue={pool}
					{...register(`skills.${category}.${name}.pool`, {
						// min: 0,
						max: rating || 0,
						valueAsNumber: true,
					})}
				/>
				{editMode === 'view' && <div>{pool}</div>}
				<span className='mx-1 self-center'>/</span>
				<Input
					className={twMerge(
						'w-12 bg-gray-50 py-0.5 dark:bg-gray-800/50',
						editMode === 'view' && 'hidden',
					)}
					type='number'
					title='Rating points'
					placeholder='0'
					defaultValue={rating}
					{...register(`skills.${category}.${name}.rating`, {
						min: 0,
						valueAsNumber: true,
					})}
				/>
				{editMode === 'view' && <div>{rating}</div>}
				<SkillSpendButton name={name} category={category} />
			</div>

			{note}

			{specialities &&
				ratingArray.map((_, index) => (
					<SkillSpecialities name={name} category={category} index={index} />
				))}
		</div>
	)
}
