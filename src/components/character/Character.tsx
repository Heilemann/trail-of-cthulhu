import DecoBox from '../DecoBox'
import HInput from '../HInput'
import BasicInfo from './BasicInfo'
import Skills from './Skills'
import Token from './Token'
import Weapons from './Weapons'

export interface ICharacterProps {}

export default function Character(props: ICharacterProps) {
	return (
		<div className='space-y-4'>
			<div className='md:flex md:space-x-4'>
				<BasicInfo />

				<div className='flex flex-col space-y-4'>
					<Token />
					<DecoBox>
						<HInput label='Hit Threshold' placeholder='&mdash;' />
						<HInput label='Build Points' placeholder='&mdash;' />
					</DecoBox>
				</div>
			</div>

			<Skills />

			<Weapons />

			{/* <Backstory /> */}
			{/* <TestWeapon />
			<TestWeapon />
			<TestWeapon /> */}
		</div>
	)
}
