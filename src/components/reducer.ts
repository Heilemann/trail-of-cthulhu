import { TState, TReducerAction } from "../interfaces";

export default function Reducer(state: TState, action: TReducerAction) {
  switch (action.type) {
    case "LOAD":
      console.log("LOAD", action.payload);
      return {
        ...state,
        ...action.payload
      }

    case "UPDATE_DOCUMENT_VALUES":
      console.log("UPDATE_DOCUMENT_VALUES", action.payload);
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