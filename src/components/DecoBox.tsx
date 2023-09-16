import React from 'react'

export interface IDecoBoxProps
	extends React.InputHTMLAttributes<HTMLDivElement> {}

export default function DecoBox(props: IDecoBoxProps) {
	const { children, ...rest } = props

	return (
		<div
			style={{
				borderWidth: '25px',
				borderImageSource: 'url(' + require('../assets/frame.webp') + ')',
				borderImageSlice: '200',
				borderImageWidth: '50px',
				borderImageOutset: '0',
				borderImageRepeat: 'stretch',
			}}
			{...rest}
		>
			{children}
		</div>
	)
}
