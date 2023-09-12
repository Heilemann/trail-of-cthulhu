import * as Popover from '@radix-ui/react-popover'
import Button from '../../Button'
import { TWeaponOnCharacter } from '../../../interfaces'
import { useWatch } from 'react-hook-form'
import useMessageToApp from '../../UseMessageToApp'

type Props = {
	index: number
	children: React.ReactNode
}

export function WeaponSkillPopover({
	index,
	children,
	...rest
}: Props & React.HTMLAttributes<HTMLDivElement>) {
	const messageToApp = useMessageToApp()

	const watchedWeapon: TWeaponOnCharacter = useWatch({
		name: `weapons.${index}`,
	})

	const handleClick = () => {
		const modifier = 0

		messageToApp({
			message: 'send message',
			data: {
				message: `/r 1d6 ${modifier !== 0 ? modifier : ''} to attack using ${
					watchedWeapon.skill
				} with my ${watchedWeapon.name}.`,
			},
		})
	}

	return (
		<div {...rest}>
			<Popover.Root>
				<Popover.Trigger asChild>{children}</Popover.Trigger>
				<Popover.Portal>
					<Popover.Content className='PopoverContent' sideOffset={5}>
						<Button
							className='w-full py-1'
							disabled={!watchedWeapon?.skill && true}
							onClick={handleClick}
						>
							Attack!
						</Button>
						<Popover.Arrow className='fill-white dark:fill-gray-800' />
					</Popover.Content>
				</Popover.Portal>
			</Popover.Root>
		</div>
	)
}
