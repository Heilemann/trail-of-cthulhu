import { $createCodeNode } from '@lexical/code'
import {
	INSERT_ORDERED_LIST_COMMAND,
	INSERT_UNORDERED_LIST_COMMAND,
	REMOVE_LIST_COMMAND,
} from '@lexical/list'
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text'
import { $wrapNodes } from '@lexical/selection'
import {
	$createParagraphNode,
	$getSelection,
	$isRangeSelection,
	LexicalEditor,
} from 'lexical'
import { FC, MutableRefObject, useEffect, useRef } from 'react'
import { BlockType } from './ToolbarPlugin'
import Option from './Option'

interface BlockOptionsDropdownListProps {
	editor: LexicalEditor
	blockType: BlockType
	toolbarRef: React.RefObject<HTMLDivElement>
	setShowBlockOptionsDropDown: (show: boolean) => void
}

const BlockOptionsDropdownList: FC<BlockOptionsDropdownListProps> = ({
	editor,
	blockType,
	toolbarRef,
	setShowBlockOptionsDropDown,
}) => {
	const dropDownRef: MutableRefObject<HTMLDivElement | null> = useRef(null)

	// useEffect(() => {
	// 	const toolbar = toolbarRef.current
	// 	const dropDown = dropDownRef.current

	// 	if (toolbar !== null && dropDown !== null) {
	// 		const { top, left } = toolbar.getBoundingClientRect()
	// 		dropDown.style.top = `${top + 40}px`
	// 		dropDown.style.left = `${left}px`
	// 	}
	// }, [dropDownRef, toolbarRef])

	useEffect(() => {
		const dropDown = dropDownRef.current
		const toolbar = toolbarRef.current

		if (dropDown !== null && toolbar !== null) {
			const handle = (event: { target: any }) => {
				const target = event.target

				if (!dropDown.contains(target) && !toolbar.contains(target)) {
					setShowBlockOptionsDropDown(false)
				}
			}
			document.addEventListener('click', handle)

			return () => {
				document.removeEventListener('click', handle)
			}
		}
	}, [dropDownRef, setShowBlockOptionsDropDown, toolbarRef])

	const formatParagraph = () => {
		if (blockType !== 'paragraph') {
			editor.update(() => {
				const selection = $getSelection()

				if ($isRangeSelection(selection)) {
					$wrapNodes(selection, () => $createParagraphNode())
				}
			})
		}
		setShowBlockOptionsDropDown(false)
	}

	const formatLargeHeading = () => {
		if (blockType !== 'h1') {
			editor.update(() => {
				const selection = $getSelection()

				if ($isRangeSelection(selection)) {
					$wrapNodes(selection, () => $createHeadingNode('h1'))
				}
			})
		}
		setShowBlockOptionsDropDown(false)
	}

	const formatMediumHeading = () => {
		if (blockType !== 'h2') {
			editor.update(() => {
				const selection = $getSelection()

				if ($isRangeSelection(selection)) {
					$wrapNodes(selection, () => $createHeadingNode('h2'))
				}
			})
		}
		setShowBlockOptionsDropDown(false)
	}

	const formatSmallHeading = () => {
		if (blockType !== 'h3') {
			editor.update(() => {
				const selection = $getSelection()

				if ($isRangeSelection(selection)) {
					$wrapNodes(selection, () => $createHeadingNode('h3'))
				}
			})
		}
		setShowBlockOptionsDropDown(false)
	}

	const formatBulletList = () => {
		if (blockType !== 'ul') {
			editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, void 0)
		} else {
			editor.dispatchCommand(REMOVE_LIST_COMMAND, void 0)
		}
		setShowBlockOptionsDropDown(false)
	}

	const formatNumberedList = () => {
		if (blockType !== 'ol') {
			editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, void 0)
		} else {
			editor.dispatchCommand(REMOVE_LIST_COMMAND, void 0)
		}
		setShowBlockOptionsDropDown(false)
	}

	const formatQuote = () => {
		if (blockType !== 'quote') {
			editor.update(() => {
				const selection = $getSelection()

				if ($isRangeSelection(selection)) {
					$wrapNodes(selection, () => $createQuoteNode())
				}
			})
		}
		setShowBlockOptionsDropDown(false)
	}

	const formatCode = () => {
		if (blockType !== 'code') {
			editor.update(() => {
				const selection = $getSelection()

				if ($isRangeSelection(selection)) {
					$wrapNodes(selection, () => $createCodeNode())
				}
			})
		}
		setShowBlockOptionsDropDown(false)
	}

	return (
		<div
			className='absolute -bottom-1 left-0 flex translate-y-full flex-col overflow-hidden whitespace-nowrap rounded-lg bg-gray-900 py-1 text-white'
			ref={dropDownRef}
		>
			<Option
				onClick={formatParagraph}
				blockType={blockType}
				optionType='paragraph'
			/>
			<Option
				onClick={formatLargeHeading}
				blockType={blockType}
				optionType='h1'
			/>
			<Option
				onClick={formatMediumHeading}
				blockType={blockType}
				optionType='h2'
			/>
			<Option
				onClick={formatSmallHeading}
				blockType={blockType}
				optionType='h3'
			/>
			<Option
				onClick={formatBulletList}
				blockType={blockType}
				optionType='ul'
			/>
			<Option
				onClick={formatNumberedList}
				blockType={blockType}
				optionType='ol'
			/>
			<Option onClick={formatQuote} blockType={blockType} optionType='quote' />
			<Option onClick={formatCode} blockType={blockType} optionType='code' />
		</div>
	)
}

export default BlockOptionsDropdownList
