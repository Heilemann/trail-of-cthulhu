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
					`leading-16 mb-1 mt-1 block w-full rounded-md border-none bg-gray-800/50 p-2 text-white placeholder-gray-400 shadow-none placeholder:text-gray-500`,
					className,
				)}
				{...rest}
			/>
		)
	},
)

export default TextArea
