import { TState, TReducerAction } from '../../interfaces'

export default function Reducer(state: TState, action: TReducerAction) {
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

		default:
			return state
	}
}
