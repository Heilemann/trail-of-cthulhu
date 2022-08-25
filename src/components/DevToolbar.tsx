import { useContext, useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { TState } from '../interfaces'
import systemConfig from '../system.json'
import Button from './Button'
import context from './context'
import Tabs from './Tabs'

export interface IDevToolbarProps {}

let initialData = {
	documentId: '123',
	editMode: 'edit',
	documents: [
		{
			_id: '123',
			creator: 'abc',
			access: [],
			type: 'character',
			values: {},
		},
	],
	assets: [],
}

export default function DevToolbar(props: IDevToolbarProps) {
	const { state, dispatch } = useContext(context)
	const [collections, setCollections] = useState<any[]>([])
	const { register, watch, control } = useForm()

	const documentId = useWatch({
		control,
		name: 'documentId',
		defaultValue: localStorage.getItem('documentId') || 'character',
	})

	useEffect(() => {
		localStorage.setItem('documentId', documentId)
	}, [documentId])

	useEffect(() => {
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

		return () => {
			subscription.unsubscribe()
		}
	}, [dispatch, state, watch])

	const fakeDocumentsFromSystemConfig = () => {
		setCollections(systemConfig.collections)

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
				access: [],
				values: {
					name: 'No name',
				},
			}
			fakeData.documents?.push(document)
		})

		fakeData['document'] = fakeData.documents![0]

		const savedData = JSON.parse(localStorage.getItem('state') || '{}')

		fakeData['documentId'] = documentId

		fakeData.document = {
			...fakeData.document,
			...savedData,
		}

		// console.log('fakeData', fakeData)

		setTimeout(() => {
			window.postMessage({
				message: 'load',
				source: 'App',
				data: fakeData,
			})
		}, 200)
	}
	useEffect(fakeDocumentsFromSystemConfig, [documentId])

	const tabs = {
		name: 'editMode',
		options: [
			{
				label: 'Edit',
				value: 'edit',
			},
			{
				label: 'View',
				value: 'view',
			},
		],
	}

	const handleClearStorage = () => {
		localStorage.clear()
		window.location.reload()
	}

	const simulateParentFrameOnDev = () => {
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
					const newState = {
						...state,
						documents: [payload.data],
					}

					localStorage.setItem('state', JSON.stringify(newState))
			}
		}

		window.addEventListener('message', simulatedMessages)

		return () => {
			window.removeEventListener('message', simulatedMessages)
		}
	}
	useEffect(simulateParentFrameOnDev, []) // eslint-disable-line

	return (
		<div className='sticky top-0 flex bg-black py-4 px-4 text-sm text-white z-40'>
			<select className='mr-4 text-black' {...register('documentId')}>
				{collections.map((collection: any) => (
					<option
						key={collection.type}
						value={collection.type}
						onClick={() => {}}
					>
						{collection.singularName}
					</option>
				))}
			</select>

			<div className='flex flex-1 justify-end space-x-2'>
				<Tabs tabs={tabs} register={register} activeTab={state.editMode} />

				<Button
					onClick={handleClearStorage}
					className='rounded-full bg-gray-800 dark:bg-gray-800'
				>
					Clear <span className='hidden sm:inline'>Storage</span>
				</Button>
			</div>
		</div>
	)
}
