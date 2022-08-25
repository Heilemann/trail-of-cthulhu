import * as React from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import Button from '../Button'
import context from '../context'
import Input from '../Input'

export interface IWeaponDamageProps {
	index: number
}

export default function WeaponDamage(props: IWeaponDamageProps) {
	const { index } = props
	const { state } = React.useContext(context)
	const { messageToApp } = state
	const { editMode } = state
	const { register } = useFormContext()

	const name = useWatch({
		name: `weapons.${index}.name`,
	}) as string

	const skill = useWatch({
		name: `weapons.${index}.skill`,
	}) as string

	const damage = useWatch({
		name: `weapons.${index}.damage`,
	}) as string

	const damagebonus = useWatch({
		name: `damagebonus`,
	}) as string

	const brawlBonus = skill === 'brawl' ? `+ ${damagebonus}` : ''

	const handleRollDamage = () => {
		messageToApp &&
			messageToApp('send message', {
				message: `/roll ${damage} ${brawlBonus} for ${name} damage`,
			})
	}

	return (
		<td>
			<Input
				className={twMerge(
					'bg-transparent dark:bg-transparent',
					editMode === 'view' && 'hidden',
				)}
				placeholder='—'
				{...register(`weapons.${index}.damage`)}
			/>

			{editMode === 'view' && damage && (
				<Button className='py-1 px-2 m-1' onClick={handleRollDamage}>
					{`${damage} ${brawlBonus}` || '—'}
				</Button>
			)}

			{editMode === 'view' && !damage && (
				<span className='self-center text-center text-gray-500'>—</span>
			)}
		</td>
	)
}
