import { useFormContext, useWatch } from 'react-hook-form'
import HInput from '../HInput'
import weaponSkillList from '../weaponSkillList'

export interface IWeaponProps {}

export default function Weapon(props: IWeaponProps) {
	const { register, control } = useFormContext()

	const skill = useWatch({
		control,
		name: 'skill',
		defaultValue: 'Firearms(Handgun)',
	})

	return (
		<div className='mx-auto max-w-md w-full'>
			<HInput label='Name' {...register('name')} />

			<div className='relative border-b h-9'>
				<select className='w-full m-0 p-2 opacity-0' {...register('skill')}>
					{weaponSkillList.map(skill => (
						<option key={skill}>{skill}</option>
					))}
				</select>
				<div className='absolute w-full h-full top-0 left-0 flex pointer-events-none'>
					<span className='self-center flex-1 text-gray-500'>Skill</span>
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
		</div>
	)
}
