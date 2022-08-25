import { FC, useContext, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { TAsset } from '../interfaces'
import Button from './Button'
import context from './context'

interface AssetProps {
	name: string
	className?: string
	style?: React.CSSProperties
	addLabel?: string
	removeLabel?: string
}

const Asset: FC<AssetProps> = props => {
	const { name, className, style, addLabel, removeLabel } = props
	const { state } = useContext(context)
	const { editMode, assets, document, messageToApp } = state
	const [assetId, setAssetId] = useState<string>(document.values[name])
	const asset = assetId && assets.find((asset: TAsset) => asset._id === assetId)
	const { setValue } = useFormContext()

	useEffect(() => {
		setAssetId(document.values[name])
	}, [JSON.stringify(document), JSON.stringify(assets), setAssetId]) // eslint-disable-line react-hooks/exhaustive-deps

	// should move this to a context
	let parentOrigin = ''
	// if (process.env.NODE_ENV === 'development') {
	// const protocol = window.location.protocol;
	// const host = window.location.hostname;
	parentOrigin = `http://localhost:3000`
	// } else {
	// 	parentOrigin = 'https://newreal.ms'
	// }

	const handleUpload = () => {
		messageToApp && messageToApp('upload asset', name)
	}

	const handleRemoveAsset = () => {
		setValue(name, '')
		messageToApp && messageToApp('remove asset', { assetId })
	}

	if (!asset) {
		return (
			<Button
				// className={twMerge('w-full', editMode === 'view' ? 'hidden' : 'block')}
				onClick={handleUpload}
			>
				{addLabel || 'Upload'}
			</Button>
		)
	}

	// TODO: Other file types
	// TODO: alt text
	return (
		<div className={twMerge('space-y-2', className)} style={style}>
			{asset.filetype.includes('image') && (
				<img
					alt='wonderful'
					src={parentOrigin + asset.fileurl}
					className='rounded-lg'
					style={{
						objectFit: 'cover',
					}}
				/>
			)}
			{asset.filetype.includes('video') && (
				<video
					autoPlay={true}
					loop={true}
					muted={true}
					playsInline={true}
					src={parentOrigin + asset.fileurl}
					style={{
						objectFit: 'cover',
					}}
				/>
			)}
			<Button
				className={twMerge(
					'w-full',
					// , editMode === 'view' ? 'hidden' : 'block'
				)}
				onClick={handleRemoveAsset}
			>
				{removeLabel || 'Remove'}
			</Button>
		</div>
	)
}

export default Asset
