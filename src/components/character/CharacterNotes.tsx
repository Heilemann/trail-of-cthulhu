import { FieldValues, useFieldArray, useFormContext } from 'react-hook-form'
import { TCharacterNote } from '../../interfaces'
import Button from '../BaseComponents/Form/Button'
import CharacterNote from './CharacterNote'

const emptyNote: TCharacterNote = {
	title: '',
	note: '',
}

const CharacterNotes = () => {
	const { control } = useFormContext()
	const { fields, prepend, remove } = useFieldArray<FieldValues, any, any>({
		control,
		name: 'characternotes',
	})

	const handleAdd = () => {
		prepend(emptyNote)
	}

	return (
		<div>
			<Button onClick={handleAdd}>Add Note</Button>
			{fields.map((characternote, index) => (
				<CharacterNote
					key={index}
					index={index}
					remove={remove}
					characternote={characternote as any}
				/>
			))}
		</div>
	)
}

export default CharacterNotes
