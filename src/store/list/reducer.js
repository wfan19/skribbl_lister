import {
  ADD_WORD,
  LIST_SELECTED,
  SELECT_LIST,
  SET_EDITING,
} from './actions';

const INITIAL_STATE = {
  words: [],
  listSelectedId: null,
  listSelected: {},
  editing: false,
};

const reducers = {
  [ADD_WORD]: (state, action) => ({
    ...state,
    words: state.words.concat(action.word),
  }),
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
  })
};

function listReducer(state = INITIAL_STATE, action) {
  if (reducers[action.type]) {
    return reducers[action.type](state, action);
  }
  return state;
}

export default listReducer;
