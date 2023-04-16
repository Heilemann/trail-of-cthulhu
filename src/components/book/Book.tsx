import Asset from '../Asset'
import DecoBox from '../DecoBox'

export default function Book() {
	return (
		<DecoBox className='min-h-30 md:min-h-40 flex w-full flex-1 flex-col text-center md:w-full'>
			<Asset name='book' addLabel='Add Book' removeLabel='Remove Book' />
		</DecoBox>
	)
}
