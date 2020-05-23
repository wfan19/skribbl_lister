// socket.io event names
module.exports = {
    CONNECTED: 'connected',
    DISCONNECTED: 'disconnected',
    CONNECT_ERR: 'connect_error',
    RECONNECT_ERR: 'reconnect_error',
    RECONNECT: 'reconnect',
    ERROR: 'error',

    UPDATE_LISTS: 'update_lists',
    CREATE_LIST: 'create_list',
    LIST_CREATED: 'list_created',
    DELETE_LIST: 'delete_list',
    LIST_DELETED: 'list_deleted',
    SELECT_LIST: 'select_list',
    LIST_SELECTED: 'list_selected',

    JOIN_LIST_ROOM: 'join_list_room',
    LEAVE_LIST_ROOM: 'leave_list_room',
    ADD_ENTRY: 'add_entry',
    ENTRY_ADDED: 'entry_added',
    DELETE_ENTRY: 'delete_entry',
    ENTRY_DELETED: 'entry_deleted',
    CHANGE_LIST_NAME: 'change_list_name',
    LIST_NAME_CHANGED: 'list_name_changed'
  };
  