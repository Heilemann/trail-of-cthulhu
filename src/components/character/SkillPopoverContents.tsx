import { useFormContext, useWatch } from 'react-hook-form'
import useMessageToApp from '../UseMessageToApp'
import context from '../context'
import { useContext } from 'react'

type Props = {
	name: string
	category: 'investigative' | 'general'
}

export default function SkillPopoverContents({ name, category }: Props) {
	const { state } = useContext(context)
	const { document } = state
	const { values } = document
	const { skills } = values
	const messageToApp = useMessageToApp()
	const { setValue } = useFormContext()

	const rating = useWatch({
		name: `skills.${category}.${name}.rating`,
		defaultValue: (skills && skills[category][name]?.rating) || 0,
	})
	const pool = useWatch({
		name: `skills.${category}.${name}.pool`,
		defaultValue: (skills && skills[category][name]?.pool) || 0,
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
		if (pool <= 0) {
			alert(`No points to spend in ${name}!`)
			return
		}

		setValue(`skills.${category}.${name}.pool`, pool - points)

		messageToApp({
			message: 'send message',
			data: {
				message: `Spend ${points} point of ${name}`,
			},
		})
	}

	return (
		<div className='rounded-lg bg-white p-2'>
			{/* two buttons, one that spends one point and one that spends two */}
			<div className='flex justify-between'>
				<button
					className='rounded-l bg-gray-200 py-2 px-4 font-bold text-gray-800 hover:bg-gray-300'
					onClick={() => handleSpend(1)}
				>
					Spend 1
				</button>
				<button
					className='rounded-r bg-gray-200 py-2 px-4 font-bold text-gray-800 hover:bg-gray-300'
					onClick={() => handleSpend(2)}
				>
					Spend 2
				</button>
				<button
					className='rounded-r bg-gray-200 py-2 px-4 font-bold text-gray-800 hover:bg-gray-300'
					onClick={handleRefresh}
				>
					Refresh
				</button>
			</div>
		</div>
	)
}
