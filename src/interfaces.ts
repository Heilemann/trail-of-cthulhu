import { FieldValues } from 'react-hook-form'

export type TGrid = {
	type: 'hex' | 'square'
	size: number
	unitSize: number
	unit: string
}

export type stringBoolean = 'true' | 'false'
export type windowSize = 'small' | 'medium' | 'large'

export type TCollection = {
	type: TDocumentType
	singularName: string
	pluralName: string
	description: string
	hasEditMode: stringBoolean
	windowSize: windowSize
	thumbnailField: string[]
	allowCreate: stringBoolean
	canAssumeAsCharacter: stringBoolean
}

export type TSystemConfig = {
	name: string
	version: string
	author: string
	description: string
	code: string
	grid: TGrid
	assetsPath: string
	collections: TCollection[]
}

export type TDocumentType =
	| 'character'
	| 'note'
	| 'book'
	| 'scene'
	| 'weapon'
	| 'handout'

export type TDocument = {
	_id: string // UID
	type: TDocumentType // e.g. 'chararacter' or 'spell'
	creator: string // UID of the creating user
	access: TAccess // 'private' or 'public'
	accessList: string[] // list of userIds
	values: {
		// folders use values as 'children'
		[key: string]: any
	}
}

export type TAccess = 'private' | 'public'

export type TValues = {
	[key: string]: any
	weapons?: TWeapon[]
	skills?: TSkills
}

export type TSkills = {
	[key: string]: TSkill
}

export type TSkill = {
	pool: number
	rating: number
	specialities?: string[]
}

export type TAsset = {
	_id: string
	name: string
	fileurl: string
	filesize: number
	filetype: string
	width: number
	height: number
	creator: string
}

export type TState = {
	documentId: string
	editMode: TEditMode
	document: TDocument
	documents: TDocument[]
	assets: TAsset[]
}

export type TReducerAction =
	| {
			type: 'LOAD'
			payload: Partial<TState>
	  }
	| {
			type: 'UPDATE_DOCUMENT_VALUES'
			payload: {
				documentId: string
				values: FieldValues
			}
	  }

export type TContext = {
	state: TState
	dispatch: React.Dispatch<TReducerAction>
}

export type TPostMessage =
	| {
			message: 'load'
	  }
	| {
			message: 'save'
			document: TDocument
	  }
	| {
			message: 'send message'
			data: { message: string }
	  }

export type TEditMode = 'view' | 'edit'

// message that can be received by the system
export type TSystemReceivableMessage =
	| 'load'
	| 'update data'
	| 'update document mode'
	| 'upload asset success'

export type TAppReceivableMessages =
	| {
			message: 'system is ready'
			data: null
	  }
	| {
			message: 'save'
			data: TDocument
	  }
	| {
			message: 'focus'
			data: undefined
	  }
	| {
			message: 'send message'
			data: { message: string }
	  }
	| {
			message: 'upload asset'
			data: {
				name: string
				documentId: string
			}
	  }
	| {
			message: 'remove asset'
			data: { assetId: string }
	  }
	| {
			message: 'set scene'
			data: { sceneId: string }
	  }
	| {
			message: 'open document'
			data: { documentId: string }
	  }
	| {
			message: 'generate'
			data: {
				name: string
				prompt: string
			}
	  }

export type TSystemReceivableMessageData = {
	documentId: string
	documents: TDocument[]
	assets: TAsset[]
	editMode: TEditMode
}

export type TSystemReceivableMessages =
	| {
			message: 'load'
			source: 'Aux'
			data: TSystemReceivableMessageData
	  }
	| {
			message: 'update data'
			source: 'App'
			data: TSystemReceivableMessageData
	  }
	| {
			message: 'update document mode'
			source: 'App'
			data: {
				editMode: TEditMode
			}
	  }
	| {
			message: 'upload asset success'
			source: 'App'
			data: {
				name: string
			}
	  }

export type TWeaponSkills = 'Firearms' | 'Weapons' | 'Scuffling'

export type TWeapon = {
	name: string
	skill: TWeaponSkills
	range: {
		pointblank: string
		close: string
		near: string
		long: string
	}
	ammo: string
	notes: string
}

export type TWeaponOnCharacter = TWeapon & {
	documentId: string
}

export type TWeaponDocument = TDocument & {
	values: TWeapon
}
