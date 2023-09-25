import MDEditor from '@uiw/react-md-editor'
import { useContext } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import context from '../BaseComponents/context'
import DecoBox from '../DecoBox'
import Input from '../Form/Input'

// css from App.css affects this component

export default function Note() {
	const { state } = useContext(context)
	const { document, editMode } = state
	const { values } = document
	const { register, setValue } = useFormContext()

	const text = useWatch({
		name: 'text',
		defaultValue: values?.text || '',
	})

	return (
		<DecoBox className='flex flex-1 flex-col'>
			{editMode === 'view' && <MDEditor.Markdown source={text} />}

			<Input
				className={twMerge('flex-0 font-bold', editMode === 'view' && 'hidden')}
				placeholder='Name...'
				{...register('name')}
			/>

			<div className={twMerge(editMode === 'view' && 'hidden')}>
				<MDEditor
					className='m-0 mt-2 flex-1 resize-none'
					value={text}
					onChange={value => {
						setValue('text', value)
					}}
					visibleDragbar={false}
					preview='edit'
				/>
			</div>
		</DecoBox>
	)
}
