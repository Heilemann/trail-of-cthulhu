import { useWatch } from 'react-hook-form'
import Skill from './skills/Skill'
import { useMemo } from 'react'

export interface ICreditRatingProps {}

export default function CreditRating(props: ICreditRatingProps) {
	const creditRating = useWatch({
		name: 'skills.investigative.CreditRating',
	})

	const note = useMemo(() => {
		const r = creditRating?.rating

		if (!r) return null

		return (
			<div className='text-sm text-gray-500'>
				{r < 1 ? 'Pauper / Charity Case' : null}
				{r === 1 ? 'Working Poor' : null}
				{r === 2 ? 'Working Class' : null}
				{r === 3 ? 'Lower Middle Class' : null}
				{r === 4 ? 'Middle Class' : null}
				{r === 5 ? 'Upper Middle Class / Bourgeois' : null}
				{r === 6 ? 'Upper Class / Wealthy' : null}
				{r > 6 ? 'Landed Gentry / Business Elite / Fabulously Wealthy' : null}
			</div>
		)
	}, [creditRating])

	return <Skill name='CreditRating' category='investigative' note={note} />
}
