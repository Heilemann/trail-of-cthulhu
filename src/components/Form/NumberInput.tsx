import React, { MutableRefObject, useContext, useRef } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import context from '../BaseComponents/context'
import validateNumberOrEmpty from '../tools/validateNumberOrEmpty'
import Input from './Input'
import NumberInputPopover from './NumberInputPopover'
import './NumberInput.css'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string
	alwaysShow?: boolean
	inputClassname?: string
	showButtons?: boolean
	largeButtons?: boolean
}

const NumberInput: React.FC<Props> = ({
	name,
	className,
	inputClassname,
	alwaysShow = false,
	showButtons = true,
	largeButtons = true,
	min,
	max,
	...rest
}) => {
	const { state } = useContext(context)
	const { editMode } = state
	const { register, setValue } = useFormContext()
	const inputValue: string = useWatch({ name, defaultValue: null })
	const inputRef = useRef<HTMLInputElement | null>(
		null,
	) as MutableRefObject<HTMLInputElement | null>
	const [open, setOpen] = React.useState(false)

	const { ref, ...restRegister } = register('name', {
		validate: value => validateNumberOrEmpty(value, min, max),
		valueAsNumber: true,
		onBlur: () => setOpen(false),
	})

	const setRefs = (element: HTMLInputElement | null) => {
		const { ref } = register(name)
		ref(element)
		inputRef.current = element
	}

	const changeValue = (delta: number) => {
		const newValue = `${parseFloat(inputValue || '0') + delta}`
		setValue(name, newValue)
		setTimeout(() => {
			inputRef.current?.focus()
		}, 0)
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		switch (event.key) {
			case 'Escape':
				setOpen(false)
				break
			case 'ArrowUp':
				changeValue(1)
				break
			case 'ArrowDown':
				changeValue(-1)
				break
			default:
				break
		}
	}

	return (
		<div className='numberinputcontainer relative'>
			<Input
				ref={setRefs}
				autoComplete='off'
				className={twMerge(
					!alwaysShow && editMode === 'view' ? 'hidden' : '',
					className,
				)}
				placeholder='—'
				onFocus={() => setOpen(true)}
				onKeyDown={handleKeyDown} // Add the onKeyDown event handler here
				{...restRegister}
				{...rest}
			/>
			<NumberInputPopover changeValue={changeValue} open={open} />{' '}
		</div>
	)
}

export default NumberInput
