import { useMemo } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import VInput from '../VInput'

export interface IBuildProps {}

export default function Build(props: IBuildProps) {
	const { register } = useFormContext()

	const str = useWatch({ name: 'characteristics.strength', defaultValue: 0 })
	const siz = useWatch({ name: 'characteristics.size', defaultValue: 0 })
	// const build = useWatch({ name: 'build', defaultValue: 0 })

	let autocalcValue = useMemo(() => {
		const bonusTable = {
			'2-64': '-2',
			'65-84': '-1',
			'85-124': '0',
			'125-164': '1',
			'165-204': '2',
			'205-284': '3',
			'285-364': '4',
			'365-444': '5',
			'445-524': '6',
			'525-604': '7',
			'605-684': '8',
			'685-764': '9',
			'765-844': '10',
			'845-924': '11',
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

	return (
		<div>
			<VInput
				label='Build'
				placeholder={autocalcValue}
				{...register('build')}
			/>
		</div>
	)
}
