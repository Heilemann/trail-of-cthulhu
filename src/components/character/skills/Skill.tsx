import { NumberInput } from 'nrsystemtools'
import { useContext } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import context from '../../BaseComponents/context'
import { SkillPopover } from '../../SkillPopover'
import { borderStyle } from '../../styles/borderStyle'
import OccupationalAbility from './OccupationalAbility'
import SkillSpecialities from './SkillSpecialities'
import SkillSpecialitiesList from './SkillSpecialitiesList'

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
	const { showAllSkills, document, editMode } = state
	const { register, control } = useFormContext()

	const skill = useWatch({
		control,
		name: `skills.${category}.${name}`,
		defaultValue: { pool: 0, rating: 0 },
	})

	const { pool, rating } = skill

	// convert rating to an array to map over
	const ratingArray = Array(rating || 0).fill(0) || []

	const SkillContent = (
		<div
			className={twMerge(
				'py-1 text-lg',
				borderStyle,
				editMode === 'view' && rating === 0 && 'text-gray-400',
				editMode === 'view' &&
					rating > 0 &&
					'cursor-pointer text-gray-300 hover:bg-gray-800',
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
						className={twMerge(
							'w-12 py-0.5 text-center',
							editMode === 'view' && 'hidden',
						)}
						title='Pool points'
						placeholder='0'
						centerValue={true}
						{...register(`skills.${category}.${name}.pool`, {
							min: { value: 0, message: 'Pool cannot be negative' },
							max: { value: rating || 0, message: 'Pool cannot exceed rating' },
							valueAsNumber: true,
						})}
					/>
					{editMode === 'view' && <div>{pool}</div>}
					<span className='self-center'>/</span>
					<NumberInput
						className={twMerge('w-12 py-0.5', editMode === 'view' && 'hidden')}
						title='Rating points'
						placeholder='0'
						// defaultValue={rating}
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

	if (!showAllSkills && rating === 0) {
		return null
	}

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
