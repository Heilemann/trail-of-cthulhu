import { useContext } from 'react'
import { useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import DecoBox from '../DecoBox'
import SectionDivider from '../SectionDivider'
import context from '../context'
import CreditRating from './CreditRating'
import GeneralBuildPoints from './GeneralBuildPoints'
import Health from './Health'
import InvestigativeBuildPoints from './InvestigativeBuildPoints'
import RefreshSkills from './RefreshSkills'
import Skill from './Skill'

export interface ISkillsListProps {}

export default function SkillsList(props: ISkillsListProps) {
	const { state } = useContext(context)
	const { editMode } = state

	const bookhounds = useWatch({ name: 'bookhounds' })

	return (
		<DecoBox>
			<div className='mb-4 grid-cols-3 gap-4 sm:grid'>
				<RefreshSkills />
				<InvestigativeBuildPoints />
				<GeneralBuildPoints />
			</div>

			<div
				className={twMerge(
					'grid grid-cols-1 gap-4',
					editMode === 'view'
						? 'md:grid-cols-2 lg:grid-cols-3'
						: 'md:grid-cols-2 lg:grid-cols-3',
				)}
			>
				<div>
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
					{bookhounds && (
						<Skill name='Textual Analysis' category='investigative' />
					)}
					{bookhounds && (
						<Skill name='The Knowledge' category='investigative' />
					)}
					<Skill name='Theology' category='investigative' />
				</div>

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

					<SectionDivider className='mt-8'>Technical Abilities</SectionDivider>

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

				<div>
					<SectionDivider>General Abilities</SectionDivider>

					<Skill name='Athletics' category='general' />
					{bookhounds && <Skill name='Auction' category='general' />}
					<Skill name='Conceal' category='general' />
					<Skill name='Disguise &#x271D;' category='general' />
					<Skill name='Driving' category='general' />
					<Skill name='Electrical Repair &#x271D;' category='general' />
					<Skill name='Explosives &#x271D;' category='general' />
					<Skill name='Filch' category='general' />
					<Skill name='Firearms' category='general' />
					<Skill name='First Aid' category='general' />
					<Skill name='Fleeing' category='general' />
					<Health />
					<Skill name='Hypnosis' category='general' />
					<Skill name='Mechnical Repair &#x271D;' category='general' />
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
			</div>
		</DecoBox>
	)
}
