import { BoltIcon } from '@heroicons/react/24/solid'
import { useContext } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import Button from '../BaseComponents/Form/Button'
import HInput from '../BaseComponents/Form/HInput'
import HTextArea from '../BaseComponents/Form/HTextArea'
import context from '../BaseComponents/context'
import useMessageToApp from '../BaseComponents/hooks/UseMessageToApp'
import DecoBox from '../DecoBox'

export default function BasicInfo() {
	const { state } = useContext(context)
	const messageToApp = useMessageToApp()
	const { register } = useFormContext()

	const idium = useWatch({ name: 'idium' })

	if (!messageToApp) return null

	return (
		<DecoBox className='flex flex-1 flex-col'>
			<div className='flex flex-row'>
				<HInput
					label='Name'
					className='mx-2 flex-1'
					placeholder='&mdash;'
					autoComplete='off'
					{...register('name')}
				/>
				{state.editMode !== 'view' && (
					<Button
						className='mt-1 h-10 w-10 p-3'
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
				{...register('info.drive')}
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
		</DecoBox>
	)
}
