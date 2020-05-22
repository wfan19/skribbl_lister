export const SELECT_LIST = `list/select_list`;
export const LIST_SELECTED = 'list/list_selected';
export const SET_EDITING = 'list/set_editing';
export const ADD_ENTRY = 'list/add_entry';
export const ENTRY_ADDED = 'list/entry_added';
export const INPUT_EDITED = 'list/input_edited';

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

export const addEntry = (entry) => ({
  type: ADD_ENTRY,
  entry,
});

export const entryAdded = (entry) => ({
  type: ENTRY_ADDED,
  entry,
})

export const inputEdited = (entry) => ({
  type: INPUT_EDITED,
  entry,
})
