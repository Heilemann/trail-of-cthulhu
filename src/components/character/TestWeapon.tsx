export interface ITestWeaponProps {}

export default function TestWeapon(props: ITestWeaponProps) {
	return (
		<div className='w-72 bg-red-500/5'>
			<strong>.22 Caliber Handgun</strong>
			<div className='space-x-2'>
				<span>Attack 64%</span>
				<span>Dmg 1d6+1</span>
			</div>
			<div className='text-gray-500'>Firearms (Handgun) • 63% • 32% • 16%</div>
			<div className='text-gray-500'>
				100yds • 1 Per Round • Malfunction 100
			</div>
		</div>
	)
}
