import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'
import { $isAtNodeEnd } from '@lexical/selection'
import { mergeRegister } from '@lexical/utils'
import {
	$getSelection,
	$isRangeSelection,
	LexicalEditor,
	RangeSelection,
	SELECTION_CHANGE_COMMAND,
} from 'lexical'
import { useCallback, useEffect, useRef, useState } from 'react'

const LowPriority = 1

function positionEditorElement(
	editorElement: HTMLDivElement,
	rect: DOMRect | null,
) {
	if (rect === null) {
		editorElement.style.opacity = '0'
		editorElement.style.top = '-1000px'
		editorElement.style.left = '-1000px'
	} else {
		editorElement.style.opacity = '1'
		editorElement.style.top = `${
			rect.top + rect.height + window.pageYOffset + 10
		}px`
		editorElement.style.left = `${
			rect.left +
			window.pageXOffset -
			editorElement.offsetWidth / 2 +
			rect.width / 2
		}px`
	}
}

function getSelectedNode(selection: RangeSelection | null) {
	if (selection === null) {
		throw new Error('Selection is null')
	}
	const anchor = selection.anchor
	const focus = selection.focus
	const anchorNode = selection.anchor.getNode()
	const focusNode = selection.focus.getNode()
	if (anchorNode === focusNode) {
		return anchorNode
	}
	const isBackward = selection.isBackward()
	if (isBackward) {
		return $isAtNodeEnd(focus) ? anchorNode : focusNode
	} else {
		return $isAtNodeEnd(anchor) ? focusNode : anchorNode
	}
}

function FloatingLinkEditor({ editor }: { editor: LexicalEditor }) {
	const editorRef = useRef<HTMLDivElement | null>(null)
	const inputRef = useRef<HTMLInputElement | null>(null)
	const mouseDownRef = useRef(false)
	const [linkUrl, setLinkUrl] = useState('')
	const [isEditMode, setEditMode] = useState(false)
	const [lastSelection, setLastSelection] = useState<any>(null)

	const updateLinkEditor = useCallback(() => {
		const selection = $getSelection()
		if ($isRangeSelection(selection)) {
			const node = getSelectedNode(selection)
			const parent = node.getParent()
			if ($isLinkNode(parent)) {
				setLinkUrl(parent.getURL())
			} else if ($isLinkNode(node)) {
				setLinkUrl(node.getURL())
			} else {
				setLinkUrl('')
			}
		}
		const editorElem = editorRef.current
		const nativeSelection = window.getSelection()
		const activeElement = document.activeElement

		if (editorElem === null || nativeSelection === null) {
			return
		}

		const rootElement = editor.getRootElement()
		if (
			selection !== null &&
			!nativeSelection.isCollapsed &&
			rootElement !== null &&
			rootElement.contains(nativeSelection.anchorNode)
		) {
			const domRange = nativeSelection.getRangeAt(0)
			let rect
			if (nativeSelection.anchorNode === rootElement) {
				let inner = rootElement
				while (inner.firstElementChild != null) {
					inner = inner.firstElementChild as HTMLElement
				}
				rect = inner.getBoundingClientRect()
			} else {
				rect = domRange.getBoundingClientRect()
			}

			if (!mouseDownRef.current) {
				positionEditorElement(editorElem, rect)
			}
			setLastSelection(selection)
		} else if (!activeElement || activeElement.className !== 'link-input') {
			positionEditorElement(editorElem, null)
			setLastSelection(null)
			setEditMode(false)
			setLinkUrl('')
		}

		return true
	}, [editor])

	useEffect(() => {
		return mergeRegister(
			editor.registerUpdateListener(({ editorState }) => {
				editorState.read(() => {
					updateLinkEditor()
				})
			}),

			editor.registerCommand(
				SELECTION_CHANGE_COMMAND,
				() => {
					updateLinkEditor()
					return true
				},
				LowPriority,
			),
		)
	}, [editor, updateLinkEditor])

	useEffect(() => {
		editor.getEditorState().read(() => {
			updateLinkEditor()
		})
	}, [editor, updateLinkEditor])

	useEffect(() => {
		if (isEditMode && inputRef.current) {
			inputRef.current.focus()
		}
	}, [isEditMode])

	return (
		<div ref={editorRef} className=''>
			{isEditMode ? (
				<input
					ref={inputRef}
					className='link-input'
					value={linkUrl}
					onChange={event => {
						setLinkUrl(event.target.value)
					}}
					onKeyDown={event => {
						if (event.key === 'Enter') {
							event.preventDefault()
							if (lastSelection !== null) {
								if (linkUrl !== '') {
									editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl)
								}
								setEditMode(false)
							}
						} else if (event.key === 'Escape') {
							event.preventDefault()
							setEditMode(false)
						}
					}}
				/>
			) : (
				<>
					<div className='link-input'>
						<a href={linkUrl} target='_blank' rel='noopener noreferrer'>
							{linkUrl}
						</a>
						<div
							className='link-edit'
							role='button'
							tabIndex={0}
							onMouseDown={event => event.preventDefault()}
							onClick={() => {
								setEditMode(true)
							}}
						/>
					</div>
				</>
			)}
		</div>
	)
}

export default FloatingLinkEditor
