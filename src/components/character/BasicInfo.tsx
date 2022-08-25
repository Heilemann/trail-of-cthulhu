import { useContext } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import Asset from '../Asset'
import context from '../context'
import HInput from '../HInput'

export interface IBasicInfoProps {}

export default function BasicInfo(props: IBasicInfoProps) {
	const { state } = useContext(context)
	const { editMode, messageToApp } = state
	const { register, setValue } = useFormContext()

	const name = useWatch({ name: 'name' })
	const info = useWatch({ name: 'info', defaultValue: {} })

	if (!messageToApp) return null

	return (
		<div className='flex flex-row my-2'>
			{/* {editMode === 'view' && (
				<div className='text-center text-lg'>
					<strong>{name || 'Unnamed Character'}</strong>
					{info.occupation && ` — ${info.occupation}`}
					{info.residence && `• Resides in ${info.residence}`}
					{info.birthplace && `• Born in ${info.birthplace}`}
					{info.age && `• ${info.age}yo`}
				</div>
			)} */}

			<div className='flex flex-col w-40 md:w-40 min-h-30 flex-0 md:min-h-40 bg-gray-200 dark:bg-gray-800 rounded-lg mr-4 mt-2'>
				{/* <div className='max-w-60 flex max-h-60 flex-col space-y-2'>
					<Asset
						name='portrait'
						addLabel='Add Portrait'
						style={{ maxWidth: '200px' }}
					/>
				</div> */}

				<div className='max-w-60 flex flex-col space-y-2'>
					{/* <Label className='mt-2 w-32' htmlFor='coverId'>
						Token
					</Label> */}
					<Asset
						name='token'
						addLabel='Add Token'
						removeLabel='Remove Token'
						style={{ maxWidth: '200px' }}
					/>
				</div>
			</div>

			<div
				className={twMerge(
					'flex-1',
					// , editMode === 'view' && 'hidden'
				)}
			>
				<div className='-ml-2 grid grid-cols-1 xl:grid-cols-2'>
					<HInput
						className='mx-2'
						label='Name'
						placeholder='&mdash;'
						{...register('name')}
					/>

					<HInput
						className='mx-2'
						label='Occupation'
						placeholder='&mdash;'
						{...register('info.occupation')}
					/>

					<HInput
						className='mx-2'
						label='Residence'
						placeholder='&mdash;'
						{...register('info.residence')}
					/>

					<HInput
						className='mx-2'
						label='Birthplace'
						placeholder='&mdash;'
						{...register('info.birthplace')}
					/>

					<HInput
						className='mx-2'
						label='Pronouns'
						placeholder='&mdash;'
						{...register('info.pronouns')}
					/>

					<HInput
						className='mx-2'
						label='Age'
						placeholder='&mdash;'
						{...register('info.age')}
					/>
				</div>
			</div>
		</div>
	)
}
