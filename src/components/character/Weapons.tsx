import { PlusIcon } from '@heroicons/react/solid'
import { DragEvent, useContext } from 'react'
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
		prepend({
			name: '',
			damage: '',
			pointBlank: 0,
			close: 0,
			near: 0,
			long: 0,
			notes: '',
		} as TWeaponOnCharacter)
	}

	const handleDrop = (e: DragEvent) => {
		const droppedDocumentId = e.dataTransfer.getData('documentId')[0]
		const droppedDoc = documents.find(d => d._id === droppedDocumentId)

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
	}

	return (
		<DecoBox onDrop={handleDrop}>
			<table
				className='w-full border-collapse text-center text-base'
				style={{
					fontFamily: 'DustismoRoman',
				}}
			>
				<thead>
					<tr className={twMerge('p-2 text-left', borderStyle)}>
						<th className='font-normal text-gray-500'>Name</th>
						<th className='font-normal text-gray-500'>Damage</th>
						<th className='w-24 text-center font-normal text-gray-500'>
							Point Blank
						</th>
						<th className='w-24 text-center font-normal text-gray-500'>
							Close
						</th>
						<th className='w-24 text-center font-normal text-gray-500'>Near</th>
						<th className='w-24 text-center font-normal text-gray-500'>Long</th>
						<th className='w-24 text-center font-normal text-gray-500'>
							Notes
						</th>
						<th className='w-24 text-center font-normal text-gray-500'></th>
						<th className='w-4'>
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
