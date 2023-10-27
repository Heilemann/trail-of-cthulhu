import { useContext } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { TSkill, TWeaponOnCharacter } from '../../../interfaces'
import context from '../../BaseComponents/context'
import weaponSkillList from '../../data/weaponSkillList'
import { WeaponSkillPopover } from './WeaponSkillPopover'
import Dropdown from '../../BaseComponents/Form/Dropdown'

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
			<div className='mt-1 rounded-lg bg-gray-800 p-0.5 pr-2'>
				<div className={twMerge('mt-1', editMode === 'view' ? 'hidden' : '')}>
					<Dropdown {...register(`weapons.${index}.skill`)} className='m-0 p-0'>
						{weaponSkillList.map(skill => (
							<option key={skill}>{skill}</option>
						))}
					</Dropdown>
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
