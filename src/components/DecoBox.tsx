import React from 'react'

export interface IDecoBoxProps
	extends React.InputHTMLAttributes<HTMLDivElement> {}

export default function DecoBox(props: IDecoBoxProps) {
	const { children, ...rest } = props

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		console.log('----> Dragging over!', props.id)
	}

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		console.log('----> Dropped!', event)
	}

	return (
		<div
			onDragOver={handleDragOver}
			onDrop={handleDrop}
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
