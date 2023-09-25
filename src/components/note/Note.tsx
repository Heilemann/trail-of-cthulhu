import MDEditor from '@uiw/react-md-editor'
import { useContext, useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import context from '../BaseComponents/context'
import DecoBox from '../DecoBox'
import Input from '../Form/Input'

export default function Note() {
	const { state } = useContext(context)
	const { document, editMode } = state
	const { register, setValue } = useFormContext()

	const text = useWatch({
		name: 'text',
		defaultValue: '',
	})

	useEffect(() => {
		console.log('text', text)
	}, [text])

	if (!document?.values) return null

	return (
		<DecoBox className='flex flex-1 flex-col'>
			{editMode === 'view' && <MDEditor.Markdown source={text} />}

			<Input
				className={twMerge('flex-0 font-bold', editMode === 'view' && 'hidden')}
				placeholder='Name...'
				{...register('name')}
			/>

			{/* @ts-ignore */}
			<MDEditor
				className={twMerge(
					'm-0 mt-2 flex-1 resize-none',
					editMode === 'view' && 'hidden',
				)}
				// {...register('text')}
				value={text}
				onChange={value => {
					setValue('text', value)
				}}
			/>
		</DecoBox>
	)
}
