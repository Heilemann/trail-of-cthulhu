import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { borderStyle } from './borderStyle'
import Input from './Input'
import Label from './Label'

interface IHInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string
}

const HInput = forwardRef<HTMLInputElement, IHInputProps>(
	(props: IHInputProps, ref) => {
		const { className, label, ...rest } = props

		return (
			<div
				className={twMerge(
					'flex flex-1 space-x-4 text-xl ',
					borderStyle,
					className,
				)}
				style={{
					fontFamily: 'CovingtonCondensed',
				}}
			>
				<Label
					className='w-2/5 self-center whitespace-nowrap text-gray-500'
					htmlFor={rest.name}
				>
					{label}
				</Label>

				<Input
					ref={ref}
					className=' my-1 bg-transparent py-1.5 text-right autofill:bg-yellow-400/20 hover:bg-gray-200 dark:bg-transparent dark:autofill:bg-yellow-400/20 dark:hover:bg-gray-800'
					id={rest.name}
					{...rest}
				/>
			</div>
		)
	},
)

export default HInput
