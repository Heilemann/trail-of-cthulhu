import { useContext, useMemo } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import Button from '../Button'
import context from '../context'
import VInput from '../VInput'

export interface IDodgeProps {}

export default function Dodge(props: IDodgeProps) {
	const { state } = useContext(context)
	const { editMode } = state
	const { register } = useFormContext()

	const dodge = useWatch({
		name: 'dodge',
	}) as string

	const dexterity = useWatch({
		name: 'characteristics.dexterity',
	}) as string

	const defaultValue = dexterity && (parseInt(dexterity) / 2).toString()

	// console.log(defaultValue)

	return (
		<div>
			<VInput
				className={editMode === 'view' ? 'hidden' : ''}
				label='Dodge'
				placeholder={'—'}
				{...register('dodge')}
			/>

			{editMode === 'view' && (
				<Button
					className='w-full'
					onClick={() => {}}
					disabled={!dodge && !defaultValue}
				>
					Dodge
					<br />
					{dodge || defaultValue}%
				</Button>
			)}
		</div>
	)
}
