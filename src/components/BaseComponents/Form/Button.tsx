import * as React from 'react'
import { twMerge } from 'tailwind-merge'

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ children, className, ...rest }: IButtonProps) {
	return (
		<button
			className={twMerge(
				'ml-0 rounded-lg px-4 py-2 text-xl',
				rest.disabled
					? 'cursor-default bg-transparent text-gray-500'
					: 'bg-gray-800 hover:bg-gray-700',
				className,
			)}
			style={{
				fontFamily: 'CovingtonCondensed',
			}}
			{...rest}
		>
			{children}
		</button>
	)
}
