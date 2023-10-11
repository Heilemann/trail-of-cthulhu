import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import DecoBox from '../DecoBox'
import Dropdown from '../BaseComponents/Form/Dropdown'
import HInput from '../BaseComponents/Form/HInput'
import HTextArea from '../BaseComponents/Form/HTextArea'
import Label from '../BaseComponents/Form/Label'
import weaponSkillList from '../data/weaponSkillList'
import { borderStyle } from '../styles/borderStyle'
import RangeInput from './RangeInput'

export default function Weapon() {
	const { register } = useFormContext()

	return (
		<DecoBox className='mx-auto w-full max-w-md'>
			<HInput label='Name' {...register('name')} />

			<div
				className={twMerge('relative py-1 text-xl', borderStyle)}
				style={{
					fontFamily: 'CovingtonCondensed',
				}}
			>
				<div className='flex cursor-pointer space-x-4 rounded-lg'>
					<Label className='w-2/5 self-center text-gray-500'>Skill</Label>
					<Dropdown className='w-3/5' {...register('skill')}>
						{weaponSkillList.map(skill => (
							<option key={skill}>{skill}</option>
						))}
					</Dropdown>
				</div>
			</div>

			<HInput
				label='Ammo'
				placeholder='&mdash;'
				{...register('ammoCapacity')}
			/>

			<HInput label='Cost' placeholder='&mdash;' {...register('cost')} />

			<div
				className='flex flex-row space-x-2 border-0 border-b border-gray-800 py-1'
				style={{
					fontFamily: 'CovingtonCondensed',
				}}
			>
				<div className='w-2/5 text-xl text-gray-500'>Range</div>
				<div className='flex w-3/5 space-x-1'>
					<RangeInput labelText='Pt. Bl.' registerName='range.pointblank' />
					<RangeInput labelText='Close' registerName='range.close' />
					<RangeInput labelText='Near' registerName='range.near' />
					<RangeInput labelText='Long' registerName='range.long' />
				</div>
			</div>

			<HTextArea
				label='Notes'
				placeholder='&mdash;'
				className='my-0 border-0'
				{...register('notes')}
			/>
		</DecoBox>
	)
}
