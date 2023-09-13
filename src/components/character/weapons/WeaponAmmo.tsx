import { useWatch } from 'react-hook-form'
import { TWeaponOnCharacter } from '../../../interfaces'

type Props = {
	index: number
}

const WeaponAmmo = ({ index }: Props) => {
	const watchedWeapon: TWeaponOnCharacter = useWatch({
		name: `weapons.${index}`,
	})
	const ammo = watchedWeapon?.ammo

	return <div>Ammo! {ammo}</div>
}

export default WeaponAmmo
