export interface BaseStats {
	type: string
	value: number
	success: boolean | null
	successes: number
	failures: number
	valid: boolean
	order: number
}

export type Count = BaseStats

export type Die = BaseStats

export interface RollObject {
	modifier?: number
	qty?: number
	sides: number | string
	theme?: string
	themeColor?: string
}

export interface DieResult {
	groupId: number
	rollId: number
	sides: number
	theme: string
	themeColor?: string
	value: number
}

export interface RollGroup {
	id: string
	qty: number
	sides: number
	rolls: IndividualDieResult[]
	value: number
}

// Used
export interface IndividualDieResult {
	critical: 'success' | 'failure' | null
	die: number
	matched: boolean
	order: number
	roll: number
	reroll: boolean | null
	success: boolean | null
	successes: number
	failures: number
	type: 'roll'
	valid: boolean
	value: number
}

// Used
export interface RollResultArray {
	count: Count
	die: Die
	rolls: IndividualDieResult[]
	success: boolean | null
	successes: number
	failures: number
	type: 'die'
	valid: boolean
	value: number
	order: number
	matched: boolean
	groupId: string
}

export interface ExpressionResult {
	dice: RollResultArray[]
	failures: number
	ops: string[]
	order: number
	success: boolean | null
	successes: number
	type: 'expressionroll'
	valid: boolean
	value: number
}
