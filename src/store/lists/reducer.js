import { UPDATE_LISTS } from './actions'

const UPDATE_LISTS = {
   lists: [],
}

const reducer = {
  [UPDATE_LISTS]: (state, action) => ({
    ...state,
    lists: action.lists,
  }),
}