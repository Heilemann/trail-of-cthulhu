import { ChatBubbleLeftIcon } from '@heroicons/react/24/solid'
import { SkillPopover } from '../SkillPopover'

type Props = {
	name: string
	category: 'investigative' | 'general'
}

export default function SkillSpendButton({ name, category }: Props) {
	return (
		<SkillPopover name={name} category={category}>
			<div className='ml-1 flex aspect-square h-7 justify-center rounded-md bg-gray-200 text-gray-700 dark:bg-gray-800 darl:text-gray-200'>
				<ChatBubbleLeftIcon
					className='h-3.5 w-3.5 self-center'
					aria-hidden='true'
				/>
			</div>
		</SkillPopover>
	)
}
