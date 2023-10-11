import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import inputStyle from '../../styles/inputStyle'

export interface IDropdownProps
	extends React.SelectHTMLAttributes<HTMLSelectElement> {
	children: React.ReactNode
}

const Dropdown = forwardRef<HTMLSelectElement, IDropdownProps>(
	(props: IDropdownProps, ref) => {
		const { children, className, ...rest } = props

		return (
			<select
				ref={ref}
				className={twMerge(inputStyle, 'cursor-pointer text-xl', className)}
				style={{
					fontFamily: 'CovingtonCondensed',
				}}
				{...rest}
			>
				{children}
			</select>
		)
	},
)

export default Dropdown
