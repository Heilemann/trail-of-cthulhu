import { twMerge } from 'tailwind-merge'

export interface IDropdownProps
	extends React.SelectHTMLAttributes<HTMLSelectElement> {
	children: React.ReactNode
}

export default function Dropdown(props: IDropdownProps) {
	const { children, className, ...rest } = props

	return (
		<select className={twMerge('bg-gray-800 p-2', className)} {...rest}>
			{children}
		</select>
	)
}
