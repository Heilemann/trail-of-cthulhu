import { PlusIcon } from '@heroicons/react/24/solid'
import { DragEvent, useContext, useState } from 'react'
import { FieldValues, useFieldArray, useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { TWeapon, TWeaponOnCharacter } from '../../interfaces'
import { borderStyle } from '../borderStyle'
import Button from '../Button'
import context from '../context'
import DecoBox from '../DecoBox'
import WeaponRow from './WeaponRow'

export interface IWeaponsProps {}

export default function Weapons(props: IWeaponsProps) {
	const { state } = useContext(context)
	const { documents } = state
	const { control } = useFormContext()
	const { fields, prepend, remove } = useFieldArray<FieldValues, any, any>({
		control,
		name: 'weapons',
	})

	const handleAdd = () => {
		const weapon: TWeaponOnCharacter = {
			documentId: '',
			name: '',
			range: {
				pointblank: 0,
				close: 0,
				near: 0,
				long: 0,
			},
			notes: '',
		}
		prepend(weapon)
	}

	const handleDrop = (e: DragEvent) => {
		// @ts-ignore
		const droppedDocumentId = e.dataTransfer.getData('documentId').documentId
		const droppedDoc = documents.find(d => d._id === droppedDocumentId)

		if (!droppedDoc)
			throw new Error(
				`Could not find dropped document. ID: ${droppedDocumentId}`,
			)

		const type: string = droppedDoc.type

		if (type !== 'weapon') return

		const droppedWeapon = droppedDoc.values as TWeapon

		console.log('>>>>>>>>>> DROPPED WEAPON:', droppedWeapon)

		prepend({
			...droppedWeapon,
			documentId: droppedDoc._id,
		} as TWeaponOnCharacter)
	}

	const [dragIsOver, setDragIsOver] = useState(false)

	const handleDragEnter = (e: DragEvent) => {
		setDragIsOver(true)
		e.preventDefault()
	}

	const handleDragOver = (e: DragEvent) => {
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
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			className={dragIsOver ? 'outline outline-4 outline-red-500' : ''}
		>
			<table
				className='w-full border-collapse text-center text-base'
				style={{
					fontFamily: 'DustismoRoman',
				}}
			>
				<thead>
					<tr className={twMerge('p-2 text-left', borderStyle)}>
						<th className='w-36 font-normal text-gray-500'>Name</th>
						<th className='w-18 text-center font-normal text-gray-500'>
							<span className='hidden sm:inline'>Point Blank</span>
							<span className='sm:hidden'>PB</span>
						</th>
						<th className='w-18 text-center font-normal text-gray-500'>
							Close
						</th>
						<th className='w-18 text-center font-normal text-gray-500'>Near</th>
						<th className='w-18 text-center font-normal text-gray-500'>Long</th>
						<th className='w-6'></th>
						<th className='w-6'>
							<Button onClick={handleAdd} className='my-1 p-1.5'>
								<PlusIcon className='h-4 w-4' />
							</Button>
						</th>
					</tr>
				</thead>
				<tbody>
					{fields.map((weapon, index) => {
						return <WeaponRow key={index} index={index} remove={remove} />
					})}
				</tbody>
			</table>
		</DecoBox>
	)
}
