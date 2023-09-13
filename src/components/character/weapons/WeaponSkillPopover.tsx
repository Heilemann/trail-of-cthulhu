import * as Popover from '@radix-ui/react-popover'
import React, { useState } from 'react'
import WeaponSkillPopoverContent from './WeaponSkillPopoverContent'

type Props = {
	index: number
	skillName: string
	children: React.ReactNode
}

export function WeaponSkillPopover({
	index,
	skillName,
	children,
	...rest
}: Props & React.HTMLAttributes<HTMLDivElement>) {
	const [open, setOpen] = useState(false)

	return (
		<div {...rest}>
			<Popover.Root open={open}>
				<Popover.Trigger
					asChild
					onClick={() => setOpen(!open)}
					className='cursor-pointer'
				>
					{children}
				</Popover.Trigger>
				<WeaponSkillPopoverContent setOpen={setOpen} index={index} />
			</Popover.Root>
		</div>
	)
}
