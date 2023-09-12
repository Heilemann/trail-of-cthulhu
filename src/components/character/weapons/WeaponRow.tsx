import { TrashIcon, WindowIcon } from '@heroicons/react/24/solid'
import { useContext } from 'react'
import { UseFieldArrayRemove, useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { TWeaponOnCharacter } from '../../../interfaces'
import Button from '../../Button'
import Input from '../../Input'
import TextArea from '../../Textarea'
import useMessageToApp from '../../UseMessageToApp'
import context from '../../context'
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
	const messageToApp = useMessageToApp()

	const watchedWeapon: TWeaponOnCharacter = useWatch({
		name: `weapons.${index}`,
	})

	const handleOpenWeapon = () => {
		const { documentId } = watchedWeapon
		messageToApp({ message: 'open document', data: { documentId } })
	}

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
					{editMode === 'view' && <span>{watchedWeapon.name || '—'}</span>}
				</td>

				<WeaponSkill index={index} />

				<td className='text-center'>
					<Input
						className={twMerge(
							'mt-1 text-center',
							editMode === 'view' ? 'hidden' : '',
						)}
						placeholder='—'
						{...register(`weapons.${index}.range.pointblank`)}
					/>
					{editMode === 'view' && (
						<span>{watchedWeapon.range.pointblank || '—'}</span>
					)}
				</td>

				<td className='text-center'>
					<Input
						className={twMerge(
							'mt-1 text-center',
							editMode === 'view' ? 'hidden' : '',
						)}
						placeholder='—'
						{...register(`weapons.${index}.range.close`)}
					/>
					{editMode === 'view' && (
						<span>{watchedWeapon.range.close || '—'}</span>
					)}
				</td>

				<td className='text-center'>
					<Input
						className={twMerge(
							'mt-1 text-center',
							editMode === 'view' ? 'hidden' : '',
						)}
						placeholder='—'
						{...register(`weapons.${index}.range.near`)}
					/>
					{editMode === 'view' && (
						<span>{watchedWeapon.range.near || '—'}</span>
					)}
				</td>

				<td className='text-center'>
					<Input
						className={twMerge(
							'mt-1 text-center',
							editMode === 'view' ? 'hidden' : '',
						)}
						placeholder='—'
						{...register(`weapons.${index}.range.long`)}
					/>
					{editMode === 'view' && (
						<span>{watchedWeapon.range.long || '—'}</span>
					)}
				</td>

				<td>
					<Button
						onClick={handleOpenWeapon}
						className='self-end p-1.5'
						aria-label='Open weapon sheet'
					>
						<WindowIcon className='h-4 w-4' title='Open weapon sheet' />
					</Button>
					<input type='hidden' {...register(`weapons.${index}.documentId`)} />
				</td>

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
			<tr className='border-b border-gray-300 dark:border-gray-800'>
				<td className='text-left ' colSpan={6}>
					<TextArea
						className={twMerge(
							'mt-0 text-sm text-gray-500 placeholder:text-gray-700 dark:text-gray-500',
							editMode === 'view' && 'hidden',
						)}
						placeholder='Notes...'
						{...register(`weapons.${index}.notes`)}
					/>
					{editMode === 'view' && watchedWeapon.notes && (
						<div className='my-1 text-sm text-gray-500 dark:text-gray-500'>
							{watchedWeapon.notes}
						</div>
					)}
				</td>
			</tr>
		</>
	)
}
