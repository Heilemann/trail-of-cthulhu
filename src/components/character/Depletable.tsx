import * as React from 'react'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import Input from '../Input'
import Label from '../Label'

export interface IDepletableProps {
	label: string
	currentName: string
	maxName: string
	currentPlaceholder?: string
	maxPlaceholder?: string
	className?: string
}

export default function Depletable(props: IDepletableProps) {
	const {
		label,
		currentName,
		maxName,
		currentPlaceholder,
		maxPlaceholder,
		className,
	} = props
	const { register } = useFormContext()

	return (
		<div className={twMerge('flex flex-col border-b flex-1', className)}>
			<Label className='text-gray-500 text-center -mb-2'>{label}</Label>

			<div className='flex'>
				<Input
					className='text-right bg-transparent hover:bg-gray-200 focus:bg-gray-200 pl-0'
					placeholder={currentPlaceholder || '—'}
					{...register(currentName)}
				/>

				<span className='self-center mx-1'>of</span>

				<Input
					className='bg-transparent hover:bg-gray-200 focus:bg-gray-200 pr-0'
					placeholder={maxPlaceholder}
					{...register(maxName)}
				/>
			</div>
		</div>
	)
}
