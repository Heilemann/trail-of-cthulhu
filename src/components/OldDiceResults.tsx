// Keeping this around for later use
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { DiceResult, Modifier, RollResultArray } from '../interfaces/dicebox'

interface DiceResultsProps {
	diceData: string
}

const DiceResults: React.FC<DiceResultsProps> = ({ diceData }) => {
	// const messageToApp = useMessageToApp()

	// const handleReroll = () => {
	// 	messageToApp({ message: 'send message', data: { payload: 'reroll' } })
	// }

	const parseDiceData = (data: string): DiceResult | false => {
		try {
			const parsed = JSON.parse(data) as DiceResult
			// console.log('Parsed dice data:', parsed)
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

	const typeDie = (die: RollResultArray | Modifier, idx: number) => {
		if (die.type === 'die') {
			return die.rolls?.map((roll, i) => (
				<div
					key={idx + '-' + i}
					className={twMerge(
						'flex aspect-square w-12 flex-col items-center justify-center border-2 p-2',
						roll.success && 'border-green-500',
						roll.critical === 'failure' && 'bg-red-500',
						roll.critical === 'success' && 'bg-white text-black',
						roll.drop && 'opacity-30',
					)}
				>
					<div>{roll.value}</div>
					<div className='text-xs opacity-50'>{`d${roll.die}`}</div>
				</div>
			))
		} else if (die.type === 'number') {
			return (
				<div
					key={idx}
					className='flex aspect-square w-12 items-center justify-center p-2'
				>
					{diceResult.type === 'expressionroll' && diceResult.ops[idx - 1]}
					{die.value}
				</div>
			)
		}
		return null
	}

	return (
		<div className='rounded-lg p-4 text-white shadow-lg'>
			<div className='flex flex-wrap gap-2'>
				{diceResult.type === 'expressionroll' && (
					<div className='flex'>
						{diceResult.dice.map((die, idx) => typeDie(die, idx))}
					</div>
				)}

				{diceResult.type === 'die' && (
					<div className='flex'>
						{typeDie(diceResult as RollResultArray, 0)}
					</div>
				)}
				<div className='flex aspect-square w-12 items-center justify-center p-2'>
					=
				</div>
				<div className='flex aspect-square w-12 items-center justify-center border p-2'>
					{diceResult.value}
				</div>
			</div>

			{!diceResult && <p>No valid dice data available.</p>}
		</div>
	)
}

export default DiceResults
