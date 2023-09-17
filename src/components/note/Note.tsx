import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import context from '../BaseComponents/context'
import DecoBox from '../DecoBox'
import Input from '../Form/Input'
import TextArea from '../Form/Textarea'

export default function Note() {
	const { state } = useContext(context)
	const { document, editMode } = state
	const { values } = document
	const { register } = useFormContext()

	if (!document?.values) return null

	return (
		<DecoBox className='flex flex-1 flex-col'>
			{editMode === 'view' && (
				<div>{values.note ? values.note : 'Note is empty'}</div>
			)}

			<Input
				className={twMerge('flex-0 font-bold', editMode === 'view' && 'hidden')}
				placeholder='Name...'
				{...register('name')}
			/>

			<TextArea
				className={twMerge(
					'm-0 mt-2 flex-1 resize-none',
					editMode === 'view' && 'hidden',
				)}
				placeholder='Note...'
				{...register('note')}
			/>
		</DecoBox>
	)
}
