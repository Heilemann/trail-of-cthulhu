import { useContext } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { TWeaponOnCharacter } from '../../../interfaces'
import Button from '../../Button'
import Input from '../../Input'
import useMessageToApp from '../../BaseComponents/hooks/UseMessageToApp'
import context from '../../context'

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
		watchedWeapon.range[rangeType] === '' ||
		watchedWeapon.range[rangeType] === undefined

	// enum for rangeType
	enum range {
		pointblank = 'point blank',
		close = 'close',
		near = 'near',
		long = 'long',
	}

	const validateNumberOrEmpty = (value: string) => {
		return (
			value === '' || !isNaN(Number(value)) || 'Input must be a number or empty'
		)
	}

	const handleClick = () => {
		const roll = '/r 1d6'
		const modifier = watchedWeapon.range[rangeType] // This is initially a string

		let modifierString = ''

		if (modifier !== undefined && modifier !== '') {
			const modifierNumber = Number(modifier)

			// Ensure the conversion was successful and the value is not NaN
			if (!isNaN(modifierNumber)) {
				if (modifierNumber > 0) {
					modifierString = ` + ${modifierNumber}`
				} else if (modifierNumber < 0) {
					// Convert to positive to avoid double minus (e.g., --3)
					modifierString = ` - ${Math.abs(modifierNumber)}`
				} // No need for an else clause here because modifierNumber === 0 effectively adds nothing
			}
		}

		const message = `${roll}${modifierString} for damage at ${range[rangeType]} range with my ${watchedWeapon.name}`

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
				{...register(`weapons.${index}.range.${rangeType}`, {
					validate: validateNumberOrEmpty,
				})}
			/>
			{editMode === 'view' && (
				<Button
					className='w-full py-1'
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
