import { useContext, useMemo } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import Button from '../Button'
import context from '../context'
import VInput from '../VInput'

export interface IMoveProps {}

export default function Move(props: IMoveProps) {
	const { state } = useContext(context)
	const { editMode } = state
	const { register } = useFormContext()

	const strength = useWatch({
		name: 'characteristics.strength',
		defaultValue: 0,
	})
	const size = useWatch({ name: 'characteristics.size', defaultValue: 0 })
	const dexterity = useWatch({
		name: 'characteristics.dexterity',
		defaultValue: 0,
	})
	const ageString = useWatch({ name: 'info.age', defaultValue: 0 })

	let autocalc = useMemo(() => {
		const str = parseInt(strength, 10)
		const siz = parseInt(size, 10)
		const dex = parseInt(dexterity, 10)
		const age = parseInt(ageString, 10)
		let value = 0

		if (dex < siz && str < siz) {
			value = 7
		} else if (str >= siz || dex >= siz) {
			value = 8
		} else if (str > siz && dex > siz) {
			value = 9
		}

		// for every 10 years above 40, add 1 to the value
		value = age - 39 > 0 ? (value -= Math.floor((age - 30) / 10)) : value
		value = Math.max(value, 0)

		return value.toString()
	}, [strength, size, dexterity, ageString])

	const move = useWatch({ name: 'move' }) as string

	return (
		<div>
			<VInput label='Move' placeholder={autocalc} {...register('move')} />
		</div>
	)
}
