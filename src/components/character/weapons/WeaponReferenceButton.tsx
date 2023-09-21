import { useFormContext, useWatch } from 'react-hook-form'
import useMessageToApp from '../../BaseComponents/hooks/UseMessageToApp'
import Button from '../../Form/Button'
import { TWeaponOnCharacter } from '../../../interfaces'
import { WindowIcon } from '@heroicons/react/24/solid'

type Props = {
	index: number
}

const WeaponReferenceButton = ({ index }: Props) => {
	const messageToApp = useMessageToApp()
	const { register } = useFormContext()

	const watchedWeapon: TWeaponOnCharacter = useWatch({
		name: `weapons.${index}`,
	})

	const handleOpenWeapon = () => {
		const { documentId } = watchedWeapon
		messageToApp({ message: 'open document', data: { documentId } })
	}

	if (!watchedWeapon.documentId) {
		return <td></td>
	}

	return (
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
	)
}

export default WeaponReferenceButton
