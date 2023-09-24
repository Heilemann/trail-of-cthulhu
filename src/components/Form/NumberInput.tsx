import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import React, { useContext } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import context from '../BaseComponents/context'
import inputStyle from '../styles/inputStyle'
import validateNumberOrEmpty from '../tools/validateNumberOrEmpty'
import Input from './Input'

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
	name: string
	alwaysShow?: boolean
	inputClassname?: string
	showButtons?: boolean
}

const NumberInput: React.FC<Props> = ({
	name,
	className,
	inputClassname,
	alwaysShow = false,
	showButtons = true,
	min,
	max,
	...rest
}) => {
	const { state } = useContext(context)
	const { editMode } = state
	const { register, setValue } = useFormContext()
	const inputValue: string = useWatch({ name, defaultValue: '' })

	const changeValue = (delta: number) => {
		const newValue = `${parseFloat(inputValue || '0') + delta}`
		setValue(name, newValue)
	}

	return (
		<div className={twMerge(inputStyle, 'flex overflow-hidden p-0', className)}>
			<Input
				className={twMerge(
					'rounded-none bg-transparent px-0 text-center',
					!alwaysShow && editMode === 'view' ? 'hidden' : '',
					inputClassname,
				)}
				{...register(name, {
					validate: value => validateNumberOrEmpty(value, min, max),
					valueAsNumber: true,
				})}
				placeholder='—'
				{...rest}
			/>
			{showButtons && (
				<div className='flex w-8 flex-col space-y-px'>
					<button
						onClick={() => changeValue(1)}
						className='flex flex-1 items-center justify-center focus:outline-none'
					>
						<ChevronUpIcon className='h-4 w-4' />
					</button>
					<button
						onClick={() => changeValue(-1)}
						className='flex flex-1 items-center justify-center text-center focus:outline-none'
					>
						<ChevronDownIcon className='h-4 w-4' />
					</button>
				</div>
			)}
		</div>
	)
}

export default NumberInput
