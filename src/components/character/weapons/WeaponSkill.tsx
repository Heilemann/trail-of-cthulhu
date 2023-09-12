import { useContext } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import context from '../../context'
import weaponSkillList from '../../weaponSkillList'
import { TWeaponOnCharacter } from '../../../interfaces'
import Button from '../../Button'
import useMessageToApp from '../../UseMessageToApp'

type Props = {
	index: number
}

const WeaponSkill = ({ index }: Props) => {
	const { state } = useContext(context)
	const { editMode } = state
	const { register } = useFormContext()
	const messageToApp = useMessageToApp()

	const watchedWeapon: TWeaponOnCharacter = useWatch({
		name: `weapons.${index}`,
	})

	const handleClick = () => {
		messageToApp({
			message: 'send message',
			data: { message: '/r 1d6' },
		})
	}

	return (
		<td className='relative rounded-lg'>
			<div className='mt-1 rounded-lg pr-3 dark:bg-gray-800/50'>
				<select
					className={twMerge(
						'm-0 w-full cursor-pointer bg-transparent py-2.5 pl-1 text-base',
						editMode === 'view' ? 'hidden' : '',
					)}
					{...register(`weapons.${index}.skill`)}
				>
					{weaponSkillList.map(skill => (
						<option key={skill}>{skill}</option>
					))}
				</select>
			</div>
			{editMode === 'view' && (
				<Button
					className='w-full py-1'
					disabled={!watchedWeapon.skill && true}
					onClick={handleClick}
				>
					{watchedWeapon.skill || '—'}
				</Button>
			)}
		</td>
	)
}

export default WeaponSkill
