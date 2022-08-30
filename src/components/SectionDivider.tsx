import * as React from 'react'
import { twMerge } from 'tailwind-merge'

export interface ISectionDividerProps {
	className?: string
	children: React.ReactNode
}

export default function SectionDivider({
	children,
	className,
}: ISectionDividerProps) {
	return (
		<div
			className={twMerge(
				`sectionDivider relative flex flex-none overflow-hidden text-xl font-bold uppercase tracking-wider text-gray-600 before:m-auto before:mr-4 before:h-0.5 before:flex-1 before:rounded-full before:bg-gray-800 before:content-[""] after:m-auto after:ml-4 after:h-0.5 after:flex-1 after:rounded-full after:bg-gray-800 after:content-[""]`,
				className,
			)}
			style={{
				fontFamily: 'CovingtonCondensed',
			}}
		>
			{children}
		</div>
	)
}
