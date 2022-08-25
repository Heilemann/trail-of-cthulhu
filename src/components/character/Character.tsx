import SectionDivider from '../SectionDivider'
import Backstory from './BackStory'
import BasicInfo from './BasicInfo'
import Characteristics from './Characteristics'
import Combat from './Combat'
import Skills from './Skills'
import Weapons from './Weapons'

export interface ICharacterProps {}

export default function Character(props: ICharacterProps) {
	return (
		<div className='space-y-4'>
			<div className='md:flex md:space-x-4'>
				<div className='flex-1'>
					<SectionDivider>Basic Information</SectionDivider>
					<BasicInfo />
				</div>

				<div className='flex-1 space-y-4 md:mt-0 mt-4'>
					<SectionDivider>Characteristics</SectionDivider>
					<Characteristics />

					<SectionDivider>Derived</SectionDivider>
					<Combat />
				</div>
			</div>

			<SectionDivider>Skills</SectionDivider>
			<Skills />

			<SectionDivider>Weapons</SectionDivider>
			<Weapons />

			<Backstory />
			{/* <TestWeapon />
			<TestWeapon />
			<TestWeapon /> */}
		</div>
	)
}
