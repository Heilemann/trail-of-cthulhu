import { useFormContext } from 'react-hook-form'
import TextArea from '../Textarea'

export interface ITextBlockProps {
	name: string
}

export default function TextBlock(props: ITextBlockProps) {
	const { name } = props
	const { register } = useFormContext()

	return <TextArea {...register(name)} />
}
