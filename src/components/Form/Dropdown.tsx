import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

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
				className={twMerge(
					'rounded-lg bg-gray-800 p-2 px-4 text-xl',
					className,
				)}
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
