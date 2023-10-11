import { useContext } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import Dropdown from '../BaseComponents/Form/Dropdown'
import context from '../BaseComponents/context'

export interface ISettingsProps {}

export default function Settings(props: ISettingsProps) {
	const { state } = useContext(context)
	const { document } = state
	const { values } = document
	const { idium } = values

	const { register } = useFormContext()

	// const idium = useWatch({ name: 'idium', defaultValue: 'purist' })
	const bookhounds = useWatch({ name: 'bookhounds', defaultValue: false })

	return (
		<div className='flex space-x-4'>
			<div className='flex space-x-2'>
				<Dropdown defaultValue={idium} {...register('idium')}>
					<option value='purist'>Purist Idium</option>
					<option value='pulp'>Pulp Idium</option>
				</Dropdown>
			</div>

			<div className='flex space-x-2'>
				<input
					type='checkbox'
					defaultChecked={bookhounds}
					{...register('bookhounds')}
				/>
				<span className='self-center'>Use Bookhounds Skills</span>
			</div>
		</div>
	)
}
