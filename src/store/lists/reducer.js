import {
  UPDATE_LISTS,
  LIST_CREATED,
  LIST_DELETED,
} from './actions'

const INITIAL_STATE = {
   lists: [],
}

const reducer = {
  [UPDATE_LISTS]: (state, action) => ({
    ...state,
    lists: action.lists,
  }),
  [LIST_CREATED]: (state, action) => ({
    ...state,
    lists: [...state.lists, action.list],
  }),
  [LIST_DELETED]: (state, action) => ({
    ...state,
    lists: state.lists.filter((list) => list._id !== action._id)
  }),
}

function listsReducer(state = INITIAL_STATE, action) {
  if (reducer[action.type]) {
    return reducer[action.type](state, action);
  }
  return state;
}

export default listsReducer;
