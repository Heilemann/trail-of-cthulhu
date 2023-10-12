import {
	ArrowUturnLeftIcon,
	ArrowUturnRightIcon,
	ChevronDownIcon,
} from '@heroicons/react/24/solid'
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'
import { $isListNode, ListNode } from '@lexical/list'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $isHeadingNode } from '@lexical/rich-text'
import { $isAtNodeEnd } from '@lexical/selection'
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils'
import {
	FontBoldIcon,
	FontItalicIcon,
	Link1Icon,
	StrikethroughIcon,
	TextAlignCenterIcon,
	TextAlignJustifyIcon,
	TextAlignLeftIcon,
	TextAlignRightIcon,
	UnderlineIcon,
} from '@radix-ui/react-icons'
import {
	$getSelection,
	$isRangeSelection,
	CAN_REDO_COMMAND,
	CAN_UNDO_COMMAND,
	FORMAT_ELEMENT_COMMAND,
	FORMAT_TEXT_COMMAND,
	REDO_COMMAND,
	RangeSelection,
	SELECTION_CHANGE_COMMAND,
	UNDO_COMMAND,
} from 'lexical'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { twMerge } from 'tailwind-merge'
import inputStyle from '../../../styles/inputStyle'
import BlockOptionsDropdownList from './BlockOptionsDropdownList'
import Divider from './Divider'
import FloatingLinkEditor from './FloatingLinkEditor'
import ToolbarButton from './ToolbarButton'

const LowPriority = 1

const supportedBlockTypes = new Set([
	'paragraph',
	'quote',
	'code',
	'h1',
	'h2',
	'ul',
	'ol',
])

type BlockType =
	| 'code'
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'ol'
	| 'paragraph'
	| 'quote'
	| 'ul'

const blockTypeToBlockName: { [key in BlockType]: string } = {
	code: 'Code Block',
	h1: 'Large Heading',
	h2: 'Small Heading',
	h3: 'Heading',
	h4: 'Heading',
	h5: 'Heading',
	ol: 'Numbered List',
	paragraph: 'Normal',
	quote: 'Quote',
	ul: 'Bulleted List',
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

export default function ToolbarPlugin() {
	const [editor] = useLexicalComposerContext()
	const toolbarRef = useRef(null)
	const [canUndo, setCanUndo] = useState(false)
	const [canRedo, setCanRedo] = useState(false)
	const [blockType, setBlockType] = useState<BlockType>('paragraph')
	const [showBlockOptionsDropDown, setShowBlockOptionsDropDown] =
		useState(false)
	const [isLink, setIsLink] = useState(false)
	const [isBold, setIsBold] = useState(false)
	const [isItalic, setIsItalic] = useState(false)
	const [isUnderline, setIsUnderline] = useState(false)
	const [isStrikethrough, setIsStrikethrough] = useState(false)

	const updateToolbar = useCallback(() => {
		const selection = $getSelection()
		if ($isRangeSelection(selection)) {
			const anchorNode = selection.anchor.getNode()
			const element =
				anchorNode.getKey() === 'root'
					? anchorNode
					: anchorNode.getTopLevelElementOrThrow()
			const elementKey = element.getKey()
			const elementDOM = editor.getElementByKey(elementKey)
			if (elementDOM !== null) {
				if ($isListNode(element)) {
					const parentList = $getNearestNodeOfType(anchorNode, ListNode)
					const type = parentList ? parentList.getTag() : element.getTag()
					setBlockType(type)
				} else {
					const type = $isHeadingNode(element)
						? element.getTag()
						: element.getType()
					setBlockType(type as BlockType)
				}
			}
			// Update text format
			setIsBold(selection.hasFormat('bold'))
			setIsItalic(selection.hasFormat('italic'))
			setIsUnderline(selection.hasFormat('underline'))
			setIsStrikethrough(selection.hasFormat('strikethrough'))

			// Update links
			const node = getSelectedNode(selection)
			const parent = node.getParent()
			if ($isLinkNode(parent) || $isLinkNode(node)) {
				setIsLink(true)
			} else {
				setIsLink(false)
			}
		}
	}, [editor])

	useEffect(() => {
		return mergeRegister(
			editor.registerUpdateListener(({ editorState }) => {
				editorState.read(() => {
					updateToolbar()
				})
			}),
			editor.registerCommand(
				SELECTION_CHANGE_COMMAND,
				(_payload, newEditor) => {
					updateToolbar()
					return false
				},
				LowPriority,
			),
			editor.registerCommand(
				CAN_UNDO_COMMAND,
				payload => {
					setCanUndo(payload)
					return false
				},
				LowPriority,
			),
			editor.registerCommand(
				CAN_REDO_COMMAND,
				payload => {
					setCanRedo(payload)
					return false
				},
				LowPriority,
			),
		)
	}, [editor, updateToolbar])

	const insertLink = useCallback(() => {
		if (!isLink) {
			editor.dispatchCommand(TOGGLE_LINK_COMMAND, 'https://google.com')
		} else {
			editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
		}
	}, [editor, isLink])

	return (
		<div
			className={twMerge(
				inputStyle,
				'sticky top-0 flex space-x-0.5 border-b border-gray-900 bg-gray-800/100 py-1 dark:bg-gray-800',
			)}
			ref={toolbarRef}
		>
			<ToolbarButton
				disabled={!canUndo}
				onClick={() => {
					editor.dispatchCommand(UNDO_COMMAND, undefined)
				}}
				aria-label='Undo'
			>
				<ArrowUturnLeftIcon className='format undo h-4 w-4' />
			</ToolbarButton>
			<ToolbarButton
				disabled={!canRedo}
				onClick={() => {
					editor.dispatchCommand(REDO_COMMAND, undefined)
				}}
				className='toolbar-item'
				aria-label='Redo'
			>
				<ArrowUturnRightIcon className='format redo h-4 w-4' />
			</ToolbarButton>
			<Divider />
			{supportedBlockTypes.has(blockType) && (
				<>
					<ToolbarButton
						onClick={() =>
							setShowBlockOptionsDropDown(!showBlockOptionsDropDown)
						}
						className='toolbar-item flex items-center space-x-2'
						aria-label='Formatting Options'
					>
						<span className={'icon block-type ' + blockType} />
						<span className='text'>{blockTypeToBlockName[blockType]}</span>
						<ChevronDownIcon className='h-4 w-4' />
					</ToolbarButton>
					{showBlockOptionsDropDown &&
						createPortal(
							<BlockOptionsDropdownList
								editor={editor}
								blockType={blockType}
								toolbarRef={toolbarRef}
								setShowBlockOptionsDropDown={setShowBlockOptionsDropDown}
							/>,
							document.body,
						)}
					<Divider />
				</>
			)}

			<ToolbarButton
				onClick={() => {
					editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
				}}
				isActive={isBold}
				aria-label='Format Bold'
			>
				<FontBoldIcon className='h-4 w-4' />
			</ToolbarButton>
			<ToolbarButton
				onClick={() => {
					editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
				}}
				isActive={isItalic}
				aria-label='Format Italics'
			>
				<FontItalicIcon className='h-4 w-4' />
			</ToolbarButton>
			<ToolbarButton
				onClick={() => {
					editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
				}}
				isActive={isUnderline}
				aria-label='Format Underline'
			>
				<UnderlineIcon className='h-4 w-4' />
			</ToolbarButton>
			<ToolbarButton
				onClick={() => {
					editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')
				}}
				isActive={isStrikethrough}
				aria-label='Format Strikethrough'
			>
				<StrikethroughIcon className='h-4 w-4' />
			</ToolbarButton>
			<ToolbarButton
				onClick={insertLink}
				isActive={isLink}
				aria-label='Insert Link'
			>
				<Link1Icon className='h-4 w-4' />
			</ToolbarButton>
			{isLink &&
				createPortal(<FloatingLinkEditor editor={editor} />, document.body)}
			<Divider />
			<ToolbarButton
				onClick={() => {
					editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')
				}}
				aria-label='Left Align'
			>
				<TextAlignLeftIcon className='h-4 w-4' />
			</ToolbarButton>
			<ToolbarButton
				onClick={() => {
					editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')
				}}
				aria-label='Center Align'
			>
				<TextAlignCenterIcon className='h-4 w-4' />
			</ToolbarButton>
			<ToolbarButton
				onClick={() => {
					editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')
				}}
				aria-label='Right Align'
			>
				<TextAlignRightIcon className='h-4 w-4' />
			</ToolbarButton>
			<ToolbarButton
				onClick={() => {
					editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')
				}}
				aria-label='Justify Align'
			>
				<TextAlignJustifyIcon className='h-4 w-4' />
			</ToolbarButton>
		</div>
	)
}
