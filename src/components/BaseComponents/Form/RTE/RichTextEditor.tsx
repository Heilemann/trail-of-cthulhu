import { CodeHighlightNode, CodeNode } from '@lexical/code'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { ListItemNode, ListNode } from '@lexical/list'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'
import React, { useContext } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import inputStyle from '../../../styles/inputStyle'
import context from '../../context'
import EditorContentLoader from './EditorContentLoader'
import EditorMode from './EditorMode'
import ChangePlugin from './OnChangePlugin'
import ToolbarPlugin from './ToolbarPlugin'
import AutoLinkPlugin from './AutoLinkPlugin'
import './styles.css'

const theme = {
	ltr: 'ltr',
	rtl: 'rtl',
	paragraph: 'editor-paragraph',
	placeholder: 'editor-placeholder',
}

interface Props {
	name: string
	defaultValue?: string
	className?: string
}

const RichTextEditor: React.FC<Props> = ({ name, defaultValue, className }) => {
	const { state } = useContext(context)
	const { document, editMode } = state
	const { values } = document
	const { control } = useFormContext()

	const text = useWatch({
		name: name,
		defaultValue: values?.text || '',
	})

	const onError = (error: any) => {
		throw error
	}

	const initialConfig = {
		namespace: 'MyEditor',
		editable: editMode === 'edit',
		theme,
		onError,
		defaultValue: text,
		nodes: [
			HeadingNode,
			ListNode,
			ListItemNode,
			QuoteNode,
			CodeNode,
			CodeHighlightNode,
			TableNode,
			TableCellNode,
			TableRowNode,
			AutoLinkNode,
			LinkNode,
		],
	}

	const placeholder = (
		<div className='pointer-events-none absolute left-2 top-2 text-gray-500'>
			Enter some text...
		</div>
	)

	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			render={() => (
				<LexicalComposer initialConfig={initialConfig}>
					<div
						className={twMerge(
							editMode === 'edit' && inputStyle,
							'editor-container relative p-0',
							className,
						)}
					>
						{editMode === 'edit' && <ToolbarPlugin />}
						<RichTextPlugin
							contentEditable={<ContentEditable />}
							placeholder={placeholder}
							ErrorBoundary={LexicalErrorBoundary}
						/>
					</div>
					<ChangePlugin />
					<HistoryPlugin />
					<LinkPlugin />
					<ListPlugin />
					<AutoFocusPlugin />
					<AutoLinkPlugin />
					<EditorContentLoader htmlContent={text} />
					<EditorMode />
				</LexicalComposer>
			)}
		/>
	)
}

export default RichTextEditor
