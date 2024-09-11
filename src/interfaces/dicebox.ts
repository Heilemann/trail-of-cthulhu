export interface BaseStats {
	type: string
	value: number
	success: null | boolean // Updated to allow boolean
	successes: number
	failures: number
	valid: boolean
	order: number
}

export type Count = BaseStats

export type Die = BaseStats

export interface Roll {
	critical: boolean | null // Updated to allow boolean
	die: number
	matched: boolean
	order: number
	roll: number
	success: boolean | null // Updated to allow boolean
	successes: number
	failures: number
	type: 'roll'
	valid: boolean
	value: number
}

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
	id: number
	mods: any[]
	qty: number
	rolls: DieResult[]
	sides: number
	theme: string
	themeColor?: string
	value: number
}

export interface IDiceParsedResults {
	count: Count
	die: Die
	rolls: Roll[]
	success: null | boolean // Updated to allow boolean
	successes: number
	failures: number
	type: 'die'
	valid: boolean
	value: number
	order: number
	matched: boolean
	groupId: string
}

export interface IDiceResults {
	groups: RollGroup[]
}

export interface IDiceResults {
	dice: IDiceParsedResults[]
	failures: number
	ops: string[]
	order: number
	success: boolean
	successes: number
	type: string
	valid: boolean
	value: number
}
