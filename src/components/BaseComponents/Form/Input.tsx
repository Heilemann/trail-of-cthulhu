import * as React from 'react'
import { twMerge } from 'tailwind-merge'
import inputStyle from '../../styles/inputStyle'

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
	({ className, ...rest }, ref) => {
		return (
			<input ref={ref} className={twMerge(inputStyle, className)} {...rest} />
		)
	},
)

export default Input
