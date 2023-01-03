import React from 'react'
import { useFormContext } from 'react-hook-form'

type Props = {
	collections: any
}

export default function CollectionPicker({ collections }: Props) {
	const { register } = useFormContext()

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
