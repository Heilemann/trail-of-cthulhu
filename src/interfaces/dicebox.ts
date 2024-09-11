// documentation: https://fantasticdice.games/docs/usage/objects

type sides = number | 'fate'

// The roll object is whats required by the `roll` and `add` methods.
// At a minimum you must specify the number of sides of the dice to be rolled.
export interface RollObject {
	id: number // unique identifier for the roll
	sides: sides // the type of die to be rolled. Either a number such as 20 or a die type such as "fate".
	modifier?: number // modifier to apply to the roll
	mods?: string[] // unknown purpose
	qty?: number // number of dice to roll
	theme?: string // the theme's system 'systemName' for this roll.
	themeColor?: string // HEX value for the theme's material color
}

interface BaseObject {
	value: number
	success?: boolean
	successes: number
	failures: number
	valid: boolean
	order: number
}

// When die results are returned they will contain the information listed below.
// Individual die results can then be passed back in to `roll`, `add`, `reroll`
// and `remove` methods as the notation argument.
export interface IndividualDieResult extends BaseObject {
	critical?: 'success' | 'failure'
	die: number
	matched: boolean
	roll: number
	reroll?: boolean
	type: 'roll'
}

// The results object will contain an array of roll groups and the individual rolls made in those groups.
// For example, 3d6 would create a *roll group* with three *rolls* in it.
export interface RollResultArray extends BaseObject {
	count: BaseObject
	die: BaseObject
	rolls: IndividualDieResult[]
	type: 'die'
	matched: boolean
	groupId: string
}

export interface Modifier extends BaseObject {
	failures: number
	order: number
	success?: boolean
	successes: number
	type: 'number'
	valid: boolean
	value: number
}

export interface ExpressionResult extends BaseObject {
	dice: (RollResultArray | Modifier)[]
	ops: ('+' | '-' | '*' | '/')[]
	type: 'expressionroll'
}

export type DiceResult = RollResultArray | ExpressionResult
