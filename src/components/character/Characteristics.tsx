import { useFormContext } from 'react-hook-form'
import Characteristic from './Characteristic'

export interface ICharacteristicsProps {}

export default function Characteristics(props: ICharacteristicsProps) {
	const { register } = useFormContext()

	return (
		<div className='grid grid-cols-5 sm:grid-cols-5 flex-1 gap-4 mt-2'>
			<Characteristic label='STR' {...register('characteristics.strength')} />
			<Characteristic label='DEX' {...register('characteristics.dexterity')} />
			<Characteristic
				label='INT'
				{...register('characteristics.intelligence')}
			/>
			<Characteristic
				label='CON'
				{...register('characteristics.constitution')}
			/>
			<Characteristic label='APP' {...register('characteristics.appearance')} />
			<Characteristic label='POW' {...register('characteristics.power')} />
			<Characteristic label='SIZ' {...register('characteristics.size')} />
			<Characteristic label='EDU' {...register('characteristics.education')} />
			<Characteristic label='Luck' {...register('luck')} />
		</div>
	)
}
