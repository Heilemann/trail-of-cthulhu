import React, { useContext } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import context from '../BaseComponents/context'
import Label from '../BaseComponents/Form/Label'
import { NumberInput } from 'nrsystemtools'

interface RangeInputProps {
	labelText: string
	registerName: string
}

const RangeInput: React.FC<RangeInputProps> = ({ labelText, registerName }) => {
	const { state } = useContext(context)
	const { editMode } = state
	const { register } = useFormContext()

	const range = useWatch({
		name: registerName,
		defaultValue: '',
	})

	return (
		<div className='flex-1'>
			<Label className='block whitespace-nowrap text-center text-xl text-gray-500'>
				{labelText}
			</Label>
			{editMode === 'view' && (
				<div className='py-1 text-center text-xl text-gray-500'>
					{range || '—'}
				</div>
			)}
			<NumberInput
				className={twMerge(
					'py-0.5 text-center text-xl',
					editMode === 'view' ? 'hidden' : '',
				)}
				{...register(registerName)}
			/>
		</div>
	)
}

export default RangeInput
