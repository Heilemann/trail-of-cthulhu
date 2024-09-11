import { MinusIcon } from '@heroicons/react/24/solid'
import { Input } from 'nrsystemtools'
import { UseFieldArrayRemove, useFormContext } from 'react-hook-form'
import { TCharacterNote } from '../../interfaces/interfaces'
import Button from '../BaseComponents/Form/Button'
import TextArea from '../BaseComponents/Form/Textarea'
import DecoBox from '../DecoBox'

interface Props {
	remove: UseFieldArrayRemove
	index: number
	characternote: TCharacterNote
}

const CharacterNote = ({ remove, index, characternote }: Props) => {
	const { register } = useFormContext()

	const handleRemove = () => {
		remove(index)
	}

	return (
		<DecoBox>
			<div className='flex'>
				<Input
					placeholder='Title...'
					{...register(`characternotes.${index}.title`)}
				/>
				<Button
					onClick={handleRemove}
					className='my-1 p-1.5'
					aria-label='Remove note'
				>
					<MinusIcon className='h-4 w-4' title='Remove note' />
				</Button>
			</div>
			<TextArea
				placeholder='Note text...'
				{...register(`characternotes.${index}.note`)}
			/>
		</DecoBox>
	)
}

export default CharacterNote
