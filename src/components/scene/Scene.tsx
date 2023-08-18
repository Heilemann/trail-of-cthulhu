import { useContext } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import Asset from '../Asset'
import Button from '../Button'
import DecoBox from '../DecoBox'
import Input from '../Input'
import Label from '../Label'
import SectionDivider from '../SectionDivider'
import useMessageToApp from '../UseMessageToApp'
import context from '../context'
import { twMerge } from 'tailwind-merge'

export interface ISceneProps {}

export default function Scene(props: ISceneProps) {
	const { state } = useContext(context)
	const { document } = state
	const { values } = document
	const { register } = useFormContext()
	const messageToApp = useMessageToApp()

	const showMap = useWatch({
		name: 'showMap',
		defaultValue: values.showMap,
	})

	console.log('showMap', showMap)

	const handleSetScene = () => {
		messageToApp({
			message: 'set scene',
			data: {
				sceneId: document._id,
			},
		})
	}

	const hasMapAndCover = values?.mapId && values?.coverId

	// if (!register) return null
	if (!values) return null

	return (
		<DecoBox className='mx-auto w-full max-w-2xl space-y-2 lg:space-y-4'>
			<Button onClick={handleSetScene} className='w-full'>
				Set Scene
			</Button>

			<SectionDivider className='mt-4'>Information</SectionDivider>

			<div className='grid grid-cols-6'>
				<Label className='col-span-2 self-center' htmlFor='name'>
					Name
				</Label>
				<Input
					className='col-span-4'
					placeholder='Name...'
					defaultValue={values.name}
					{...register('name')}
				/>
			</div>

			<div className='grid grid-cols-6'>
				<Label className='col-span-2 self-center' htmlFor='subtitle'>
					Subtitle
				</Label>
				<Input
					className='col-span-4'
					placeholder='Subtitle...'
					defaultValue={values.subtitle}
					{...register('subtitle')}
				/>
			</div>

			<div className='grid grid-cols-6'>
				<Label className='col-span-2 self-center' htmlFor='nameIsSecret'>
					Hide Info
				</Label>
				<div className='col-span-4'>
					<Input
						type='checkbox'
						className='w-auto'
						defaultChecked={values.nameIsSecret}
						{...register('nameIsSecret')}
					/>
				</div>
			</div>

			<SectionDivider className='mt-4'>Media</SectionDivider>

			{hasMapAndCover && (
				<div className='flex space-x-2'>
					<p className='w-32 self-center'>Show</p>
					<div className='flex w-full rounded-lg dark:bg-gray-800'>
						<label
							htmlFor='coverRadio'
							className={twMerge(
								'flex-1 rounded-lg p-2 text-center',
								values.showMap === false && 'bg-gray-700',
							)}
						>
							Cover
						</label>
						<input
							id='coverRadio'
							type='radio'
							className='hidden'
							value='false'
							defaultChecked={values.showMap === false}
							{...register('showMap')}
						/>

						<label
							htmlFor='mapRadio'
							className={twMerge(
								'flex-1 rounded-lg p-2 text-center',
								values.showMap !== false && 'bg-gray-700',
							)}
						>
							Map
						</label>
						<input
							id='mapRadio'
							type='radio'
							className='hidden'
							value='true'
							defaultChecked={values.showMap !== false}
							{...register('showMap')}
						/>
					</div>
				</div>
			)}

			<div className='flex space-x-2'>
				<div className='flex flex-1 flex-col space-y-2'>
					<Label className='mt-2 w-32' htmlFor='coverId'>
						Cover
					</Label>
					<Asset name='coverId' style={{ maxWidth: '200px' }} />
				</div>

				<div className='flex flex-1 flex-col space-y-2'>
					<Label className='mt-2 w-32' htmlFor='mapId'>
						Map
					</Label>
					<Asset name='mapId' style={{ maxWidth: '200px' }} />
				</div>
			</div>

			{/* <SectionDivider className='mt-4'>Grid</SectionDivider>

			<div className='flex space-x-2'>
				<div className='flex-1'>
					<Label className='w-32 self-center' htmlFor='grid.size'>
						Size
					</Label>
					<Input type='number' placeholder='10...' {...register('grid.size')} />
				</div>

				<div className='flex-1'>
					<Label className='w-32 self-center' htmlFor='grid.x'>
						X
					</Label>
					<Input
						type='number'
						className='pr-0'
						{...register('grid.x')}
						placeholder='0...'
					/>
				</div>

				<div className='flex-1'>
					<Label className='w-32 self-center' htmlFor='grid.y'>
						Y
					</Label>
					<Input
						type='number'
						className='pr-0'
						{...register('grid.y')}
						placeholder='0...'
					/>
				</div>

				<div className='flex-1'>
					<Label className='w-32 self-center' htmlFor='grid.color'>
						Color
					</Label>
					<div
						className='rounded-lg'
						style={{ background: values.grid ? values.grid['color'] : 'white' }}
					>
						<Input
							type='color'
							{...register('grid.color')}
							className='h-9 w-full p-0 opacity-0'
						/>
					</div>
				</div>

				<div className='flex-1'>
					<Label className='w-32 self-center' htmlFor='grid.alpha'>
						Alpha
					</Label>
					<Input
						type='number'
						className='pr-0'
						{...register('grid.alpha')}
						placeholder='1...'
					/>
				</div>
			</div> */}
		</DecoBox>
	)
}
