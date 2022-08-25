import SectionDivider from '../SectionDivider'
import TextBlock from './TextBlock'

export interface IBackstoryProps {}

export default function Backstory(props: IBackstoryProps) {
	return (
		<div className='sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid gap-4'>
			<div>
				<SectionDivider>Personal Description</SectionDivider>
				<TextBlock name='backstory.personaldescription' />
			</div>

			<div>
				<SectionDivider>Ideology/Beliefs</SectionDivider>
				<TextBlock name='backstory.ideologybeliefs' />
			</div>

			<div>
				<SectionDivider>Significant People</SectionDivider>
				<TextBlock name='backstory.significantpeople' />
			</div>

			<div>
				<SectionDivider>Meaningful Locations</SectionDivider>
				<TextBlock name='backstory.meaningfullocations' />
			</div>

			<div>
				<SectionDivider>Treasured Possessions</SectionDivider>
				<TextBlock name='backstory.treasuredpossessions' />
			</div>

			<div>
				<SectionDivider>Traits</SectionDivider>
				<TextBlock name='backstory.traits' />
			</div>

			<div>
				<SectionDivider>Injuries &amp; Scars</SectionDivider>
				<TextBlock name='backstory.injuriesscars' />
			</div>

			<div>
				<SectionDivider>Phoebias &amp; Manias</SectionDivider>
				<TextBlock name='backstory.phoebiasmanias' />
			</div>

			<div>
				<SectionDivider>Tomes, Spells &amp; Artifacts</SectionDivider>
				<TextBlock name='backstory.tomesspellsartifacts' />
			</div>

			<div>
				<SectionDivider>Strange Encounters</SectionDivider>
				<TextBlock name='backstory.strangeencounters' />
			</div>
		</div>
	)
}
