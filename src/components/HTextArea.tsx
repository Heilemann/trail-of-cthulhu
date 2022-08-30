import React from 'react'
import { twMerge } from 'tailwind-merge'
import Label from './Label'
import TextareaAutosize from 'react-textarea-autosize'
import { borderStyle } from './borderStyle'

interface ITextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label: string
}

const HTextArea = React.forwardRef<HTMLTextAreaElement, ITextareaProps>(
	(props, ref) => {
		const { className, label, ...rest } = props

		return (
			<div
				className={twMerge('flex flex-1 flex-col text-xl', className)}
				style={{
					fontFamily: 'CovingtonCondensed',
				}}
			>
				<Label
					className='mt-2 whitespace-nowrap text-gray-500 '
					htmlFor={rest.name}
				>
					{label}
				</Label>

				{/* @ts-ignore */}
				<TextareaAutosize
					ref={ref}
					className={twMerge(
						`leading-16 mt-1 mb-1 block w-full   bg-transparent py-2 text-xl placeholder-gray-500 shadow-sm hover:bg-gray-200 focus:ring-0 dark:text-white dark:shadow-none dark:hover:bg-gray-800 dark:focus:ring-0 sm:text-sm`,
						borderStyle,
					)}
					// @ts-ignore
					style={{
						fontSize: '1.25rem',
						lineHeight: '1.75rem',
					}}
					{...rest}
				/>
			</div>
		)
	},
)

export default HTextArea
