import DecoBox from '../DecoBox'
import SectionDivider from '../SectionDivider'
import Skill from './Skill'

export interface ISkillsListProps {}

export default function SkillsList(props: ISkillsListProps) {
	return (
		<DecoBox className='grid grid-cols-3 gap-4'>
			<div>
				<SectionDivider>Academic Abilities</SectionDivider>

				<Skill name='Accounting' />
				<Skill name='Anthropology' />
				<Skill name='Archaeology' />
				<Skill name='Architecture' />
				<Skill name='Art History' />
				<Skill name='Biology' />
				<Skill name='Cthulhu Mythos' />
				<Skill name='Cryptography' />
				<Skill name='Geology' />
				<Skill name='History' />
				<Skill name='Languages' specialities />
				<Skill name='Law' />
				<Skill name='Library Use' />
				<Skill name='Medicine' />
				<Skill name='Occult' />
				<Skill name='Physics' />
				<Skill name='Theology' />
			</div>

			<div>
				<SectionDivider>Interpersonal Abilities</SectionDivider>

				<Skill name='Assess Honesty' />
				<Skill name='Bargain' />
				<Skill name='Bureaucracy' />
				<Skill name='Cop Talk' />
				<Skill name='Credit Rating' />
				<Skill name='Flattery' />
				<Skill name='Interrogation' />
				<Skill name='Intimidation' />
				<Skill name='Oral History' />
				<Skill name='Reassurance' />
				<Skill name='Streetwise' />

				<SectionDivider className='mt-8'>Technical Abilities</SectionDivider>

				<Skill name='Art' specialities />
				<Skill name='Astronomy' />
				<Skill name='Chemistry' />
				<Skill name='Craft' specialities />
				<Skill name='Evidence Collection' />
				<Skill name='Forensics' />
				<Skill name='Locksmith' />
				<Skill name='Outdoorsman' />
				<Skill name='Pharmacy' />
				<Skill name='Photography' />
			</div>

			<div>
				<SectionDivider>General Abilities</SectionDivider>

				<Skill name='Athletics' />
				<Skill name='Conceal' />
				<Skill name='Disguise' />
				<Skill name='Driving' />
				<Skill name='Electrical Repair' />
				<Skill name='Explosives' />
				<Skill name='Filch' />
				<Skill name='Firearms' />
				<Skill name='First Aid' />
				<Skill name='Fleeing' />
				<Skill name='Health' />
				<Skill name='Hypnosis' />
				<Skill name='Mechnical Repair' />
				<Skill name='Piloting' />
				<Skill name='Preparedness' />
				<Skill name='Psyhcoanalysis' />
				<Skill name='Riding' />
				<Skill name='Sanity' />
				<Skill name='Stability' />
				<Skill name='Scuffling' />
				<Skill name='Sense Trouble' />
				<Skill name='Shadowing' />
				<Skill name='Stealth' />
				<Skill name='Weapons' />
			</div>
		</DecoBox>
	)
}
