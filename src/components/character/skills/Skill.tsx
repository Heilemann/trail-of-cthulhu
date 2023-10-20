import { useContext } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import context from '../../BaseComponents/context'
import { SkillPopover } from '../../SkillPopover'
import { borderStyle } from '../../styles/borderStyle'
import OccupationalAbility from './OccupationalAbility'
import SkillSpecialities from './SkillSpecialities'
import SkillSpecialitiesList from './SkillSpecialitiesList'
import { NumberInput } from 'nrsystemtools'

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
				'py-1 text-base',
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
			<div className='flex space-x-2'>
				<OccupationalAbility name={name} category={category} />
				<span
					className={twMerge(
						'flex-1 self-center',
						rating === 0 && 'text-gray-500',
					)}
				>
					{name}
				</span>
				<div className='flex space-x-0.5'>
					<NumberInput
						{...register(`skills.${category}.${name}.pool`, {
							max: { value: rating || 0, message: 'Pool cannot exceed rating' },
							min: { value: 0, message: 'Pool cannot be negative' },
							valueAsNumber: true,
						})}
						className={twMerge(
							'w-12 py-0.5 text-center',
							editMode === 'view' && 'hidden',
						)}
						placeholder='0'
					/>
					{editMode === 'view' && <div>{pool}</div>}
					<span className='self-center'>/</span>
					<NumberInput
						className={twMerge('w-12 py-0.5', editMode === 'view' && 'hidden')}
						title='Rating points'
						placeholder='0'
						defaultValue={rating}
						centerValue={true}
						min={0}
						{...register(`skills.${category}.${name}.rating`, {
							min: 0,
							valueAsNumber: true,
						})}
					/>
					{editMode === 'view' && <div>{rating}</div>}
				</div>
			</div>

			{note}

			{specialities &&
				ratingArray.map((_, index) => (
					<>
						<SkillSpecialities name={name} category={category} index={index} />
					</>
				))}
			{specialities && (
				<SkillSpecialitiesList name={name} category={category} />
			)}
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
