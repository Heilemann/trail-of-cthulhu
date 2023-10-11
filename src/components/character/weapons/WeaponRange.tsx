import { useContext } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { TWeaponOnCharacter } from '../../../interfaces'
import context from '../../BaseComponents/context'
import useMessageToApp from '../../BaseComponents/hooks/UseMessageToApp'
import Button from '../../BaseComponents/Form/Button'
import { default as NumberInput } from '../../BaseComponents/Form/NumberInput'

type Props = {
	index: number
	rangeType: 'pointblank' | 'close' | 'near' | 'long'
}

const WeaponRange = ({ index, rangeType }: Props) => {
	const { state } = useContext(context)
	const { editMode } = state
	const messageToApp = useMessageToApp()
	const { register } = useFormContext()

	const watchedWeapon: TWeaponOnCharacter = useWatch({
		name: `weapons.${index}`,
	})

	const isDisabled =
		!watchedWeapon?.range ||
		watchedWeapon?.range[rangeType] === null ||
		watchedWeapon?.range[rangeType] === undefined

	// enum for rangeType
	enum range {
		pointblank = 'point blank',
		close = 'close',
		near = 'near',
		long = 'long',
	}

	const handleClick = () => {
		const roll = '/r 1d6'
		const modifier = watchedWeapon.range[rangeType] // This is initially a string

		let modifierString = ''

		if (modifier !== undefined && modifier !== null) {
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
			<NumberInput
				className='mt-1 text-center'
				min={0}
				{...register(`weapons.${index}.range.${rangeType}`)}
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
