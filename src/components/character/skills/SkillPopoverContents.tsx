import * as Popover from '@radix-ui/react-popover'
import { MouseEventHandler, ReactNode, useContext } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import useMessageToApp from '../../BaseComponents/hooks/UseMessageToApp'
import context from '../../BaseComponents/context'

type Props = {
	name: string
	category: 'investigative' | 'general'
}

type CloseableButtonProps = {
	onClick: MouseEventHandler<HTMLButtonElement>
	children: ReactNode
}

export default function SkillPopoverContents({ name, category }: Props) {
	const { state } = useContext(context)
	const {
		document: {
			values: { skills },
		},
	} = state
	const messageToApp = useMessageToApp()
	const { setValue } = useFormContext()

	const rating = useWatch({
		name: `skills.${category}.${name}.rating`,
		defaultValue: skills?.[category]?.[name]?.rating ?? 0,
	})

	const pool = useWatch({
		name: `skills.${category}.${name}.pool`,
		defaultValue: skills?.[category]?.[name]?.pool ?? 0,
	})

	const handleRefresh = () => {
		setValue(`skills.${category}.${name}.pool`, rating)
		messageToApp({
			message: 'send message',
			data: {
				message: `Refresh ${name}`,
			},
		})
	}

	const handleSpend = (points: number) => {
		setValue(`skills.${category}.${name}.pool`, pool - points)
		messageToApp({
			message: 'send message',
			data: {
				message: `Spend ${points} point of ${name}`,
			},
		})
	}

	const CloseableButton: React.FC<CloseableButtonProps> = ({
		onClick,
		children,
	}) => (
		<Popover.Close className='w-full'>
			<button
				className='w-full whitespace-nowrap rounded-md bg-gray-100 py-2 px-4 text-sm text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
				onClick={onClick}
			>
				{children}
			</button>
		</Popover.Close>
	)

	return (
		<div
			className='min-w-[200px] rounded-lg bg-white p-1 shadow-lg dark:bg-gray-800 dark:text-gray-200'
			style={{ fontFamily: 'DustismoRoman' }}
		>
			<div className='flex justify-between space-x-1'>
				{pool >= 1 && (
					<CloseableButton onClick={() => handleSpend(1)}>
						Spend 1
					</CloseableButton>
				)}
				{pool >= 2 && (
					<CloseableButton onClick={() => handleSpend(2)}>
						Spend 2
					</CloseableButton>
				)}
				{pool !== rating && (
					<CloseableButton onClick={handleRefresh}>Refresh</CloseableButton>
				)}
			</div>
		</div>
	)
}
