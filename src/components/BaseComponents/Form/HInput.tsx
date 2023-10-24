import { forwardRef, useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { borderStyle } from '../../styles/borderStyle'
import { Input } from 'nrsystemtools'
import Label from './Label'
import context from '../context'

interface IHInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string
	labelClassName?: string
	inputClassName?: string
}

const HInput = forwardRef<HTMLInputElement, IHInputProps>(
	(
		{ className, label, labelClassName, inputClassName, ...rest }: IHInputProps,
		ref,
	) => {
		const { state } = useContext(context)
		const { editMode } = state

		return (
			<div
				className={twMerge('flex space-x-4 text-xl', borderStyle, className)}
				style={{
					fontFamily: 'CovingtonCondensed',
				}}
			>
				<Label
					className={twMerge('w-2/5 self-center text-gray-500', labelClassName)}
					htmlFor={rest.name}
				>
					{label}
				</Label>

				<Input
					ref={ref}
					className={twMerge(
						'my-1 w-3/5 py-1.5 text-right',
						editMode === 'edit'
							? 'border border-green-500 bg-gray-800'
							: 'border border-purple-500',
						inputClassName,
					)}
					// id={rest.name}
					disabled={editMode === 'view'}
					{...rest}
				/>
			</div>
		)
	},
)

export default HInput
