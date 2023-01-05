import * as Popover from '@radix-ui/react-popover'
import SkillPopoverContents from './character/SkillPopoverContents'

type Props = {
	name: string
	category: 'investigative' | 'general'
	children: React.ReactNode
	[key: string]: any
}

export function SkillPopover({
	name,
	category,
	children,
	...rest
}: Props & React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div {...rest}>
			<Popover.Root>
				<Popover.Trigger asChild>{children}</Popover.Trigger>
				<Popover.Portal>
					<Popover.Content className='PopoverContent' sideOffset={5}>
						<SkillPopoverContents name={name} category={category} />
						<Popover.Close className='PopoverClose' aria-label='Close'>
							X
						</Popover.Close>
						<Popover.Arrow className='fill-white dark:fill-white' />
					</Popover.Content>
				</Popover.Portal>
			</Popover.Root>
		</div>
	)
}
