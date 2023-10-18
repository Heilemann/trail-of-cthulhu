import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import Asset from '../BaseComponents/Asset'
import context from '../BaseComponents/context'
import DecoBox from '../DecoBox'
import { Input } from 'nrsystemtools/dist/types/components/input/Input'
import TextArea from '../BaseComponents/Form/Textarea'

export interface IHandoutProps {}

export default function Handout(props: IHandoutProps) {
	const { state } = useContext(context)
	const { document, editMode } = state
	const { values } = document
	const { register } = useFormContext()

	if (!document?.values) return null

	return (
		<DecoBox>
			<Input
				className={twMerge(
					'flex-0 mb-2 font-bold',
					editMode === 'view' && 'hidden',
				)}
				placeholder='Name...'
				{...register('name')}
			/>

			<Asset
				name='image'
				addLabel='Add Media'
				removeLabel='Remove Media'
				className='-m-4'
			/>

			<TextArea
				className={twMerge(
					'm-0 mt-2 flex-1 resize-none',
					editMode === 'view' && 'hidden',
				)}
				placeholder='Note...'
				{...register('note')}
			/>

			{editMode === 'view' && <div className='mt-2'>{values.note}</div>}
		</DecoBox>
	)
}
