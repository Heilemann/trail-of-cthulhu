import React, { useContext } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import Input from '../BaseComponents/Form/Input'
import RichTextEditor from '../BaseComponents/Form/RTE/RichTextEditor'
import context from '../BaseComponents/context'
import DecoBox from '../DecoBox'

const Note: React.FC = () => {
	const { state } = useContext(context)
	const { document, editMode } = state
	const { values } = document
	const { register } = useFormContext()

	const text = useWatch({
		name: 'text',
		defaultValue: values?.text || '',
	})

	return (
		<DecoBox>
			{editMode === 'view' && (
				<h1
					className='text-xl font-bold'
					style={{
						padding: '20px 20px 0',
					}}
				>
					{values?.name}
				</h1>
			)}
			<Input
				className={twMerge('flex-0 font-bold', editMode === 'view' && 'hidden')}
				placeholder='Name...'
				{...register('name')}
			/>
			<RichTextEditor name='text' defaultValue={text} />
		</DecoBox>
	)
}

export default Note
