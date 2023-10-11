import Button from '../Form/Button'

export default function ResetButton() {
	const handleClearStorage = () => {
		localStorage.clear()
		window.location.reload()
	}

	return (
		<Button
			onClick={handleClearStorage}
			className='h-10 self-center rounded-full bg-gray-800 px-3 py-0 '
		>
			Clear <span className='hidden sm:inline'>Storage</span>
		</Button>
	)
}
