import { WindowIcon } from '@heroicons/react/24/solid'
import { useContext, useMemo } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { TWeaponOnCharacter } from '../../../interfaces/interfaces'
import context from '../../BaseComponents/context'
import Button from '../../BaseComponents/Form/Button'
import useMessageToApp from '../../BaseComponents/hooks/UseMessageToApp'

type Props = {
	index: number
}

const WeaponReferenceButton = ({ index }: Props) => {
	const { state } = useContext(context)
	const messageToApp = useMessageToApp()
	const { register } = useFormContext()

	const watchedWeapon: TWeaponOnCharacter = useWatch({
		name: `weapons.${index}`,
	})

	const isReferenceDocument = useMemo(() => {
		return watchedWeapon.documentId && watchedWeapon.documentId !== ''
	}, [watchedWeapon.documentId])

	const referenceDocumentExists = useMemo(() => {
		return state.documents.byId.hasOwnProperty(watchedWeapon.documentId)
	}, [state.documents.byId, watchedWeapon.documentId])

	const handleOpenWeapon = () => {
		const { documentId } = watchedWeapon
		messageToApp({ message: 'open document', data: { documentId } })
	}

	return (
		<td>
			{isReferenceDocument && referenceDocumentExists && (
				<Button
					onClick={handleOpenWeapon}
					className='self-end p-1.5'
					aria-label='Open weapon sheet'
				>
					<WindowIcon className='h-4 w-4' title='Open weapon sheet' />
				</Button>
			)}

			<input type='hidden' {...register(`weapons.${index}.documentId`)} />
		</td>
	)
}

export default WeaponReferenceButton
