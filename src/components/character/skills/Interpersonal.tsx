import SectionDivider from '../../SectionDivider'
import CreditRating from '../CreditRating'
import Skill from './Skill'

const Interpersonal = () => {
	return (
		<div>
			<SectionDivider>Interpersonal Abilities</SectionDivider>

			<Skill name='Assess Honesty' category='investigative' />
			<Skill name='Bargain' category='investigative' />
			<Skill name='Bureaucracy' category='investigative' />
			<Skill name='Cop Talk' category='investigative' />
			<CreditRating />
			<Skill name='Flattery' category='investigative' />
			<Skill name='Interrogation' category='investigative' />
			<Skill name='Intimidation' category='investigative' />
			<Skill name='Oral History' category='investigative' />
			<Skill name='Reassurance' category='investigative' />
			<Skill name='Streetwise' category='investigative' />
		</div>
	)
}

export default Interpersonal
