import * as Popover from '@radix-ui/react-popover'
import { Input } from 'nrsystemtools'
import { useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { TWeaponOnCharacter } from '../../../interfaces'
import Button from '../../BaseComponents/Form/Button'
import useMessageToApp from '../../BaseComponents/hooks/UseMessageToApp'

type Props = {
	index: number
	setOpen: (open: boolean) => void
}

const WeaponSkillPopoverContent = ({ index, setOpen }: Props) => {
	const messageToApp = useMessageToApp()
	const [poolPointsToUse, setPoolPointsToUse] = useState(0)
	const { setValue } = useFormContext()
	const watchedWeapon: TWeaponOnCharacter = useWatch({
		name: `weapons.${index}`,
	})
	const skillName = watchedWeapon.skill

	const pool = useWatch({
		name: `skills.general.${skillName}.pool`,
	})

	const handleClick = () => {
		console.log('poolPointsToUse', poolPointsToUse)
		console.log('pool', pool)
		if (poolPointsToUse <= pool && poolPointsToUse >= 0) {
			setValue(
				`skills.general.${watchedWeapon.skill}.pool`,
				pool - poolPointsToUse,
			)

			messageToApp({
				message: 'send message',
				data: {
					payload: `/r 1d6 ${
						poolPointsToUse !== 0 ? `+ ${poolPointsToUse}` : ''
					} to attack using ${watchedWeapon.skill} with my ${
						watchedWeapon.name
					}.`,
				},
			})

			setPoolPointsToUse(0)
			setOpen(false)
		} else {
			alert('Invalid number of pool points to spend.')
		}
	}

	return (
		<Popover.Portal>
			<Popover.Content className='PopoverContent' sideOffset={5}>
				<div className='flex space-x-1 rounded-lg bg-gray-700 p-1 pl-2 text-white'>
					<label htmlFor='poolPointsToUse'>Use pool points </label>
					<Input
						type='number'
						id='poolPointsToUse'
						value={poolPointsToUse}
						onChange={e => setPoolPointsToUse(Number(e.target.value))}
						className='w-12'
						max={pool}
						min={0}
					/>
					<Button disabled={!watchedWeapon?.skill} onClick={handleClick}>
						Attack!
					</Button>
				</div>
				<Popover.Arrow className='fill-gray-800' />
			</Popover.Content>
		</Popover.Portal>
	)
}

export default WeaponSkillPopoverContent
