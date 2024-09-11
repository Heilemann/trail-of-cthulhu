import { useContext, useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { TCollection, TSystemConfig } from '../../../interfaces/interfaces'
import systemConfig from '../../../system.json'
import context from '../context'

export default function CollectionPicker() {
	const { state, dispatch } = useContext(context)
	const { register } = useFormContext()
	const { collections } = systemConfig as TSystemConfig
	const defaultCollectionType = collections[0].type

	const selectedCollectionType = useWatch({
		name: 'documentId',
		defaultValue: defaultCollectionType,
	})

	useEffect(() => {
		if (!selectedCollectionType || !state.documents) return
		if (selectedCollectionType === state.documentId) return

		dispatch({
			type: 'LOAD',
			payload: {
				...state,
				document: state.documents.byId[selectedCollectionType],
				documentId: selectedCollectionType,
			},
		})
		// reset(state.documents.byId[selectedCollectionType])
	}, [dispatch, state, selectedCollectionType])

	return (
		<select
			className='mr-4 h-10 rounded-full bg-gray-800 px-3 text-white'
			defaultValue={defaultCollectionType}
			{...register('documentId')}
		>
			pruda
			{collections.map((collection: TCollection) => (
				<option key={collection.type} value={collection.type}>
					{collection.singularName}
				</option>
			))}
		</select>
	)
}
