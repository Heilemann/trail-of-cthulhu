import { CodeHighlightNode, CodeNode } from '@lexical/code'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { ListItemNode, ListNode } from '@lexical/list'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'
import React, { useContext } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import ErrorBoundary from '../../../ErrorBoundary'
import context from '../../context'
import ChangePlugin from './OnChangePlugin'
import inputStyle from '../../../styles/inputStyle'
import { twMerge } from 'tailwind-merge'

const theme = {
	ltr: 'ltr',
	rtl: 'rtl',
	paragraph: 'editor-paragraph',
	placeholder: 'editor-placeholder',
}

interface Props {
	name: string
	defaultValue?: string
}

const RichTextEditor: React.FC<Props> = ({ name, defaultValue }) => {
	const { state } = useContext(context)
	const { document } = state
	const { values } = document
	const { control } = useFormContext()

	const text = useWatch({
		name: name,
		defaultValue: values?.text || '',
	})

	console.log('======>', text)

	const onError = (error: any) => {
		throw error
	}

	const initialConfig = {
		namespace: 'MyEditor',
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
					<div className={twMerge(inputStyle, 'relative mt-1')}>
						<PlainTextPlugin
							contentEditable={<ContentEditable />}
							placeholder={placeholder}
							ErrorBoundary={ErrorBoundary}
						/>
					</div>
					<ChangePlugin />
				</LexicalComposer>
			)}
		/>
	)
}

export default RichTextEditor
