import { useWatch } from 'react-hook-form'
import Skill from './Skill'

export interface ICreditRatingProps {}

export default function CreditRating(props: ICreditRatingProps) {
	const creditRating = useWatch({
		name: 'skills.Credit Rating',
	})
	const r = creditRating?.rating

	const note = (
		<div className='text-gray-500'>
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

	return <Skill name='Credit Rating' note={note} />
}
