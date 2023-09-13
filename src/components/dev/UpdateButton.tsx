import { useContext } from 'react'
import Button from '../Button'
import context from '../context'

export default function UpdateButton() {
	const { dispatch } = useContext(context)

	const handleUpdate = () => {
		// this is a test which updates the weapon document to see if the character
		// sheet which links to the weapon is updating properly.
		dispatch({
			type: 'UPDATE_DOCUMENT_VALUES',
			payload: {
				documentId: 'weapon',
				values: {
					name: 'Updated Weapon',
					notes: 'Updated Notes',
				},
			},
		})

		console.log('handleUpdate')
	}

	return (
		<Button
			onClick={handleUpdate}
			className='h-10 self-center rounded-full bg-gray-800 py-0 px-3 '
		>
			Update Data
		</Button>
	)
}
