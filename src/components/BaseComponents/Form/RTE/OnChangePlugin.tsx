import { $generateHtmlFromNodes } from '@lexical/html'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { EditorState } from 'lexical'
import { useFormContext } from 'react-hook-form'

type Props = {}

const ChangePlugin = (props: Props) => {
	const [editor] = useLexicalComposerContext()
	const { setValue } = useFormContext()

	const handleEditorChange = (editorState: EditorState) => {
		editorState.read(() => {
			const htmlString = $generateHtmlFromNodes(editor, null)
			setValue('text', htmlString, { shouldValidate: true })
		})
	}

	return <OnChangePlugin onChange={handleEditorChange} />
}

export default ChangePlugin
