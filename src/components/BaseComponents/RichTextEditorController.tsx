import { RichTextEditor } from 'nrsystemtools'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

interface RichTextEditorControllerProps {
	name: string
	defaultValue?: string
	className?: string
}

const RichTextEditorController: React.FC<RichTextEditorControllerProps> = ({
	name,
	defaultValue,
	className,
}) => {
	const { control } = useFormContext()

	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			render={({ field }) => (
				<RichTextEditor
					{...field}
					className={className}
					editable={true} // or any other prop you want to pass down
				/>
			)}
		/>
	)
}

export default RichTextEditorController
