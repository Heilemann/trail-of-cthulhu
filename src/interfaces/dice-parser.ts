// docs: https://fantasticdice.games/docs/addons/parser

type sides = number | 'fate'
type dieType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100' | 'fate'

export type ParsedNotation = {
	[key: number]: BaseParsedNotation
}

interface BaseParsedNotation {
	id: number
	modifier?: number
	mods?: Mod[]
	qty?: number
	rolls?: {
		[key: number]: ParsedNotationRollObject
	}
	sides?: string | number // number of sides or die type
	value?: number
}

// guessing at this one
type Mod = RerollMod | ExplodeMod | CompoundMod

interface RerollMod {
	type: 'reroll'
	target: {
		type: 'target'
		mod: '<' | '>' | '=' | '!=' | '<=' | '>='
		value: {
			type: 'number'
			value: number
		}
	}
}

interface ExplodeMod {
	type: 'explode'
	target: {
		type: 'target'
		mod: '<' | '>' | '=' | '!=' | '<=' | '>='
		value: {
			type: 'number'
			value: number
		}
	}
}

interface CompoundMod {
	type: 'compound'
	target: {
		type: 'target'
		mod?: null
		value: {
			type: 'number'
			value: number
		}
	}
}

interface ParsedNotationRollObject {
	collectionId: number
	data?: undefined // unknown purpose
	dieType: dieType
	groupId: number
	id: number
	meshName: 'default'
	rollId: number
	sides: sides
	theme: string
	themeColor: string // hex value
	value: number
}
