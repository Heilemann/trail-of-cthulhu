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
				`sectionDivider relative flex flex-none overflow-hidden text-xs font-bold uppercase tracking-wider text-yellow-500 before:m-auto before:mr-4 before:h-1 before:flex-1 before:rounded-full before:bg-yellow-500 before:content-[""] after:m-auto after:ml-4 after:h-1 after:flex-1 after:rounded-full after:bg-yellow-500 after:content-[""]`,
				className,
			)}
		>
			{children}
		</div>
	)
}
