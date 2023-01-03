import { TState, TReducerAction } from "../interfaces";

export default function Reducer(state: TState, action: TReducerAction) {
  console.log('Reducer:', action.type, action.payload);

  switch (action.type) {
    case "LOAD":
      return {
        ...state,
        ...action.payload
      }

    case "UPDATE_DOCUMENT_VALUES":
      return {
        ...state,
        documents: state.documents.map(document => {
          if (document._id === state.documentId) {
            return {
              ...document,
              values: {
                ...document.values,
                ...action.payload.values
              }
            }
          }
          return document;
        }),
        document: {
          ...state.document,
          values: {
            ...state.document.values,
            ...action.payload.values
          }
        }
      }

  }

  return state;
}