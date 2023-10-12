import { PlusIcon } from '@heroicons/react/24/solid'
import { DragEvent, useContext, useState } from 'react'
import { FieldValues, useFieldArray, useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { TWeapon, TWeaponOnCharacter } from '../../../interfaces'
import Button from '../../BaseComponents/Form/Button'
import DecoBox from '../../DecoBox'
import { borderStyle } from '../../styles/borderStyle'
import context from '../../BaseComponents/context'
import WeaponRow from './WeaponRow'

const emptyWeapon: TWeaponOnCharacter = {
	documentId: '',
	name: 'Unnamed Weapon',
	skill: 'Weapons',
	range: {
		pointblank: null,
		close: null,
		near: null,
		long: null,
	},
	ammo: '',
	notes: '',
}

export default function Weapons() {
	const { state } = useContext(context)
	const { documents } = state
	const { control } = useFormContext()
	const { fields, prepend, remove } = useFieldArray<FieldValues, any, any>({
		control,
		name: 'weapons',
	})

	const handleAdd = () => {
		prepend(emptyWeapon)
	}

	const handleDrop = (e: DragEvent) => {
		// @ts-ignore
		const droppedDocumentId = e.dataTransfer.getData('documentId').documentId
		const droppedDoc = documents.byId[droppedDocumentId]
		if (!droppedDoc)
			throw new Error(
				`Could not find dropped document. ID: ${droppedDocumentId}`,
			)

		const type: string = droppedDoc.type

		if (type !== 'weapon') return

		const droppedWeapon = droppedDoc.values as TWeapon

		prepend({
			...droppedWeapon,
			documentId: droppedDoc._id,
		} as TWeaponOnCharacter)

		setDragIsOver(false)
	}

	const [dragIsOver, setDragIsOver] = useState(false)

	const handleDragEnter = (e: DragEvent) => {
		setDragIsOver(true)
		e.preventDefault()
	}

	const handleDragLeave = (e: DragEvent) => {
		setDragIsOver(false)
		e.preventDefault()
	}

	return (
		<DecoBox
			onDrop={handleDrop}
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
			className={dragIsOver ? 'bg-white/10' : ''}
		>
			<table
				className='w-full border-collapse text-center text-base'
				style={{
					fontFamily: 'DustismoRoman',
				}}
			>
				<thead>
					<tr className={twMerge('p-2 text-left', borderStyle)}>
						<th className='font-normal text-gray-500'>Name</th>
						<th className='w-44 font-normal text-gray-500'>Skill</th>
						<th className='w-14 text-center font-normal text-gray-500 md:w-20'>
							<div className='hidden md:inline'>Pt. Blank</div>
							<div className='md:hidden'>Pt. Blnk</div>
						</th>
						<th className='w-14 text-center font-normal text-gray-500 md:w-20'>
							Close
						</th>
						<th className='w-14 text-center font-normal text-gray-500 md:w-20'>
							Near
						</th>
						<th className='w-14 text-center font-normal text-gray-500 md:w-20'>
							Long
						</th>
						<th className='w-12 text-center font-normal text-gray-500 md:w-20'>
							Ammo
						</th>
						<th className='w-5'></th>
						<th className='w-5 text-center'>
							<Button
								onClick={handleAdd}
								className='my-1 p-1.5'
								aria-label='Add a weapon'
							>
								<PlusIcon className='h-4 w-4' title='Add weapon' />
							</Button>
						</th>
					</tr>
				</thead>
				<tbody>
					{fields.map((weapon, index) => (
						<WeaponRow
							key={index}
							index={index}
							remove={remove}
							weapon={weapon as any}
						/>
					))}
				</tbody>
			</table>
		</DecoBox>
	)
}
