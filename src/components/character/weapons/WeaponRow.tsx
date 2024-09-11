import { TrashIcon } from '@heroicons/react/24/solid'
import { Input } from 'nrsystemtools'
import { useContext } from 'react'
import { UseFieldArrayRemove, useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { TWeaponOnCharacter } from '../../../interfaces/interfaces'
import context from '../../BaseComponents/context'
import Button from '../../BaseComponents/Form/Button'
import TextArea from '../../BaseComponents/Form/Textarea'
import WeaponAmmo from './WeaponAmmo'
import WeaponRange from './WeaponRange'
import WeaponReferenceButton from './WeaponReferenceButton'
import WeaponSkill from './WeaponSkill'

export interface IWeaponRowProps {
	index: number
	remove: UseFieldArrayRemove
	weapon: TWeaponOnCharacter
}

export default function WeaponRow({ index, remove, weapon }: IWeaponRowProps) {
	const { state } = useContext(context)
	const { editMode } = state
	const { register } = useFormContext()

	const watchedWeapon: TWeaponOnCharacter = useWatch({
		name: `weapons.${index}`,
	})

	const handleRemove = (index: number) => {
		remove(index)
	}

	return (
		<>
			<tr key={index}>
				<td className='text-left'>
					<Input
						className={twMerge('mt-1', editMode === 'view' && 'hidden')}
						placeholder='Weapon...'
						{...register(`weapons.${index}.name`)}
					/>
					{editMode === 'view' && <span>{watchedWeapon?.name || '—'}</span>}
				</td>

				<WeaponSkill index={index} />

				<WeaponRange index={index} rangeType='pointblank' />
				<WeaponRange index={index} rangeType='close' />
				<WeaponRange index={index} rangeType='near' />
				<WeaponRange index={index} rangeType='long' />

				<WeaponAmmo index={index} />

				<WeaponReferenceButton index={index} />

				<td>
					<Button
						onClick={() => handleRemove(index)}
						className='self-end p-1.5'
						aria-label='Remove weapon'
					>
						<TrashIcon className='h-4 w-4' title='Remove weapon' />
					</Button>
				</td>
			</tr>
			<tr className='border-b border-gray-800'>
				<td className='text-left ' colSpan={6}>
					<TextArea
						className={twMerge(
							'mt-0 text-sm text-gray-500 placeholder:text-gray-700',
							editMode === 'view' && 'hidden',
						)}
						placeholder='Notes...'
						{...register(`weapons.${index}.notes`)}
					/>
					{editMode === 'view' && watchedWeapon?.notes && (
						<div className='my-1 text-sm text-gray-500'>
							{watchedWeapon?.notes}
						</div>
					)}
				</td>
			</tr>
		</>
	)
}
