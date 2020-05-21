import {
  ADD_WORD,
  LIST_SELECTED,
  SELECT_LIST,
  SET_EDITING,
  WORD_ADDED,
} from './actions';

const INITIAL_STATE = {
  listSelectedId: null,
  listSelected: {},
  editing: false,
};

const reducers = {
  [SELECT_LIST]: (state, action) => ({
    ...state,
    listSelectedId: action._id,
    listSelected: {},
  }),
  [LIST_SELECTED]: (state, action) => ({
    ...state,
    listSelectedId: action.list? action.list._id : null,
    listSelected: action.list ? action.list : {},
  }),
  [SET_EDITING]: (state, action) => ({
    ...state,
    editing: action.editing,
  }),
  [WORD_ADDED]: (state, action) => ({
    ...state,
    listSelected: {
      ...state.listSelected,
      entries: state.listSelected.entries.concat(action.word),   
    },
  }),
};

function listReducer(state = INITIAL_STATE, action) {
  if (reducers[action.type]) {
    return reducers[action.type](state, action);
  }
  return state;
}

export default listReducer;
