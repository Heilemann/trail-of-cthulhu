import { useContext, useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import context from '../context'

type Props = {
	collections: any
}

export default function CollectionPicker({ collections }: Props) {
	const { state, dispatch } = useContext(context)
	const { register } = useFormContext()

	const documentId = useWatch({
		name: 'documentId',
		defaultValue: '',
	})

	useEffect(() => {
		if (!documentId) return

		dispatch({
			type: 'LOAD',
			payload: {
				documentId,
				document: state.documents?.find(d => d._id === documentId),
			},
		})
	}, [documentId]) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<select
			className='mr-4 h-10 rounded-full bg-gray-800 px-3 text-white'
			{...register('documentId')}
		>
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
	)
}
