import { useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import DecoBox from '../DecoBox'
import HInput from '../Form/HInput'
import HTextArea from '../Form/HTextArea'
import VInput from '../Form/VInput'
import weaponSkillList from '../data/weaponSkillList'
import { borderStyle } from '../styles/borderStyle'

export default function Weapon() {
	const { register } = useFormContext()

	const skill = useWatch({
		name: 'skill',
		defaultValue: 'Firearms',
	})

	return (
		<DecoBox className='mx-auto w-full max-w-md'>
			<HInput label='Name' {...register('name')} />

			<div
				className={twMerge('relative py-2 text-xl', borderStyle)}
				style={{
					fontFamily: 'CovingtonCondensed',
				}}
			>
				<div className=' cursor-pointer rounded-lg hover:bg-gray-800'>
					<select
						className='m-0 w-full p-2 text-base opacity-0'
						{...register('skill')}
					>
						{weaponSkillList.map(skill => (
							<option key={skill}>{skill}</option>
						))}
					</select>
					<div className='pointer-events-none absolute top-0 left-0 flex h-full w-full'>
						<span className='flex-1 self-center text-gray-500'>Skill</span>
						<span className='flex-1 self-center pr-2 text-right '>{skill}</span>
					</div>
				</div>
			</div>

			<div className='flex flex-row space-x-2'>
				<VInput
					label='Point Blank'
					placeholder='&mdash;'
					{...register('range.pointblank', {
						// validate: validateNumberOrEmpty
					})}
				/>
				<VInput
					label='Close'
					placeholder='&mdash;'
					{...register('range.close', {
						// validate: validateNumberOrEmpty
					})}
				/>
				<VInput
					label='Near'
					placeholder='&mdash;'
					{...register('range.near', {
						// validate: validateNumberOrEmpty
					})}
				/>
				<VInput
					label='Long'
					placeholder='&mdash;'
					{...register('range.long', {
						// validate: validateNumberOrEmpty
					})}
				/>
			</div>

			<HInput
				label='Ammo Capacity'
				placeholder='&mdash;'
				{...register('ammoCapacity')}
			/>

			<HInput label='Cost' placeholder='&mdash;' {...register('cost')} />

			<HTextArea label='Notes' placeholder='&mdash;' {...register('notes')} />
		</DecoBox>
	)
}
