import { useWatch } from 'react-hook-form'
import SectionDivider from '../../SectionDivider'
import Skill from './Skill'

const Academic = () => {
	const bookhounds = useWatch({ name: 'bookhounds' })

	return (
		<div className='flex-1'>
			<SectionDivider>Academic Abilities</SectionDivider>

			<Skill name='Accounting' category='investigative' />
			<Skill name='Anthropology' category='investigative' />
			<Skill name='Archaeology' category='investigative' />
			<Skill name='Architecture' category='investigative' />
			<Skill name='Art History' category='investigative' />
			{bookhounds && <Skill name='Bibliography' category='investigative' />}
			<Skill name='Biology' category='investigative' />
			<Skill name='Cthulhu Mythos' category='investigative' />
			<Skill name='Cryptography' category='investigative' />
			<Skill name='Geology' category='investigative' />
			<Skill name='History' category='investigative' />
			<Skill name='Languages' category='investigative' specialities />
			<Skill name='Law' category='investigative' />
			<Skill name='Library Use' category='investigative' />
			<Skill name='Medicine' category='investigative' />
			<Skill name='Occult' category='investigative' />
			<Skill name='Physics' category='investigative' />
			{bookhounds && <Skill name='Textual Analysis' category='investigative' />}
			{bookhounds && <Skill name='The Knowledge' category='investigative' />}
			<Skill name='Theology' category='investigative' />
		</div>
	)
}

export default Academic
