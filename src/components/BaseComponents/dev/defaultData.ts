import {
	TAccess,
	TDocument,
	TWeapon,
	TWeaponDocument,
} from '../../../interfaces'

const weapon: TWeapon = {
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
}

const weaponDocument: TWeaponDocument = {
	_id: 'weapon',
	type: 'weapon',
	creator: 'abc',
	access: 'public',
	accessList: [],
	values: weapon,
}

const defaultDocuments: TDocument[] = [
	{
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
	},
	{ ...weaponDocument },
]

export default defaultDocuments
