import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid'

interface Props {
	changeValue: (delta: number) => void
	open: boolean
}

const NumberInputPopover: React.FC<Props> = ({ changeValue, open }) => {
	if (!open) return null

	return (
		<div
			className='numberinputpopover absolute -bottom-1 left-1/2 z-10 min-w-[100px] -translate-x-1/2 translate-y-full'
			style={{ fontFamily: 'DustismoRoman' }}
		>
			{/* pointer */}
			<div className='absolute -top-1 left-1/2 -z-10 h-2 w-2 -translate-x-1/2 rotate-45 dark:bg-gray-700'></div>
			{/* button container */}
			<div className='flex overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-700 dark:text-gray-200'>
				<button
					onPointerDown={() => changeValue(1)}
					className='flex w-6 flex-1 items-center justify-center  border-r border-gray-200 px-1 hover:bg-white/10 focus:outline-none dark:border-gray-800'
				>
					<PlusIcon className='h-4 w-4' />
				</button>
				<button
					onPointerDown={() => changeValue(-1)}
					className='flex h-8 w-6 flex-1 items-center justify-center px-1 text-center hover:bg-white/10 focus:outline-none'
				>
					<MinusIcon className='h-4 w-4' />
				</button>
			</div>
		</div>
	)
}

export default NumberInputPopover
