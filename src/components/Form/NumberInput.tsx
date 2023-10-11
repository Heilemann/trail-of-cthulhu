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
	const popoverRef = useRef<HTMLDivElement | null>(null)

	const { ref, ...restRegister } = register('name', {
		validate: value => validateNumberOrEmpty(value, min, max),
		valueAsNumber: true,
	})

	const setRefs = (element: HTMLInputElement | null) => {
		const { ref } = register(name)
		ref(element)
		inputRef.current = element
	}

	const changeValue = (delta: number) => {
		const newValue = `${parseFloat(inputValue || '0') + delta}`
		console.log('inputRef', inputRef.current, newValue)
		setValue(name, newValue)
		inputRef.current?.focus()
	}

	const handleOutsideClick = (event: MouseEvent) => {
		if (
			inputRef.current &&
			!inputRef.current.contains(event.target as Node) && // Type assert event.target as Node
			popoverRef.current &&
			!popoverRef.current.contains(event.target as Node) // Type assert event.target as Node
		) {
			setOpen(false)
		}
	}

	React.useEffect(() => {
		document.addEventListener('click', handleOutsideClick)
		return () => {
			document.removeEventListener('click', handleOutsideClick)
		}
	}, [])

	return (
		<div className='numberinputcontainer relative'>
			<Input
				ref={setRefs}
				className={twMerge(
					'py-0.5 text-center',
					inputClassname,
					!alwaysShow && editMode === 'view' ? 'hidden' : '',
					className,
					inputClassname,
				)}
				placeholder='—'
				onFocus={() => setOpen(true)}
				// {...rest(name, {
				// 	validate: value => validateNumberOrEmpty(value, min, max),
				// 	valueAsNumber: true,
				// })}
				{...restRegister}
				{...rest}
			/>
			<NumberInputPopover
				ref={popoverRef}
				changeValue={changeValue}
				open={open}
			/>{' '}
		</div>
	)
}

export default NumberInput
