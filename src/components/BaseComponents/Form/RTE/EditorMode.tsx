import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useContext, useEffect } from 'react'
import context from '../../context'

type Props = {}

const EditorMode = (props: Props) => {
	const { state } = useContext(context)
	const { editMode } = state
	const [editor] = useLexicalComposerContext()

	useEffect(() => {
		const editable = editMode === 'edit'
		editor?.setEditable(editable)
	}, [editor, editMode])

	return null
}

export default EditorMode
