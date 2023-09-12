import { useContext } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { TWeaponOnCharacter } from '../../../interfaces'
import context from '../../context'
import weaponSkillList from '../../weaponSkillList'
import { WeaponSkillPopover } from './WeaponSkillPopover'

type Props = {
	index: number
}

const WeaponSkill = ({ index }: Props) => {
	const { state } = useContext(context)
	const { editMode } = state
	const { register } = useFormContext()

	const watchedWeapon: TWeaponOnCharacter = useWatch({
		name: `weapons.${index}`,
	})

	return (
		<td className='relative rounded-lg'>
			<div
				className={twMerge(
					'mt-1 rounded-lg bg-gray-200/50 pr-3 dark:bg-gray-800/50',
					editMode === 'view' ? 'hidden' : '',
				)}
			>
				<select
					className={twMerge(
						'm-0 w-full cursor-pointer bg-transparent py-2.5 pl-1 text-base',
					)}
					{...register(`weapons.${index}.skill`)}
				>
					{weaponSkillList.map(skill => (
						<option key={skill}>{skill}</option>
					))}
				</select>
			</div>
			{editMode === 'view' && (
				<WeaponSkillPopover index={index}>
					<span>{watchedWeapon.skill || '—'}</span>
				</WeaponSkillPopover>
			)}
		</td>
	)
}

export default WeaponSkill
