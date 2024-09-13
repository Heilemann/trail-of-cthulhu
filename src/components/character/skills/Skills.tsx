import DecoBox from '../../DecoBox'
import Academic from './Academic'
import BuildPoints from './BuildPoints'
import General from './General'
import Interpersonal from './Interpersonal'
import Refresh24Hour from './Refresh24Hour'
import RefreshSkills from './RefreshSkills'
import Technical from './Technical'
import ToggleSkillsVisibility from './ToggleSkillsVisibility'

export default function SkillsList() {
	return (
		<DecoBox>
			<div className='mb-4 grid-cols-5 gap-4 space-y-1 sm:grid'>
				<RefreshSkills />
				<Refresh24Hour />
				<BuildPoints
					watchKey='skills.investigative'
					label='Investigative Points'
				/>
				<BuildPoints watchKey='skills.general' label='General Points' />
				<ToggleSkillsVisibility />
			</div>

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
