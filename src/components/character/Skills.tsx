import { useContext, useMemo } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import Button from '../Button'
import context from '../context'
import Input from '../Input'
import Label from '../Label'
import skillList from './skillList'

export interface ISkillsListProps {}

export default function SkillsList(props: ISkillsListProps) {
	const { state } = useContext(context)
	const { document, editMode, messageToApp } = state
	const { register } = useFormContext()

	// sort a-z and hide hidden skills
	const skills = useMemo(() => {
		return skillList.sort((a, b) => (a.name < b.name ? -1 : 1))
		// .filter(skill => !skill.hidden)
	}, [])

	const skillValues = useWatch({
		name: 'skills',
		defaultValue: document.values.skills || {},
	})

	const handleRoll = (skillName: string, skillValue: string) => {
		if (!messageToApp) return

		messageToApp('send message', {
			message: `/roll d100 < ${skillValue} for ${skillName}`,
		})
	}

	return (
		<div className='-mx-4 columns-none sm:columns-2 md:columns-3 lg:columns-4'>
			{skills.map(skill => {
				let value = skill.starting
				const sluggifiedName = skill.name.replace(/ /g, '-')

				if (
					skillValues &&
					skillValues[sluggifiedName] &&
					skillValues[sluggifiedName].value
				) {
					value = skillValues[sluggifiedName].value
				}

				return (
					<div
						key={sluggifiedName}
						className='mx-4 flex space-x-2 border-b border-gray-200 py-0.5 dark:border-gray-800'
					>
						<input
							type='checkbox'
							className={twMerge(
								'h-4 w-4 cursor-pointer appearance-none self-center rounded-md bg-gray-200 hover:bg-gray-700 dark:bg-gray-800',
								skill.tickable === false && 'opacity-0',
							)}
							{...register(`skills.${sluggifiedName}.ticked`)}
						/>

						<Label className='flex-1 self-center' htmlFor={skill.name}>
							{skill.name}
							{/* {skill.addable && <span> (addable)</span>} */}
						</Label>

						<Input
							// type='number'
							id={sluggifiedName}
							className={twMerge(
								'my-1 w-12 appearance-none bg-transparent py-1 pr-0 text-right dark:bg-transparent',
								editMode === 'view' && 'hidden',
							)}
							disabled={state.editMode ? false : true}
							placeholder={skill.starting.toString()}
							{...register(`skills.${sluggifiedName}.value`)}
						/>
						{editMode === 'edit' && <span className='self-center'>%</span>}
						{editMode === 'view' && (
							<Button
								className='w-14 px-2'
								onClick={() => handleRoll(skill.name, value)}
							>
								{value}%
							</Button>
						)}
					</div>
				)
			})}
		</div>
	)
}
