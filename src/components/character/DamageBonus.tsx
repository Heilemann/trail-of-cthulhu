import { twMerge } from 'tailwind-merge'
import Button from '../Button'
import VInput from '../VInput'
import context from '../context'
import { useFormContext, useWatch } from 'react-hook-form'
import { useContext, useMemo } from 'react'

export interface IDamageBonusProps {}

export default function DamageBonus(props: IDamageBonusProps) {
	const { state } = useContext(context)
	const { document, editMode } = state
	const { values } = document
	const { register } = useFormContext()

	const str = useWatch({ name: 'characteristics.strength', defaultValue: 0 })
	const siz = useWatch({ name: 'characteristics.size', defaultValue: 0 })

	let bonus = useMemo(() => {
		const bonusTable = {
			'2-64': '-2',
			'65-84': '-1',
			'85-124': '0',
			'125-164': '1d4',
			'165-204': '1d6',
			'205-284': '2d6',
			'285-364': '3d6',
			'365-444': '4d6',
			'445-524': '5d6',
			'525-604': '6d6',
			'605-684': '7d6',
			'685-764': '8d6',
			'765-844': '9d6',
			'845-924': '10d6',
		} as { [key: string]: string }

		let lookedUpValue = '—'

		for (const key in bonusTable) {
			const value = parseInt(str, 10) + parseInt(siz, 10)
			const min = parseInt(key.split('-')[0], 10)
			const max = parseInt(key.split('-')[1], 10)

			if (value >= min && value <= max) {
				lookedUpValue = bonusTable[key]
			}
		}

		return lookedUpValue
	}, [str, siz])

	const damagebonus = useWatch({
		name: 'damagebonus',
	}) as string

	return (
		<div>
			<VInput
				label='Damage'
				placeholder={bonus}
				defaultValue={values.damagebonus}
				className={twMerge(editMode === 'view' && 'hidden')}
				{...register('damagebonus')}
			/>
			{editMode === 'view' && (
				<Button className='w-full' onClick={() => {}}>
					Dmg Bonus
					<br />
					{damagebonus}
				</Button>
			)}
		</div>
	)
}
