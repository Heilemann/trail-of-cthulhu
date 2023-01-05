import { borderStyle } from '../borderStyle'
import { useFormContext, useWatch } from 'react-hook-form'
import DecoBox from '../DecoBox'
import HInput from '../HInput'
import weaponSkillList from '../weaponSkillList'
import { twMerge } from 'tailwind-merge'

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
					<span className='self-center'>{skill}</span>
				</div>
			</div>

			<HInput label='Damage' placeholder='—' {...register('damage')} />

			<HInput label='Range' placeholder='—' {...register('range')} />

			<HInput
				label='Uses Per Round'
				placeholder='—'
				{...register('usesPerRound')}
			/>

			<HInput
				label='Ammo Capacity'
				placeholder='—'
				{...register('ammoCapacity')}
			/>

			<HInput label='Cost' placeholder='—' {...register('cost')} />

			<HInput
				label='Malfunction'
				placeholder='—'
				{...register('malfunction')}
			/>

			<HInput label='Common Era' placeholder='—' {...register('commonEra')} />
		</DecoBox>
	)
}
