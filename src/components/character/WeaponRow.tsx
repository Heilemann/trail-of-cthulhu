import { WindowIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { useContext } from 'react'
import { UseFieldArrayRemove, useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { TWeaponOnCharacter } from '../../interfaces'
import Button from '../Button'
import Input from '../Input'
import useMessageToApp from '../UseMessageToApp'
import context from '../context'
import WeaponDamage from './WeaponDamage'
import TextArea from '../Textarea'

export interface IWeaponRowProps {
	index: number
	remove: UseFieldArrayRemove
}

export default function WeaponRow(props: IWeaponRowProps) {
	const { index, remove } = props
	const { state } = useContext(context)
	const { editMode } = state
	const { register } = useFormContext()
	const messageToApp = useMessageToApp()

	const weapon = useWatch({
		name: `weapons.${index}`,
	}) as TWeaponOnCharacter

	const handleOpenWeapon = () => {
		const { documentId } = weapon
		messageToApp({ message: 'open document', data: { documentId } })
	}

	const handleRemove = (index: number) => {
		remove(index)
	}

	return (
		<>
			<tr key={index} className='border-b border-gray-300 dark:border-gray-800'>
				<td>
					<Input
						className={twMerge(
							'bg-transparent dark:bg-transparent',
							editMode === 'view' && 'hidden',
						)}
						placeholder='Weapon...'
						{...register(`weapons.${index}.name`)}
					/>
					{editMode === 'view' && <span>{weapon.name || '—'}</span>}
				</td>

				{/* <WeaponDamage index={index} /> */}

				{/* <WeaponSkills index={index} /> */}

				<td className='text-center'>
					<Input
						className={twMerge(
							'bg-transparent dark:bg-transparent',
							editMode === 'view' && 'hidden',
						)}
						placeholder='—'
						{...register(`weapons.${index}.range.pointBlank`)}
					/>
					{editMode === 'view' && <span>{weapon.range.pointBlank || '—'}</span>}
				</td>

				<td className='text-center'>
					<Input
						className={twMerge(
							'bg-transparent dark:bg-transparent',
							editMode === 'view' && 'hidden',
						)}
						placeholder='—'
						{...register(`weapons.${index}.range.close`)}
					/>
					{editMode === 'view' && <span>{weapon.range.close || '—'}</span>}
				</td>

				<td className='text-center'>
					<Input
						className={twMerge(
							'bg-transparent dark:bg-transparent',
							editMode === 'view' && 'hidden',
						)}
						placeholder='—'
						{...register(`weapons.${index}.range.near`)}
					/>
					{editMode === 'view' && <span>{weapon.range.near || '—'}</span>}
				</td>

				<td className='text-center'>
					<Input
						className={twMerge(
							'bg-transparent dark:bg-transparent',
							editMode === 'view' && 'hidden',
						)}
						placeholder='—'
						{...register(`weapons.${index}.range.long`)}
					/>
					{editMode === 'view' && <span>{weapon.range.long || '—'}</span>}
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
			<tr>
				<td className='py-1 text-sm text-gray-500' colSpan={7}>
					<TextArea
						className={twMerge('bg-transparent dark:bg-transparent')}
						disabled={editMode === 'view'}
						placeholder='&mdash;'
						{...register(`weapons.${index}.notes`)}
					/>
				</td>
			</tr>
		</>
	)
}
