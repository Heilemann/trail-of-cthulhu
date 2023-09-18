import { useContext } from 'react'
import Button from '../../Form/Button'
import context from '../context'

const fakeGameData = {
	documents: [
		{
			_id: 'character',
			parentId: 'root',
			type: 'character',
			creator: 'user1',
			access: 'public',
			accessList: ['user2', 'user3'],
			values: {
				name: 'Document 1',
			},
		},
		{
			_id: 'doc2',
			parentId: 'root',
			type: 'character',
			creator: 'user1',
			access: 'private',
			accessList: [],
			values: {
				name: 'Document 2',
			},
		},
		{
			_id: 'weapon',
			parentId: 'root',
			type: 'weapon',
			creator: 'user1',
			access: 'public',
			accessList: ['user2', 'user3'],
			values: {
				name: 'Document 3',
			},
		},
	],
	assets: [
		{
			_id: 'asset1',
			name: 'Asset 1',
			fileurl: 'http://example.com/asset1.png',
			filesize: 1024,
			filetype: 'image/png',
			width: 1920,
			height: 1080,
			creator: 'user1',
		},
		{
			_id: 'asset2',
			name: 'Asset 2',
			fileurl: 'http://example.com/asset2.jpg',
			filesize: 2048,
			filetype: 'image/jpeg',
			width: 1080,
			height: 720,
			creator: 'user2',
		},
	],
}

export default function UpdateButton() {
	const { state } = useContext(context) // Added 'state' to log current state

	const handleUpdate = () => {
		console.log('Current state before handleUpdate', state)

		const payload = {
			id: 'character',
			...fakeGameData,
		}

		window.postMessage(
			{
				message: 'update data',
				source: 'App', // or 'Aux' or whichever source you need
				data: payload,
			},
			'*',
		)
	}

	return (
		<div className='debug-buttons'>
			<Button
				onClick={() => handleUpdate()}
				className='h-10 self-center rounded-full bg-gray-800 py-0 px-3'
			>
				Update Weapon
			</Button>
			{/* Add more buttons to simulate different events */}
		</div>
	)
}
