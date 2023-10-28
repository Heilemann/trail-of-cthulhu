import React from 'react'
import { twMerge } from 'tailwind-merge'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = React.forwardRef<HTMLInputElement, Props>(
	({ className, ...rest }, ref) => {
		return (
			<input
				type='checkbox'
				ref={ref}
				className={twMerge(
					'aspect-square w-3 cursor-pointer appearance-none rounded-sm border-gray-200 bg-white outline-2 outline-red-400 checked:bg-white hover:bg-gray-600 checked:hover:bg-white disabled:cursor-default disabled:hover:bg-gray-700 dark:bg-gray-700',
					className,
				)}
				{...rest}
			/>
		)
	},
)

export default Checkbox
