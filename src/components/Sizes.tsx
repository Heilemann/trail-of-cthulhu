export default function Sizes() {
	return (
		<div className='text-center'>
			<div className='font-bold block sm:hidden'>xs</div>
			<div className='font-bold hidden sm:block md:hidden'>sm</div>
			<div className='font-bold hidden md:block lg:hidden'>md</div>
			<div className='font-bold hidden lg:block xl:hidden'>lg</div>
			<div className='font-bold hidden xl:block'>xl</div>
		</div>
	)
}
