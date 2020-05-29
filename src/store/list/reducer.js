import {
  LIST_SELECTED,
  SELECT_LIST,
  SET_EDITING,
  ENTRY_ADDED,
  INPUT_EDITED,
  ENTRY_DELETED,
  NAME_CHANGED
} from './actions';

const INITIAL_STATE = {
  listSelected: {},
  editing: false,
  formInput: '',
  fetching: false,
};

const reducers = {
  [SELECT_LIST]: (state, action) => ({
    ...state,
    listSelected: {},
    fetching: true,
  }),
  [LIST_SELECTED]: (state, action) => ({
    ...state,
    editing: false,
    listSelected: action.list ? action.list : {},
    formInput: '',
    fetching: false,
  }),
  [SET_EDITING]: (state, action) => ({
    ...state,
    editing: action.editing,
    formInput: '',
  }),
  [INPUT_EDITED]: (state, action) => ({
    ...state,
    formInput: action.entry,
  }),
  [ENTRY_ADDED]: (state, action) => ({
    ...state,
    listSelected: {
      ...state.listSelected,
      entries: state.listSelected.entries.concat(action.entry),   
    },
  }),
  [ENTRY_DELETED]: (state, action) => ({
    ...state,
    listSelected: {
      ...state.listSelected,
      entries: state.listSelected.entries.filter((entry) => entry._id != action._id)
    }
  }),
  [NAME_CHANGED]: (state, action) => ({
    ...state,
    listSelected: {
      ...state.listSelected,
      name: action.name,
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
