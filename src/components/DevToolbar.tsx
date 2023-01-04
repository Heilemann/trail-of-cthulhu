import { EyeIcon, PencilIcon } from '@heroicons/react/solid'
import { useContext, useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { TAccess, TState } from '../interfaces'
import systemConfig from '../system.json'
import Button from './Button'
import Tabs from './Tabs'
import context from './context'
import CollectionPicker from './dev/CollectionPicker'

/*
	This is a development tool which is enabled by creating a .env file and putting this in it:

	NODE_ENV = 'development'

	This will enable the development toolbar which allows you to switch between edit and view mode, and also allows you to select a document to edit, as well as managing the data handling. This is a not a proper substitute for deploying to a real game for testing, but it is useful for development.

	It will do very simple message handling to the parent window, and will also listen for messages from the parent window, and it will store the documentId in localStorage so that it will persist between page refreshes.
*/

const documents = [
	{
		_id: '123',
		creator: 'abc',
		access: 'public' as TAccess,
		accessList: [],
		type: 'character',
		values: {
			name: 'Dr. Bongo',
		},
	},
]

let initialData = {
	documentId: documents[0]._id,
	editMode: 'edit' as 'edit' | 'view',
	document: documents[0],
	documents: documents,
	assets: [],
} as TState

const tabs = {
	name: 'editMode',
	options: [
		{
			label: <PencilIcon className='h-4 w-4' aria-hidden='true' />,
			value: 'edit',
		},
		{
			label: <EyeIcon className='h-4 w-4' aria-hidden='true' />,
			value: 'view',
		},
	],
}

export default function DevToolbar() {
	const { state, dispatch } = useContext(context)
	const [collections, setCollections] = useState<any[]>([])
	const { register, watch, control } = useForm()

	// track which document type to display, e.g. 'character'
	const documentId = useWatch({
		control,
		name: 'documentId',
		defaultValue: localStorage.getItem('documentId') || 'character',
	})

	const saveActiveDocumentType = () => {
		localStorage.setItem('documentId', documentId)
	}
	useEffect(saveActiveDocumentType, [documentId])

	// Update the state with the editMode when it changes
	const initEditModeWatcher = () => {
		const subscription = watch(values => {
			const { editMode } = values

			dispatch({
				type: 'LOAD',
				payload: {
					...state,
					editMode,
				},
			})
		})

		return () => subscription.unsubscribe()
	}
	useEffect(initEditModeWatcher, [dispatch, state, watch])

	//
	const fakeDocumentsFromSystemConfig = () => {
		setCollections(systemConfig.collections)

		// create a fake state object
		const fakeData = {
			documents: [],
			assets: [],
			editMode: 'edit',
		} as Partial<TState>

		// for each collection create a fake document we can use to switch UI
		systemConfig.collections.forEach(collection => {
			const document = {
				_id: collection.type,
				type: collection.type,
				creator: 'abc',
				access: 'public' as TAccess,
				accessList: [],
				values: {
					name: 'No name',
				},
			}
			fakeData.documents?.push(document)
		})

		// set the first document as the default
		fakeData['document'] = fakeData.documents![0]

		// if there is any previously stored data, load it and
		// overwrite the appropriate the default fake data as needed
		const savedData = JSON.parse(localStorage.getItem('state') || '{}')

		fakeData['documentId'] = documentId

		fakeData.document = {
			...fakeData.document,
			...savedData,
		}

		setTimeout(() => {
			window.postMessage({
				message: 'load',
				source: 'App',
				data: fakeData,
			})
		}, 200)
	}
	useEffect(fakeDocumentsFromSystemConfig, [documentId])

	const handleClearStorage = () => {
		localStorage.clear()
		window.location.reload()
	}

	const simulateParentFrame = () => {
		const simulatedMessages = ({ data: payload }: any) => {
			const { message, source, data } = payload

			if (source !== 'System') return

			console.log('app heard message from system:', message, ', data:', data)

			switch (message) {
				case 'system is ready':
					let loadedState = JSON.parse(localStorage.getItem('state') || '{}')

					if (Object.keys(loadedState).length) {
						initialData = {
							...initialData,
							...loadedState,
						}
					}

					window.parent.postMessage({
						source: 'Aux',
						message: 'load',
						data: initialData,
					})

					break

				case 'save':
					const newState = { ...state }

					// update the document in the state
					const documentIndex = newState.documents.findIndex(
						(document: any) => document._id === data._id,
					)
					newState.documents[documentIndex] = data

					localStorage.setItem('state', JSON.stringify(newState))
			}
		}

		window.addEventListener('message', simulatedMessages)

		return () => {
			window.removeEventListener('message', simulatedMessages)
		}
	}
	useEffect(simulateParentFrame, []) // eslint-disable-line

	return (
		<div className='sticky top-0 z-40 flex bg-black py-4 px-4 text-sm text-white'>
			<CollectionPicker collections={collections} />

			<div className='flex flex-1 justify-end space-x-2'>
				<Tabs tabs={tabs} register={register} activeTab={state.editMode} />

				<Button
					onClick={handleClearStorage}
					className='h-10 self-center rounded-full bg-gray-800 py-0 px-3 '
				>
					Clear <span className='hidden sm:inline'>Storage</span>
				</Button>
			</div>
		</div>
	)
}
