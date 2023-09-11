import React, { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import Label from './Label'
import TextareaAutosize from 'react-textarea-autosize'
import { borderStyle } from './borderStyle'
import context from './context'

interface ITextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label: string
}

const HTextArea = React.forwardRef<HTMLTextAreaElement, ITextareaProps>(
	({ className, label, ...rest }, ref) => {
		const { state } = useContext(context)
		const { editMode } = state

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
						`leading-16 mt-1 mb-1 block w-full bg-transparent py-2 text-xl placeholder-gray-500 shadow-sm focus:ring-0 dark:text-white dark:shadow-none dark:focus:ring-0 sm:text-sm`,
						editMode === 'edit'
							? 'hover:bg-gray-200 dark:hover:bg-gray-800'
							: '',
						borderStyle,
					)}
					disabled={editMode === 'view'}
					// @ts-ignore - the component is typed wrong; it works fine
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
