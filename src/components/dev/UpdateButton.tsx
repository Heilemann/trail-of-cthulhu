import Button from '../Button'

export default function UpdateButton() {
	const handleUpdate = () => {
		console.log('handleUpdate')
	}

	return (
		<Button
			onClick={handleUpdate}
			className='h-10 self-center rounded-full bg-gray-800 py-0 px-3 '
		>
			Update Data
		</Button>
	)
}
