export const UPDATE_LISTS = '/lists/lists_receieved';
export const LIST_CREATED = '/lists/list_created';
export const LIST_DELETED = '/lists/list_deleted';

export const updateLists = (lists) => ({
    type: UPDATE_LISTS,
    lists,
});

export const listCreated = (list) => ({
    type: LIST_CREATED,
    list,
});

export const listDeleted = (id) => ({
    type: LIST_DELETED,
    id,
})