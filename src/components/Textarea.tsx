import React from 'react'
import { twMerge } from 'tailwind-merge'

interface ITextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = React.forwardRef<HTMLTextAreaElement, ITextareaProps>(
	(props, ref) => {
		const { className, ...rest } = props

		return (
			<textarea
				ref={ref}
				className={twMerge(
					`leading-16 mt-1 mb-1 block w-full rounded-md border-none bg-white p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-800 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:shadow-none sm:text-sm`,
					className,
				)}
				{...rest}
			/>
		)
	},
)

export default TextArea
