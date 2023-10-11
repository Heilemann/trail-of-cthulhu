import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid'
import { ForwardRefRenderFunction, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
	changeValue: (delta: number) => void
	open: boolean
}

const NumberInputPopover: ForwardRefRenderFunction<HTMLDivElement, Props> = (
	{ changeValue, open },
	ref,
) => {
	if (!open) return null

	return (
		<div
			ref={ref}
			className='numberinputpopover absolute bottom-0 left-1/2 z-10 min-w-[100px] -translate-x-1/2 translate-y-full rounded-lg bg-white p-1 shadow-lg dark:bg-gray-800 dark:text-gray-200'
			style={{ fontFamily: 'DustismoRoman' }}
		>
			<div className={twMerge('flex flex-row space-y-px')}>
				<button
					onPointerDown={() => changeValue(1)}
					className='flex w-6 flex-1 items-center justify-center px-1 hover:bg-white/10 focus:outline-none'
				>
					<PlusIcon className='h-4 w-4' />
				</button>
				<button
					onPointerDown={() => changeValue(-1)}
					className='flex h-10 w-6 flex-1 items-center justify-center px-1 text-center hover:bg-white/10 focus:outline-none'
				>
					<MinusIcon className='h-4 w-4' />
				</button>
			</div>
		</div>
	)
}

export default forwardRef(NumberInputPopover)
