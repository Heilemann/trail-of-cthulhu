import { MinusIcon } from '@heroicons/react/24/solid'
import { UseFieldArrayRemove } from 'react-hook-form'
import { TCharacterNote } from '../../interfaces'
import DecoBox from '../DecoBox'
import Button from '../Form/Button'
import Input from '../Form/Input'
import TextArea from '../Form/Textarea'

interface Props {
	remove: UseFieldArrayRemove
	index: number
	characternote: TCharacterNote
}

const CharacterNote = ({ remove, index, characternote }: Props) => {
	const handleRemove = () => {
		remove(index)
	}

	return (
		<DecoBox>
			<div className='flex'>
				<Input placeholder='Title...' />
				<Button
					onClick={handleRemove}
					className='my-1 p-1.5'
					aria-label='Remove note'
				>
					<MinusIcon className='h-4 w-4' title='Remove note' />
				</Button>
			</div>
			<TextArea placeholder='Note text...' />
		</DecoBox>
	)
}

export default CharacterNote