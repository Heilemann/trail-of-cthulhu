import { CheckIcon } from '@radix-ui/react-icons'
import React from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	isActive?: boolean
}

const Option = ({ children, isActive, ...rest }: Props) => {
	return (
		<button
			className='flex rounded-lg py-1.5 pl-4 pr-4 text-left dark:hover:bg-gray-800'
			{...rest}
		>
			<span className='w-32'>{children}</span>
			{isActive && <CheckIcon className='h-4 w-4 self-center' />}
		</button>
	)
}

export default Option
