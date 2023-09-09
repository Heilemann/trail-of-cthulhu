import { useContext } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import Input from '../Input'
import { borderStyle } from '../borderStyle'
import context from '../context'
import OccupationalAbility from './OccupationalAbility'
import SkillSpecialities from './SkillSpecialities'
import { SkillPopover } from '../SkillPopover'

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

	// 'convert' rating to an array to map over
	const ratingArray = Array(rating || 0).fill(0) || []

	const SkillContent = (
		<div
			className={twMerge(
				'py-1 px-2 text-base',
				borderStyle,
				editMode === 'view' && rating === 0 && 'text-gray-400',
				editMode === 'view' &&
					rating > 0 &&
					'cursor-pointer text-gray-800 hover:bg-gray-800 dark:text-gray-300',
			)}
			style={{
				fontFamily: 'DustismoRoman',
			}}
		>
			<div className={'flex'}>
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
			</div>

			{note}

			{specialities &&
				ratingArray.map((_, index) => (
					<SkillSpecialities name={name} category={category} index={index} />
				))}
		</div>
	)

	if (editMode === 'view' && rating) {
		return (
			<SkillPopover name={name} category={category}>
				{SkillContent}
			</SkillPopover>
		)
	} else {
		return SkillContent
	}
}
