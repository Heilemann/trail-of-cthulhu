import React, { useContext } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import RichTextEditor from '../BaseComponents/Form/RTE/RichTextEditor'
import context from '../BaseComponents/context'
import DecoBox from '../DecoBox'
import Input from '../BaseComponents/Form/Input'
import { twMerge } from 'tailwind-merge'

const Note: React.FC = () => {
	const { state } = useContext(context)
	const { document, editMode } = state
	const { values } = document
	const { register } = useFormContext()
	const name = 'text'

	const text = useWatch({
		name: name,
		defaultValue: values?.text || '',
	})

	console.log('======>', text)

	return (
		<DecoBox>
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
