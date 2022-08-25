import { PlusIcon } from '@heroicons/react/solid'
import { DragEvent, useContext } from 'react'
import { FieldValues, useFieldArray, useFormContext } from 'react-hook-form'
import { TWeapon, TWeaponOnCharacter } from '../../interfaces'
import Button from '../Button'
import context from '../context'
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
			skill: 'Other',
			regular: '',
			damage: '',
			range: '',
			weight: '',
			ammoCapacity: '',
			usesPerRound: '',
			malfunction: '',
			commonEra: '',
			documentId: '',
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
		<div onDrop={handleDrop}>
			<table className='w-full border-collapse'>
				<thead>
					<tr className='border-b border-gray-300 p-2 text-left dark:border-gray-800'>
						<th className='font-normal text-gray-500'>Name</th>
						<th className='font-normal text-gray-500'>Skill</th>
						<th className='w-12 text-center font-normal text-gray-500'>Reg.</th>
						<th className='w-12 text-center font-normal text-gray-500'>Har.</th>
						<th className='w-12 text-center font-normal text-gray-500'>Exp.</th>
						<th>
							<span className='font-normal text-gray-500 hidden md:inline'>
								Damage
							</span>
							<span className='font-normal text-gray-500 inline md:hidden'>
								Dmg
							</span>
						</th>
						<th className='font-normal text-gray-500'>Range</th>
						<th className='font-normal text-gray-500'>Ammo</th>
						<th className='font-normal text-gray-500'>Uses Per Round</th>
						<th className='font-normal text-gray-500'>Malfunction</th>
						<th className='font-normal text-gray-500'>Info</th>
						<th className='w-4'>
							<Button onClick={handleAdd} className='p-1.5 my-1'>
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
		</div>
	)
}
