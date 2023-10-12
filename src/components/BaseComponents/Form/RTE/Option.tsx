import { CheckIcon } from '@radix-ui/react-icons'
import React from 'react'
import { BlockType, blockTypeToBlockName } from './ToolbarPlugin'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	isActive?: boolean
	blockType: BlockType
	optionType: BlockType
}

const Option = ({ blockType, optionType, ...rest }: Props) => {
	const isActive = blockType === optionType

	return (
		<button
			className='flex rounded-lg py-1.5 pl-4 pr-4 text-left dark:hover:bg-gray-800'
			{...rest}
		>
			<span className='w-32'>{blockTypeToBlockName[blockType]}</span>
			{isActive && <CheckIcon className='h-4 w-4 self-center' />}
		</button>
	)
}

export default Option
