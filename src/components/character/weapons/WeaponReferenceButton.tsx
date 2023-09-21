import { useFormContext, useWatch } from 'react-hook-form'
import useMessageToApp from '../../BaseComponents/hooks/UseMessageToApp'
import Button from '../../Form/Button'
import { TWeaponOnCharacter } from '../../../interfaces'
import { WindowIcon } from '@heroicons/react/24/solid'
import { useContext, useMemo } from 'react'
import context from '../../BaseComponents/context'

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
		return state.documents.some(document => {
			return document._id === watchedWeapon.documentId
		})
	}, [state.documents, watchedWeapon.documentId])

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
