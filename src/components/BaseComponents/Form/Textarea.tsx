import { forwardRef } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { twMerge } from 'tailwind-merge'

interface ITextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = forwardRef<HTMLTextAreaElement, ITextareaProps>(
	({ className, style, ...rest }, ref) => {
		return (
			<ReactTextareaAutosize
				ref={ref}
				className={twMerge(
					`leading-16 mt-1 mb-1 block w-full rounded-md border-none bg-white p-2 shadow-sm placeholder:text-gray-500 dark:bg-gray-800/50 dark:text-white dark:placeholder-gray-400 dark:shadow-none`,
					className,
				)}
				{...rest}
			/>
		)
	},
)

export default TextArea
