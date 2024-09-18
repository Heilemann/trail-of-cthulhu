import React, { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import { DiceResult, Modifier, RollResultArray } from '../interfaces/dicebox'
import DecoBox from './DecoBox'

interface DiceResultsProps {
	diceData: string
}

const DiceResults: React.FC<DiceResultsProps> = ({ diceData }) => {
	const diceResult = useMemo(() => {
		try {
			return JSON.parse(diceData) as DiceResult
		} catch (error) {
			console.error('Failed to parse dice data:', error)
			return false
		}
	}, [diceData])

	if (!diceResult) {
		return <div>No valid dice data available.</div>
	}

	// Function to render a single die or modifier
	const typeDie = (die: RollResultArray | Modifier, idx: number) => {
		if (die.type === 'die') {
			return (
				<div className='flex gap-1'>
					{die.rolls?.map((roll, i) => (
						<div
							key={`${idx}-${i}`}
							className={twMerge(
								'flex h-8 w-8 flex-col items-center justify-center rounded-md border-2 border-white/10 p-2',
							)}
						>
							<div>{roll.value}</div>
						</div>
					))}
				</div>
			)
		} else if (die.type === 'number') {
			// Render modifiers
			return (
				<div
					key={idx}
					className='flex h-8 w-8 items-center justify-center rounded-md border-2 border-white/10 p-2'
				>
					{die.value}
				</div>
			)
		}
		return null
	}

	// Function to render dice and operators
	const renderDice = () => {
		if (diceResult.type === 'expressionroll') {
			return diceResult.dice.map((die, idx) => (
				<React.Fragment key={idx}>
					{/* Render operator before each die except the first */}
					{idx > 0 && (
						<div className='flex items-center justify-center p-2 text-xl font-bold'>
							{diceResult.ops[idx - 1]}
						</div>
					)}
					{typeDie(die, idx)}
				</React.Fragment>
			))
		} else if (diceResult.type === 'die') {
			return typeDie(diceResult as RollResultArray, 0)
		}
		return null
	}

	return (
		<DecoBox
			className='text-2xl text-white'
			style={{
				fontFamily: 'CovingtonCondensed',
			}}
		>
			<div className='flex flex-col items-center gap-1'>
				<div
					className='text-4xl font-bold'
					style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
				>
					{diceResult.value}
				</div>

				<div
					className='mb-4 flex flex-wrap items-center gap-1'
					style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
				>
					{renderDice()}
				</div>
			</div>

			{!diceResult && <p>No valid dice data available.</p>}
		</DecoBox>
	)
}

export default DiceResults
