import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { useContext } from 'react'
import { UseFieldArrayRemove, useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { TWeaponOnCharacter } from '../../interfaces'
import Button from '../Button'
import Input from '../Input'
import useMessageToApp from '../UseMessageToApp'
import context from '../context'
import WeaponDamage from './WeaponDamage'

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

		console.log('trying to open weapon', documentId)

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

				<WeaponDamage index={index} />

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
					{editMode === 'view' && <span>{weapon.pointBlank || '—'}</span>}
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
					{editMode === 'view' && <span>{weapon.close || '—'}</span>}
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
					{editMode === 'view' && <span>{weapon.near || '—'}</span>}
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
					{editMode === 'view' && <span>{weapon.long || '—'}</span>}
				</td>

				<td className='w-4'>
					<Button onClick={handleOpenWeapon} className='self-end p-1.5'>
						<InformationCircleIcon className='h-4 w-4' />
					</Button>
					<input type='hidden' {...register(`weapons.${index}.documentId`)} />
					{/* {weapons[index].documentId && (
					<input type='hidden' {...register(`weapons.${index}.documentId`)} />
				)} */}
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
			{editMode === 'edit' && (
				<tr>
					<td className='' colSpan={8}>
						<Input
							className={twMerge('bg-transparent dark:bg-transparent')}
							placeholder='&mdash;'
							{...register(`weapons.${index}.notes`)}
						/>
					</td>
				</tr>
			)}
			{weapon.notes && editMode === 'view' && (
				<tr>
					<td>{weapon.notes || '—'}</td>
				</tr>
			)}
		</>
	)
}
