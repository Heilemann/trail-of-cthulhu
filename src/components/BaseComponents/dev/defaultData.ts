import {
	Documents,
	TAccess,
	TDocument,
	TNote,
	TWeaponDocument,
} from '../../../interfaces'

const note: TNote = {
	_id: 'note',
	creator: 'abc',
	access: 'public' as TAccess,
	accessList: [],
	type: 'note',
	values: {
		name: 'Note',
		text: 'This is a **note**.',
	},
}

const weapon: TWeaponDocument = {
	_id: 'weapon',
	type: 'weapon',
	creator: 'abc',
	access: 'public',
	accessList: [],
	values: {
		name: 'Sword',
		skill: 'Weapons',
		range: {
			pointblank: '1',
			close: '0',
			near: '',
			long: '',
		},
		ammo: '',
		notes: '',
	},
}

const character: TDocument = {
	_id: 'character',
	creator: 'abc',
	access: 'public' as TAccess,
	accessList: [],
	type: 'character',
	values: {
		name: 'Bob',
		weapons: [
			{
				documentId: 'weapon',
				...weapon,
			},
		],
	},
}

const defaultDocuments: Documents = {
	byId: {
		note,
		weapon,
		character,
	},
	allIds: ['note', 'weapon', 'character'],
}

export default defaultDocuments
