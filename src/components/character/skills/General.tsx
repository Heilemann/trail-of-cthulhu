import { useWatch } from 'react-hook-form'
import SectionDivider from '../../SectionDivider'
import Skill from './Skill'
import Health from '../Health'

const General = () => {
	const bookhounds = useWatch({ name: 'bookhounds' })

	return (
		<div className='flex-1'>
			<SectionDivider>General Abilities</SectionDivider>

			<Skill name='Athletics' category='general' />
			{bookhounds && <Skill name='Auction' category='general' />}
			<Skill name='Conceal' category='general' />
			<Skill name='Disguise&nbsp;&#x271D;' category='general' />
			<Skill name='Driving' category='general' />
			<Skill name='Electrical Repair&nbsp;&#x271D;' category='general' />
			<Skill name='Explosives&nbsp;&#x271D;' category='general' />
			<Skill name='Filch' category='general' />
			<Skill name='Firearms' category='general' />
			<Skill name='First Aid' category='general' />
			<Skill name='Fleeing' category='general' />
			<Health />
			<Skill name='Hypnosis' category='general' />
			<Skill name='Mechnical Repair&nbsp;&#x271D;' category='general' />
			<Skill name='Piloting' category='general' />
			<Skill name='Preparedness' category='general' />
			<Skill name='Psyhcoanalysis' category='general' />
			<Skill name='Riding' category='general' />
			<Skill name='Sanity' category='general' />
			<Skill name='Stability' category='general' />
			<Skill name='Scuffling' category='general' />
			<Skill name='Sense Trouble' category='general' />
			<Skill name='Shadowing' category='general' />
			<Skill name='Stealth' category='general' />
			<Skill name='Weapons' category='general' />

			<div className='mt-2 text-gray-500'>
				&#x271D; Can be used as investigative ability
			</div>
		</div>
	)
}

export default General
