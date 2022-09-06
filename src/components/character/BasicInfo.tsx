import { useContext } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import context from '../context'
import DecoBox from '../DecoBox'
import HInput from '../HInput'
import HTextArea from '../HTextArea'

export interface IBasicInfoProps {}

export default function BasicInfo(props: IBasicInfoProps) {
	const { state } = useContext(context)
	const { editMode, messageToApp } = state
	const { register, setValue } = useFormContext()

	const name = useWatch({ name: 'name' })
	const info = useWatch({ name: 'info', defaultValue: {} })

	if (!messageToApp) return null

	return (
		<DecoBox className='flex flex-1 flex-col'>
			<div
				className={twMerge(
					'flex-1',
					// , editMode === 'view' && 'hidden'
				)}
			>
				<HInput
					label='Name'
					className='mx-2'
					placeholder='&mdash;'
					{...register('name')}
				/>

				<HInput
					label='Drive'
					className='mx-2'
					placeholder='&mdash;'
					{...register('drive')}
				/>

				<HInput
					label='Occupation'
					className='mx-2'
					placeholder='&mdash;'
					{...register('info.occupation')}
				/>

				<HTextArea
					label='Occupational Benefits'
					className='col-span-2 mx-2'
					placeholder='&mdash;'
					{...register('info.benefits')}
				/>

				<HTextArea
					label='Pillars of Sanity'
					className='col-span-2 mx-2'
					placeholder='&mdash;'
					{...register('info.pillars')}
				/>
			</div>
		</DecoBox>
	)
}
