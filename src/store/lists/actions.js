export const UPDATE_LISTS = '/lists/lists_receieved';

export const updateLists = (lists) => ({
    type: UPDATE_LISTS,
    lists,
});