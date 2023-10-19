import { useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { Input } from 'nrsystemtools'
import Label from '../../BaseComponents/Form/Label'

export interface IDepletableProps {
	label: string
	currentName: string
	maxName: string
	currentPlaceholder?: string
	maxPlaceholder?: string
	className?: string
}

export default function Depletable(props: IDepletableProps) {
	const {
		label,
		currentName,
		maxName,
		currentPlaceholder,
		maxPlaceholder,
		className,
	} = props
	const { register } = useFormContext()

	const pool = useWatch({
		name: currentName,
		defaultValue: 0,
	})

	const rating = useWatch({
		name: maxName,
		defaultValue: 0,
	})

	return (
		<div className={twMerge('flex flex-1 flex-col border-b', className)}>
			<Label className='-mb-2 text-center text-gray-500'>{label}</Label>

			<div className='flex'>
				<Input
					className={twMerge(
						'bg-transparent pl-0 text-right hover:bg-gray-200 focus:bg-gray-200',
						Number(pool) > Number(rating) && 'bg-red-500',
					)}
					placeholder={currentPlaceholder || '—'}
					{...register(currentName)}
				/>

				<span className='mx-1 self-center'>of</span>

				<Input
					className='bg-transparent pr-0 hover:bg-gray-200 focus:bg-gray-200'
					placeholder={maxPlaceholder}
					{...register(maxName)}
				/>
			</div>
		</div>
	)
}
