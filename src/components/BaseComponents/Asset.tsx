// This file contains the Asset component which is used to display an asset
// (image, video, pdf) and allow the user to upload a new asset or remove the
// current asset.
import { TrashIcon } from '@heroicons/react/24/solid'
import { FC, useContext, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import Button from './Form/Button'
import context from './context'
import useMessageToApp from './hooks/UseMessageToApp'
import useOrigin from './hooks/useOrigin'

interface AssetProps {
	name: string
	className?: string
	style?: React.CSSProperties
	mediaStyle?: React.CSSProperties
	addLabel?: string
	removeLabel?: string
}

const Asset: FC<AssetProps> = props => {
	const { name, className, style, mediaStyle, addLabel } = props
	const { state } = useContext(context)
	const { editMode, assets, document } = state
	const [assetId, setAssetId] = useState<string>(document?.values[name])
	const asset = assets.byId[assetId]
	const { setValue } = useFormContext()
	const messageToApp = useMessageToApp()
	const { origin } = useOrigin()

	useEffect(() => {
		setAssetId(document?.values[name])
	}, [document, assets, setAssetId, name])

	const handleUpload = () => {
		messageToApp({
			message: 'upload asset',
			data: { name: name, documentId: document._id },
		})
	}

	const handleRemoveAsset = () => {
		setValue(name, '')
		messageToApp({ message: 'remove asset', data: { assetId } })
	}

	if (!asset) {
		return (
			<div>
				<Button
					className={twMerge(
						'w-full',
						editMode === 'view' ? 'hidden' : 'block',
					)}
					onClick={handleUpload}
				>
					{addLabel || 'Upload'}
				</Button>
			</div>
		)
	}

	// TODO: Other file types
	// TODO: alt text
	return (
		<div
			className={twMerge(
				'relative flex max-w-xs items-center justify-center space-y-2',
				className,
			)}
			style={style}
		>
			{asset.filetype.includes('image') && (
				<div className='relative aspect-square object-contain'>
					<img
						alt='na'
						src={origin + asset.fileurl}
						className='relative z-10 h-full w-full rounded-lg object-contain'
						style={mediaStyle}
					/>
					<div
						className='absolute inset-0 z-0 bg-contain bg-center opacity-20 blur-xl'
						style={{
							backgroundImage: `url(${origin + asset.fileurl})`,
						}}
					/>
				</div>
			)}
			{asset.filetype.includes('video') && (
				<video
					autoPlay={true}
					loop={true}
					muted={true}
					playsInline={true}
					src={origin + asset.fileurl}
					className='object-contain'
					style={mediaStyle}
				/>
			)}
			<Button
				className={twMerge(
					'absolute right-1 top-1 mt-0 p-2',
					editMode === 'view' ? 'hidden' : 'block',
				)}
				style={{
					zIndex: 100,
				}}
				onClick={handleRemoveAsset}
			>
				<TrashIcon className='h-4 w-4' />
			</Button>
		</div>
	)
}

export default Asset
