import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

export interface ITabs {
	name: string
	options: ITab[]
}

export interface ITab {
	label: string | JSX.Element
	value: string
}

export interface ITabsProps {
	tabs: ITabs
	activeTab: string
}

export default function Tabs({ tabs, activeTab }: ITabsProps) {
	const { register } = useFormContext()

	return (
		<div className='flex h-10 rounded-full bg-gray-800 p-1'>
			{tabs.options.map(tab => (
				<div key={tab.value} className='flex self-center'>
					<input
						type='radio'
						id={tab.value}
						value={tab.value}
						className='hidden'
						{...register(tabs.name)}
					/>
					<label
						htmlFor={tab.value}
						className={twMerge(
							'cursor-pointer rounded-full px-4 py-2',
							activeTab === tab.value ? 'bg-gray-700' : '',
						)}
					>
						{tab.label}
					</label>
				</div>
			))}
		</div>
	)
}
