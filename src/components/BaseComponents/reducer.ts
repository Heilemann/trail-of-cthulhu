import { TReducerAction, TState } from '../../interfaces/interfaces'

const reducer = (state: TState, action: TReducerAction): TState => {
	switch (action.type) {
		case 'LOAD':
			return {
				...state,
				...action.payload,
			}

		case 'UPDATE_DOCUMENT_VALUES':
			if (!state.documentId) throw new Error('No documentId')

			const updatedDocument = {
				...state.documents.byId[state.documentId],
				values: {
					...state.documents.byId[state.documentId].values,
					...action.payload.values,
				},
			}

			return {
				...state,
				documents: {
					...state.documents,
					byId: {
						...state.documents.byId,
						[state.documentId]: updatedDocument,
					},
				},
				document: updatedDocument,
			}

		case 'TOGGLE_SHOW_ALL_SKILLS':
			return {
				...state,
				showAllSkills: !state.showAllSkills,
			}

		default:
			return state
	}
}

export default reducer
