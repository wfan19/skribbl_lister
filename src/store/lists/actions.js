export const UPDATE_LISTS = '/lists/lists_receieved';
export const CREATE_LIST = '/lists/create_list';
export const LIST_CREATED = '/lists/list_created';
export const DELETE_LIST = '/lists/delete_list';
export const LIST_DELETED = '/lists/list_deleted';

export const updateLists = (lists) => ({
  type: UPDATE_LISTS,
  lists,
});

export const createList = (options)=>  ({
  type: CREATE_LIST,
  options,
})

export const listCreated = (list) => ({
  type: LIST_CREATED,
  list,
});

export const deleteList = (_id) => ({
  type: DELETE_LIST,
  _id,
})

export const listDeleted = (_id) => ({
  type: LIST_DELETED,
  _id,
})