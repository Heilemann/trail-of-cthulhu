import MDEditor from '@uiw/react-md-editor'
import { useContext } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import context from '../BaseComponents/context'
import DecoBox from '../DecoBox'
import Input from '../Form/Input'

export default function Note() {
	const { state } = useContext(context)
	const { document, editMode } = state
	const { values } = document
	const { register, setValue } = useFormContext()

	const text = useWatch({
		name: 'text',
		defaultValue: '',
	})

	if (!document?.values) return null

	return (
		<DecoBox className='flex flex-1 flex-col'>
			{editMode === 'view' && (
				<div>{values.text ? values.text : 'Note is empty'}</div>
			)}

			<Input
				className={twMerge('flex-0 font-bold', editMode === 'view' && 'hidden')}
				placeholder='Name...'
				{...register('name')}
			/>
			<MDEditor
				className={twMerge(
					'm-0 mt-2 flex-1 resize-none',
					editMode === 'view' && 'hidden',
				)}
				value={text}
				onChange={value => {
					console.log('Note text:', value)
					setValue('text', value)
				}}
			/>
		</DecoBox>
	)
}
