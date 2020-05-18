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

function listReducer(state = INITIAL_STATE, action) {
  if (reducer[action.type]) {
    reducer[action.type](state, action);
  }
  return state;
}

export default listReducer;
