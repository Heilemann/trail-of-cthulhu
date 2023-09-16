import React from 'react'

export interface IDecoBoxProps
	extends React.InputHTMLAttributes<HTMLDivElement> {}

export default function DecoBox(props: IDecoBoxProps) {
	const { children, ...rest } = props
	const [isOver, setIsOver] = React.useState(false)

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
			onDragEnter={() => setIsOver(true)}
			onDragOver={handleDragOver}
			onDragLeave={() => setIsOver(false)}
			onDrop={handleDrop}
			style={{
				borderWidth: '25px',
				borderImageSource: 'url(' + require('../assets/frame.webp') + ')',
				borderImageSlice: '200',
				borderImageWidth: '50px',
				borderImageOutset: '0',
				borderImageRepeat: 'stretch',
				backgroundColor: isOver ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
			}}
			{...rest}
		>
			{children}
		</div>
	)
}
