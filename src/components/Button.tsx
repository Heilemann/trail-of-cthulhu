import * as React from 'react'
import { twMerge } from 'tailwind-merge'

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button(props: IButtonProps) {
	const { children, className, ...rest } = props

	return (
		<button
			className={twMerge(
				'ml-0 rounded-lg bg-gray-200 px-4 py-2 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:disabled:text-gray-500',
				className,
			)}
			{...rest}
		>
			{children}
		</button>
	)
}
