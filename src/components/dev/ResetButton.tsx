import Button from '../Button'

export default function ResetButton() {
	const handleClearStorage = () => {
		localStorage.clear()
		window.location.reload()
	}

	return (
		<Button
			onClick={handleClearStorage}
			className='h-10 self-center rounded-full bg-gray-800 py-0 px-3 '
		>
			Clear <span className='hidden sm:inline'>Storage</span>
		</Button>
	)
}
