import { useContext, useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import Input from '../../Input'
import useMessageToApp from '../../UseMessageToApp'
import context from '../../context'
import { TWeaponOnCharacter } from '../../../interfaces'
import Button from '../../Button'

type Props = {
	index: number
	rangeType: 'pointblank' | 'close' | 'near' | 'long'
}

const WeaponRange = ({ index, rangeType }: Props) => {
	const { state } = useContext(context)
	const { editMode } = state
	const { register } = useFormContext()
	const messageToApp = useMessageToApp()

	const watchedWeapon: TWeaponOnCharacter = useWatch({
		name: `weapons.${index}`,
	})

	const isDisabled =
		!watchedWeapon?.range ||
		!watchedWeapon.range[rangeType] ||
		isNaN(watchedWeapon.range[rangeType])

	// enum for rangeType
	enum range {
		pointblank = 'point blank',
		close = 'close',
		near = 'near',
		long = 'long',
	}

	const handleClick = () => {
		const roll = '/r 1d6'
		const modifier = watchedWeapon.range[rangeType]
		const message = `${roll} + ${modifier} for damage at ${range[rangeType]} range with my ${watchedWeapon.name}`

		messageToApp({
			message: 'send message',
			data: { message },
		})
	}

	return (
		<td className='text-center'>
			<Input
				className={twMerge(
					'mt-1 text-center',
					editMode === 'view' ? 'hidden' : '',
				)}
				type='number'
				placeholder='—'
				{...register(`weapons.${index}.range.${rangeType}`)}
			/>
			{editMode === 'view' && (
				<Button
					className={twMerge(
						'w-full py-1',
						isDisabled && 'cursor-default bg-transparent dark:bg-transparent',
					)}
					disabled={isDisabled}
					onClick={handleClick}
				>
					<span>{watchedWeapon.range[rangeType] || '—'}</span>
				</Button>
			)}
		</td>
	)
}

export default WeaponRange
