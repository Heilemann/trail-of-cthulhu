import { twMerge } from 'tailwind-merge'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	isActive?: boolean
}

const ToolbarButton = ({ className, children, isActive, ...rest }: Props) => {
	return (
		<button
			className={twMerge(
				'my-1 rounded-md p-2 py-1 focus:outline-none dark:text-white dark:hover:bg-gray-900 dark:disabled:text-gray-500',
				isActive ? 'bg-gray-200 dark:bg-gray-700' : '',
				className,
			)}
			{...rest}
		>
			{children}
		</button>
	)
}

export default ToolbarButton
