import * as React from 'react'
import { twMerge } from 'tailwind-merge'

export interface ITDProps
	extends React.InputHTMLAttributes<HTMLTableCellElement> {}

export default function TD(props: ITDProps) {
	const { className, children, ...rest } = props

	return (
		<td
			className={twMerge('border-r border-yellow-400/60 py-1', className)}
			{...rest}
		>
			{children}
		</td>
	)
}
