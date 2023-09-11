import { borderStyle } from '../borderStyle'
import { useFormContext, useWatch } from 'react-hook-form'
import DecoBox from '../DecoBox'
import HInput from '../HInput'
import weaponSkillList from '../weaponSkillList'
import { twMerge } from 'tailwind-merge'
import HTextArea from '../HTextArea'
import VInput from '../VInput'

export interface IWeaponProps {}

export default function Weapon(props: IWeaponProps) {
	const { register, control } = useFormContext()

	const skill = useWatch({
		control,
		name: 'skill',
		defaultValue: 'Firearms(Handgun)',
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
					{...register('range.pointblank')}
				/>
				<VInput
					label='Close'
					placeholder='&mdash;'
					{...register('range.close')}
				/>
				<VInput
					label='Near'
					placeholder='&mdash;'
					{...register('range.near')}
				/>
				<VInput
					label='Long'
					placeholder='&mdash;'
					{...register('range.long')}
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
