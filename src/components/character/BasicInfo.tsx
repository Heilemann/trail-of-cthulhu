import { BoltIcon } from '@heroicons/react/24/solid'
import { useContext } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import Button from '../Button'
import DecoBox from '../DecoBox'
import HInput from '../HInput'
import HTextArea from '../HTextArea'
import useMessageToApp from '../UseMessageToApp'
import context from '../context'

export interface IBasicInfoProps {}

export default function BasicInfo(props: IBasicInfoProps) {
	const { state } = useContext(context)
	const messageToApp = useMessageToApp()
	const { register } = useFormContext()

	const idium = useWatch({ name: 'idium' })

	if (!messageToApp) return null

	return (
		<DecoBox className='flex flex-1 flex-col'>
			<div
				className={twMerge(
					'flex-1',
					// , editMode === 'view' && 'hidden'
				)}
			>
				<div className='flex flex-row'>
					<HInput
						label='Name'
						className='mx-2'
						placeholder='&mdash;'
						{...register('name')}
					/>
					{state.editMode !== 'view' && (
						<Button
							className='mt-0'
							aria-label='Generate Name'
							onClick={() =>
								messageToApp({
									message: 'generate',
									data: {
										name: 'name',
										prompt: 'Generate a unique name for a man in the 1930s',
									},
								})
							}
						>
							<BoltIcon className='h-4 w-4' aria-hidden='true' />
						</Button>
					)}
				</div>

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

				{idium === 'pulp' && (
					<HTextArea
						label='Sources of Stability'
						className='col-span-2 mx-2'
						placeholder='&mdash;'
						{...register('info.pillars')}
					/>
				)}
			</div>
		</DecoBox>
	)
}
