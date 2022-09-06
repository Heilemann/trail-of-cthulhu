import { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import DecoBox from '../DecoBox'
import SectionDivider from '../SectionDivider'
import Skill from './Skill'
import context from '../context'
import RefreshSkills from './RefreshSkills'

export interface ISkillsListProps {}

export default function SkillsList(props: ISkillsListProps) {
	const { state } = useContext(context)
	const { editMode } = state

	return (
		<DecoBox>
			<div className='mb-4'>
				<RefreshSkills />
			</div>

			<div
				className={twMerge(
					'grid grid-cols-1 gap-4',
					editMode === 'view' ? 'md:grid-cols-3' : 'lg:grid-cols-3',
				)}
			>
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
					<Skill name='Disguise &#x271D;' />
					<Skill name='Driving' />
					<Skill name='Electrical Repair &#x271D;' />
					<Skill name='Explosives &#x271D;' />
					<Skill name='Filch' />
					<Skill name='Firearms' />
					<Skill name='First Aid' />
					<Skill name='Fleeing' />
					<Skill name='Health' />
					<Skill name='Hypnosis' />
					<Skill name='Mechnical Repair &#x271D;' />
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

					<div className='mt-2 text-gray-500'>
						&#x271D; Can be used as investigative ability
					</div>
				</div>
			</div>
		</DecoBox>
	)
}
