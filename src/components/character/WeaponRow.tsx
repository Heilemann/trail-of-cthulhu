import { WindowIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { useContext } from 'react'
import { UseFieldArrayRemove, useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { TWeaponOnCharacter } from '../../interfaces'
import Button from '../Button'
import Input from '../Input'
import TextArea from '../Textarea'
import useMessageToApp from '../UseMessageToApp'
import context from '../context'
import weaponSkillList from '../weaponSkillList'

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
						className={twMerge(
							'bg-transparent',
							editMode === 'view' && 'hidden',
						)}
						placeholder='Weapon...'
						{...register(`weapons.${index}.name`)}
					/>
					{editMode === 'view' && <span>{watchedWeapon.name || '—'}</span>}
				</td>

				<td className='relative w-28 rounded-lg'>
					<div className='rounded-lg bg-gray-800'>
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
						<div className='text-left'>{watchedWeapon.skill || '—'}</div>
					)}
				</td>

				<td className='w-4 text-center'>
					<Input
						className={twMerge(
							'text-center',
							editMode === 'view' ? 'hidden' : '',
						)}
						placeholder='—'
						{...register(`weapons.${index}.range.pointblank`)}
					/>
					{editMode === 'view' && (
						<span>{watchedWeapon.range.pointblank || '—'}</span>
					)}
				</td>

				<td className='w-4 text-center'>
					<Input
						className={twMerge(
							'text-center',
							editMode === 'view' ? 'hidden' : '',
						)}
						placeholder='—'
						{...register(`weapons.${index}.range.close`)}
					/>
					{editMode === 'view' && (
						<span>{watchedWeapon.range.close || '—'}</span>
					)}
				</td>

				<td className='w-4 text-center'>
					<Input
						className={twMerge(
							'text-center',
							editMode === 'view' ? 'hidden' : '',
						)}
						placeholder='—'
						{...register(`weapons.${index}.range.near`)}
					/>
					{editMode === 'view' && (
						<span>{watchedWeapon.range.near || '—'}</span>
					)}
				</td>

				<td className='w-4 text-center'>
					<Input
						className={twMerge(
							'text-center',
							editMode === 'view' ? 'hidden' : '',
						)}
						placeholder='—'
						{...register(`weapons.${index}.range.long`)}
					/>
					{editMode === 'view' && (
						<span>{watchedWeapon.range.long || '—'}</span>
					)}
				</td>

				<td className='w-4'>
					<Button onClick={handleOpenWeapon} className='self-end p-1.5'>
						<WindowIcon className='h-4 w-4' />
					</Button>
					<input type='hidden' {...register(`weapons.${index}.documentId`)} />
				</td>

				<td className='w-4'>
					<Button
						onClick={() => handleRemove(index)}
						className='self-end p-1.5'
					>
						<XMarkIcon className='h-4 w-4' />
					</Button>
				</td>
			</tr>
			<tr className='border-b border-gray-300 dark:border-gray-800'>
				<td className='text-left ' colSpan={6}>
					<TextArea
						className={twMerge(
							'text-sm text-gray-500 dark:text-gray-500',
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
