// this component simply renders the correct component based on the document type.
// This is where you add and remove your various sheets.
import { TDocumentType } from '../interfaces'
import Book from './book/Book'
import Character from './character/Character'
import Handout from './handout/Handout'
import Note from './note/Note'
import Scene from './scene/Scene'
import Weapon from './weapon/Weapon'

type Props = {
	type: TDocumentType
}

export default function TypeSwitcher({ type }: Props) {
	if (!type) return null

	return (
		<div className='bottom-0 box-border flex min-h-full w-full flex-col bg-gray-100 p-4 text-sm text-gray-900 dark:bg-gray-900 dark:text-gray-100'>
			{type === 'character' && <Character />}
			{type === 'note' && <Note />}
			{type === 'book' && <Book />}
			{type === 'scene' && <Scene />}
			{type === 'weapon' && <Weapon />}
			{type === 'handout' && <Handout />}
		</div>
	)
}
