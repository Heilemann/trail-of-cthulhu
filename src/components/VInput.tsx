import * as React from 'react'
import { twMerge } from 'tailwind-merge'
import Input from './Input'
import Label from './Label'

interface IVInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string
}

const VInput = React.forwardRef<HTMLInputElement, IVInputProps>(
	(props: IVInputProps, ref) => {
		const { className, label, ...rest } = props

		return (
			<div
				className={twMerge(
					'flex flex-1 flex-col border-b border-gray-200 dark:border-gray-800 mb-1',
					className,
				)}
			>
				<Label className='text-center text-gray-500 -mb-2' htmlFor={rest.name}>
					{label}
				</Label>
				<Input
					ref={ref}
					className='flex-1 bg-transparent text-center dark:bg-transparent '
					id={rest.name}
					{...rest}
				/>
			</div>
		)
	},
)

export default VInput
