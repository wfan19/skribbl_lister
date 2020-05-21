export const SELECT_LIST = `list/select_list`;
export const LIST_SELECTED = 'list/list_selected';
export const SET_EDITING = 'list/set_editing';
export const ADD_WORD = 'list/add_word';
export const WORD_ADDED = 'list/word_added';

export const selectList = (_id) => ({
  type: SELECT_LIST,
  _id,
})

export const listSelected = (list) => ({
  type: LIST_SELECTED,
  list,
});

export const setEditing = (list, editing) => ({
  type: SET_EDITING,
  list,
  editing,
})

export const addWord = (word) => ({
  type: ADD_WORD,
  word,
});

export const wordAdded = (word) => ({
  type: WORD_ADDED,
  word,
})
