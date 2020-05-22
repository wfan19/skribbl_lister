import {
  ADD_ENTRY,
  LIST_SELECTED,
  SELECT_LIST,
  SET_EDITING,
  ENTRY_ADDED,
  INPUT_EDITED,
} from './actions';

const INITIAL_STATE = {
  listSelectedId: null,
  listSelected: {},
  editing: false,
  formInput: '',
};

const reducers = {
  [SELECT_LIST]: (state, action) => ({
    ...state,
    listSelectedId: action._id,
    listSelected: {},
  }),
  [LIST_SELECTED]: (state, action) => ({
    ...state,
    editing: false,
    listSelectedId: action.list ? action.list._id : null,
    listSelected: action.list ? action.list : {},
    formInput: '',
  }),
  [SET_EDITING]: (state, action) => ({
    ...state,
    editing: action.editing,
    formInput: '',
  }),
  [ENTRY_ADDED]: (state, action) => ({
    ...state,
    listSelected: {
      ...state.listSelected,
      entries: state.listSelected.entries.concat(action.entry),   
    },
  }),
  [INPUT_EDITED]: (state, action) => ({
    ...state,
    formInput: action.entry,
  })
};

function listReducer(state = INITIAL_STATE, action) {
  if (reducers[action.type]) {
    return reducers[action.type](state, action);
  }
  return state;
}

export default listReducer;
