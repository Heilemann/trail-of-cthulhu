import { FieldValues, UseFormRegister } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

export interface ITabs {
	name: string
	options: ITab[]
}

export interface ITab {
	label: string
	value: string
}

export interface ITabsProps {
	tabs: ITabs
	register: UseFormRegister<FieldValues>
	activeTab: string
}

export default function Tabs(props: ITabsProps) {
	const { tabs, register, activeTab } = props

	return (
		<div className='flex rounded-full bg-gray-800'>
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
