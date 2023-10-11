import { $generateNodesFromDOM } from '@lexical/html'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getRoot, $insertNodes } from 'lexical'
import { useEffect, useState } from 'react'

interface Props {
	htmlContent: string
}

const EditorContentLoader: React.FC<Props> = ({ htmlContent }) => {
	const [editor] = useLexicalComposerContext()
	const [isInitialized, setIsInitialized] = useState(false)

	useEffect(() => {
		if (!isInitialized && htmlContent && editor) {
			// Parse the HTML string to a DOM object
			const parser = new DOMParser()
			const dom = parser.parseFromString(htmlContent, 'text/html')

			// This operation should be synchronous within editor.update()
			editor.update(() => {
				// Generate Lexical nodes from the DOM object
				const nodes = $generateNodesFromDOM(editor, dom)

				const root = $getRoot() // Ensure this is called within the editor.update()
				if (root) {
					root.select() // select root of editor
					$insertNodes(nodes) // insert new nodes at root
				}
			})
			setIsInitialized(true)
		}
	}, [htmlContent, editor, isInitialized])

	return null
}

export default EditorContentLoader
