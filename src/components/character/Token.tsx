import Asset from '../Asset'
import DecoBox from '../DecoBox'

export interface ITokenProps {}

export default function Token(props: ITokenProps) {
	return (
		<DecoBox className='min-h-30 md:min-h-40 flex w-full flex-1 flex-col rounded-lg md:w-full'>
			<Asset name='token' addLabel='Add Token' removeLabel='Remove Token' />
		</DecoBox>
	)
}
