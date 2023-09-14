import { useContext } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { TSkill, TWeaponOnCharacter } from '../../../interfaces'
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

	const skill: TSkill = useWatch({
		name: `skills.general.${watchedWeapon?.skill}`,
		defaultValue: {
			pool: '0',
			rating: '0',
		},
	})
	const { pool, rating } = skill

	let skillDisplayString: string = watchedWeapon?.skill || '—'

	if (watchedWeapon?.skill && pool !== undefined && rating !== undefined) {
		skillDisplayString = `${watchedWeapon.skill} (${pool}/${rating})`
	}

	return (
		<td className='relative'>
			<div className='rounded-lg bg-gray-200/50 pr-3 dark:bg-gray-800'>
				<div className={twMerge('mt-1', editMode === 'view' ? 'hidden' : '')}>
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
					<WeaponSkillPopover index={index} skillName={watchedWeapon.skill}>
						<div className='py-1.5'>{skillDisplayString}</div>
					</WeaponSkillPopover>
				)}
			</div>
		</td>
	)
}

export default WeaponSkill
