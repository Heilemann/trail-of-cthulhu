import { useContext } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import Input from '../../Form/Input'
import { borderStyle } from '../../styles/borderStyle'
import context from '../../BaseComponents/context'
import OccupationalAbility from './OccupationalAbility'
import { SkillPopover } from '../../SkillPopover'
import SkillSpecialities from './SkillSpecialities'

export interface ISkillProps {
	name: string
	category: 'investigative' | 'general'
	specialities?: boolean
	note?: JSX.Element | null
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

	const pool = useWatch({
		name: `skills.${category}.${name}.pool`,
		defaultValue: (skills && skills[category][name]?.pool) || 0,
	})

	const rating = useWatch({
		name: `skills.${category}.${name}.rating`,
		defaultValue: (skills && skills[category][name]?.rating) || 0,
	})

	// convert rating to an array to map over
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
				<span
					className={twMerge(
						'flex-1 self-center',
						rating === 0 && 'text-gray-500',
					)}
				>
					{name}
				</span>
				<Input
					className={twMerge(
						'w-12 bg-green-400 py-0.5 text-right dark:bg-gray-800/50',
						pool > rating && 'dark:bg-red-800/50',
						editMode === 'view' && 'hidden',
					)}
					type='number'
					title='Pool points'
					placeholder='0'
					defaultValue={pool}
					max={rating || 0}
					min={0}
					disabled={!pool || pool === 0}
					{...register(`skills.${category}.${name}.pool`, {
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
					min={0}
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
