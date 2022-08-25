import { forwardRef, useContext } from 'react'
import VInput from '../VInput'
import context from '../context'
import Button from '../Button'
import { twMerge } from 'tailwind-merge'
import { useWatch } from 'react-hook-form'

export interface ICharacteristicProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string
	name: string
}

const Characteristic = forwardRef<HTMLInputElement, ICharacteristicProps>(
	(props: ICharacteristicProps, ref) => {
		const { label, name, ...rest } = props
		const { state } = useContext(context)
		const { editMode, messageToApp } = state

		const value = useWatch({ name: name })
		const hasNoValue = value === undefined || value === null

		const hard = Math.floor(parseInt(value, 10) / 2)
		const extreme = Math.floor(parseInt(value, 10) / 5)

		const handleRoll = (val: string | number) => {
			messageToApp &&
				messageToApp('send message', { message: `/roll d100 < ${val}` })
		}

		return (
			<div>
				<VInput
					ref={ref}
					className={twMerge('', editMode === 'view' && 'hidden')}
					label={label}
					placeholder='&mdash;'
					name={name}
					{...rest}
				/>

				{editMode === 'view' && (
					<div className='flex flex-col text-xs'>
						<div className='flex space-x-px'>
							<Button
								onClick={() => handleRoll(value)}
								className='flex-1'
								disabled={hasNoValue}
							>
								<div className='text-center font-bold'>{label}</div>
								{value ? value + '%' : '—'}
							</Button>

							{/* <Button
								onClick={() => handleRoll(hard)}
								className='flex-1'
								disabled={hasNoValue}
							>
								{hard ? hard + '%' : '—'}
							</Button> */}

							{/* <Button
								onClick={() => handleRoll(extreme)}
								className='flex-1'
								disabled={hasNoValue}
							>
								{extreme ? extreme + '%' : '—'}
							</Button> */}
						</div>
					</div>
				)}
			</div>
		)
	},
)

export default Characteristic
