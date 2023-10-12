import { twMerge } from 'tailwind-merge'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	isActive?: boolean
}

const ToolbarButton = ({ className, children, isActive, ...rest }: Props) => {
	return (
		<button
			className={twMerge(
				'rounded-md p-2 focus:outline-none dark:text-white dark:hover:bg-gray-900',
				isActive ? 'bg-gray-200 dark:bg-gray-800' : '',
				className,
			)}
			{...rest}
		>
			{children}
		</button>
	)
}

export default ToolbarButton
