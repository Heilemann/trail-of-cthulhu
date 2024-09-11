import React from 'react'
import { IDiceParsedResults } from '../interfaces/dicebox'

interface DiceResultsProps {
	diceData: string
}

const DiceResults: React.FC<DiceResultsProps> = ({ diceData }) => {
	// const messageToApp = useMessageToApp()

	// const handleReroll = () => {
	// 	messageToApp({ message: 'send message', data: { payload: 'reroll' } })
	// }

	const parseDiceData = (data: string): IDiceParsedResults | false => {
		try {
			const parsed = JSON.parse(data) as IDiceParsedResults
			console.log('Parsed dice data:', parsed)
			return parsed
		} catch (error) {
			console.error('Failed to parse dice data:', error)
			return false
		}
	}

	const diceResult = parseDiceData(diceData)

	if (!diceResult) {
		return <div>No valid dice data available.</div>
	}

	return (
		<div className='rounded-lg bg-gray-800 p-4 text-white shadow-lg'>
			{diceResult.rolls?.map((roll, idx) => (
				<div
					key={idx}
					className='flex aspect-square w-12 items-center justify-center border p-2'
				>
					{roll.value}
				</div>
			))}

			{!diceResult && <p>No valid dice data available.</p>}
		</div>
	)
}

export default DiceResults
