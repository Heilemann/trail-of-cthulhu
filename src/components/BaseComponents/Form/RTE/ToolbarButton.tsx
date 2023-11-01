import { twMerge } from 'tailwind-merge'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	isActive?: boolean
}

const ToolbarButton = ({ className, children, isActive, ...rest }: Props) => {
	return (
		<button
			className={twMerge(
				'my-1 whitespace-nowrap rounded-md p-2 py-1 text-white hover:bg-gray-900 focus:outline-none disabled:text-gray-500',
				isActive ? 'bg-gray-700' : '',
				className,
			)}
			{...rest}
		>
			{children}
		</button>
	)
}

export default ToolbarButton
