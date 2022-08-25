import * as React from 'react'

export interface ILogoProps {}

export default function Logo(props: ILogoProps) {
	return (
		<div
			className='m-auto mt-2 mb-6 grid h-14 w-full place-items-center bg-cover md:mb-0 md:h-28 md:w-60'
			style={{
				background:
					'url(' + require('../assets/coclogo.png') + ') no-repeat center',
				backgroundSize: 'contain',
			}}
		/>
	)
}
