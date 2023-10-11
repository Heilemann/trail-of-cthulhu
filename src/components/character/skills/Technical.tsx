import { useWatch } from 'react-hook-form'
import SectionDivider from '../../SectionDivider'
import Skill from './Skill'

const Technical = () => {
	const bookhounds = useWatch({ name: 'bookhounds' })

	return (
		<div>
			<SectionDivider>Technical Abilities</SectionDivider>

			<Skill name='Art' category='investigative' specialities />
			<Skill name='Astronomy' category='investigative' />
			<Skill name='Chemistry' category='investigative' />
			<Skill name='Craft' category='investigative' specialities />
			{bookhounds && (
				<Skill name='Document Analysis' category='investigative' />
			)}
			<Skill name='Evidence Collection' category='investigative' />
			<Skill name='Forensics' category='investigative' />
			{bookhounds && <Skill name='Forgery' category='investigative' />}
			<Skill name='Locksmith' category='investigative' />
			<Skill name='Outdoorsman' category='investigative' />
			<Skill name='Pharmacy' category='investigative' />
			<Skill name='Photography' category='investigative' />
		</div>
	)
}

export default Technical
