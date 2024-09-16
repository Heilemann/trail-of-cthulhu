import * as Popover from '@radix-ui/react-popover'
import { useState } from 'react'
import Button from '../../BaseComponents/Form/Button'
import Refresh24Hour from './Refresh24Hour'
import RefreshSkills from './RefreshSkills'

export default function RefreshPopover() {
	const [open, setOpen] = useState(false)

	return (
		<Popover.Root open={open} onOpenChange={setOpen}>
			<Popover.Anchor>
				<Popover.Trigger asChild>
					<Button>Refresh...</Button>
				</Popover.Trigger>
			</Popover.Anchor>
			<Popover.Portal>
				<Popover.Content
					className='z-50 rounded-lg bg-gray-700 p-4 shadow-lg'
					sideOffset={5}
					align='start'
					alignOffset={-5}
				>
					<div className='space-y-2'>
						<RefreshSkills />
						<Refresh24Hour />
					</div>
					<Popover.Arrow className='fill-gray-700' />
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	)
}
