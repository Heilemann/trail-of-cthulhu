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