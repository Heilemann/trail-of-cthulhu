import DecoBox from '../../DecoBox'
import Academic from './Academic'
import BuildPoints from './BuildPoints'
import General from './General'
import Interpersonal from './Interpersonal'
import Refresh24Hour from './Refresh24Hour'
import RefreshSkills from './RefreshSkills'
import Technical from './Technical'

export default function SkillsList() {
	return (
		<DecoBox>
			<div className='mb-4 grid-cols-4 gap-4 sm:grid'>
				<RefreshSkills />
				<Refresh24Hour />
				<BuildPoints
					watchKey='skills.investigative'
					label='Invest. Build Pts'
				/>
				<BuildPoints watchKey='skills.general' label='General Build Pts' />
			</div>

			{/* <div className='h-4 bg-red-500 sm:bg-blue-500 md:bg-green-500 lg:bg-yellow-500'></div> */}

			<div className='flex flex-1 flex-col space-x-4 sm:flex-row md:space-x-4 lg:hidden'>
				<div className='flex-1 space-y-8 lg:flex'>
					<Academic />
					<Interpersonal />
				</div>
				<div className='flex-1 space-y-8 lg:flex'>
					<Technical />
					<General />
				</div>
			</div>

			<div className='hidden flex-1 space-x-4 md:space-x-8 lg:flex'>
				<Academic />
				<div className='flex flex-1 flex-col space-y-8 lg:flex'>
					<Interpersonal />
					<Technical />
				</div>
				<General />
			</div>
		</DecoBox>
	)
}
