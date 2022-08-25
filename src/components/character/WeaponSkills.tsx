import { useContext } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import Input from '../Input'
import context from '../context'
import Button from '../Button'
import skillList from './skillList'
import { twMerge } from 'tailwind-merge'
import weaponSkillList from '../weaponSkillList'

export interface IWeaponSkillsProps {
	index: number
}

type TWeaponSkill = 'brawl' | 'handgun' | 'rifle' | 'custom'

export default function WeaponSkills(props: IWeaponSkillsProps) {
	const { index } = props
	const { register, control } = useFormContext()
	const { state } = useContext(context)
	const { editMode, messageToApp } = state
	const list = skillList

	const weaponSkill: TWeaponSkill = useWatch({
		control,
		name: `weapons.${index}.skill`,
		defaultValue: 'Other',
	})

	let skills = useWatch({
		control,
		name: `skills`,
		defaultValue: '',
	}) as string

	const regular = useWatch({
		control,
		name: `weapons.${index}.regular`,
		defaultValue: '',
	}) as string

	// get default skill values
	// const skillValues = {
	// 	brawl: brawlSkill.length
	// 		? brawlSkill
	// 		: list.find(s => s.name === 'Fighting (Brawl)')!.starting,
	// 	handgun: handgunSkill.length
	// 		? handgunSkill
	// 		: list.find(s => s.name === 'Firearms (Handgun)')!.starting,
	// 	rifle: rifleSkill.length
	// 		? rifleSkill
	// 		: list.find(s => s.name === 'Firearms (Rifle/Shotgun)')!.starting,
	// 	custom: '0',
	// } as { [key in TWeaponSkill]: string }

	// const regularSkill = regular.length
	// 	? regular
	// 	: skillValues[weaponSkill].toString()
	// const hardSkill = Math.floor(parseInt(regularSkill) / 2).toString()
	// const extremeSkill = Math.floor(parseInt(regularSkill) / 5).toString()

	const regularSkill = '0'
	const hardSkill = '0'
	const extremeSkill = '0'

	const handleSkillClick = (skill: string) => {
		messageToApp &&
			messageToApp('send message', {
				message: `/roll d10 < ${skill}`,
			})
	}

	return (
		<>
			<td>
				<select
					className={twMerge('text-black', editMode === 'view' ? 'hidden' : '')}
					{...register(`weapons.${index}.skill`)}
				>
					{weaponSkillList.map(skill => (
						<option key={skill}>{skill}</option>
					))}
				</select>
				{editMode === 'view' && weaponSkill}
			</td>
			<td>
				<Input
					className={twMerge(
						'bg-transparent text-center dark:bg-transparent',
						editMode === 'view' && 'hidden',
					)}
					placeholder={regularSkill ? regularSkill : '—'}
					{...register(`weapons.${index}.regular`)}
				/>

				{editMode === 'view' && (
					<Button
						className='w-12 px-1 py-1 text-center m-1'
						onClick={() =>
							handleSkillClick(regular.length ? regular : regularSkill)
						}
					>
						{regularSkill ? regularSkill : '—'}%
					</Button>
				)}
			</td>
			<td>
				{editMode === 'edit' && hardSkill}

				{editMode === 'view' && (
					<Button
						className='w-12 px-1 py-1 text-center m-1'
						onClick={() => handleSkillClick(hardSkill)}
					>
						{hardSkill ? hardSkill : '—'}%
					</Button>
				)}
			</td>
			<td>
				{editMode === 'edit' && extremeSkill}

				{editMode === 'view' && (
					<Button
						className='w-12 px-1 py-1 text-center m-1'
						onClick={() => handleSkillClick(extremeSkill)}
					>
						{extremeSkill ? extremeSkill : '—'}%
					</Button>
				)}
			</td>
		</>
	)
}
