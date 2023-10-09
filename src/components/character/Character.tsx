import { useContext } from 'react'
import { useWatch } from 'react-hook-form'
import context from '../BaseComponents/context'
import DecoBox from '../DecoBox'
import HInput from '../Form/HInput'
import BasicInfo from './BasicInfo'
import Notes from './CharacterNotes'
import Settings from './Settings'
import Token from './Token'
import Skills from './skills/Skills'
import Weapons from './weapons/Weapons'

export interface ICharacterProps {}

export default function Character(props: ICharacterProps) {
	const { state } = useContext(context)
	const { document } = state
	const { values } = document
	const { skills } = values

	const athletics = useWatch({
		name: 'skills.Athletics.rating',
		defaultValue: skills?.athletics?.rating || 0,
	})
	const athleticsInt = parseInt(athletics || 0, 10)
	const defaultHitThreshold = athleticsInt < 8 ? '3' : '4'

	return (
		<div className='space-y-4'>
			<div className='space-y-4 md:flex md:space-y-0 md:space-x-4'>
				<BasicInfo />

				<div className='flex flex-col space-y-4'>
					<Token />

					<DecoBox>
						<HInput label='Hit Threshold' placeholder={defaultHitThreshold} />
					</DecoBox>
				</div>
			</div>

			<Weapons />
			<Skills />
			<Notes />
			<Settings />

			{/* <Backstory /> */}
		</div>
	)
}
