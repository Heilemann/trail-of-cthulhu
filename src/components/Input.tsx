import * as React from 'react'
import { twMerge } from 'tailwind-merge'
import context from './context'

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
	({ className, ...rest }, ref) => {
		const { state } = React.useContext(context)
		const { editMode } = state

		return (
			<input
				ref={ref}
				className={twMerge(
					'w-full rounded-lg bg-white p-2 dark:bg-gray-800',
					className,
				)}
				{...rest}
			/>
		)
	},
)

export default Input
