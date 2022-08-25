import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import context from '../context'
import Input from '../Input'
import TextArea from '../Textarea'

export interface INoteProps {}

export default function Note(props: INoteProps) {
	const { state } = useContext(context)
	const { document, editMode } = state
	const { values } = document
	const { register } = useFormContext()

	if (!document?.values) return null

	return (
		<>
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
		</>
	)
}
