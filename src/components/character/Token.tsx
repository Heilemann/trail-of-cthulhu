import Asset from '../BaseComponents/Asset'
import DecoBox from '../DecoBox'

export default function Token() {
	return (
		<DecoBox className='min-h-30 md:min-h-40 flex w-full flex-1 flex-col text-center md:w-full'>
			<Asset
				name='token'
				addLabel='Add Portrait'
				removeLabel='Remove Portrait'
			/>
		</DecoBox>
	)
}
