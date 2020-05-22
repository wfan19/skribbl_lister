import * as SocketMessage from '../../lib/MessageNames';
import Socket from './Socket';
import {
  CONNECT_SOCKET,
  DISCONNECT_SOCKET,
  connected,
  disconnected,
  connectionChanged
} from './actions';
import {
  CREATE_LIST,
  DELETE_LIST,
  updateLists,
  listCreated,
  listDeleted,
} from '../lists/actions';
import {
  SELECT_LIST,
  SET_EDITING,
  ADD_ENTRY,
  entryAdded,
  listSelected,
} from '../list/actions';

const socketMiddleware = (store) => {
  // The socket's connection state changed
  const onChange = (isConnected) => {
    store.dispatch(connectionChanged(isConnected));
  };

  const socket = new Socket({
    onChange,
    onConnected: () => {
      store.dispatch(connected());
    },
    onDisconnected: () => {
      store.dispatch(disconnected());
    },
    events: {
      [SocketMessage.UPDATE_LISTS]: (lists) => {
        store.dispatch(updateLists(lists));
      },
      [SocketMessage.LIST_CREATED]: (list) => {
        store.dispatch(listCreated(list));
      },
      [SocketMessage.LIST_DELETED]: (id) => {
        store.dispatch(listDeleted(id));
      },
      [SocketMessage.LIST_SELECTED]: (list) => {
        store.dispatch(listSelected(list));
      },
      [SocketMessage.ENTRY_ADDED]: (entry) => {
        store.dispatch(entryAdded(entry));
      }
    },
  });

  // catch attempt to join room here and then fetch socket event
  const reducer = {
    // no real point in this being here oper other places
    '@@router/LOCATION_CHANGE': ({ payload }) => {
      // TODO: improve
      if (payload.location.pathname === '/' || payload.location.pathname === '/profile') {
        // store.dispatch(leaveRoom());
      }
    },
    [CONNECT_SOCKET]: () => {
      socket.connect();
    },
    [DISCONNECT_SOCKET]: () => {
      socket.disconnect();
    },
    [CREATE_LIST]: (options) => {
      socket.emit(SocketMessage.CREATE_LIST, options.options);
    },
    [DELETE_LIST]: (id) => {
      socket.emit(SocketMessage.DELETE_LIST, id._id);
    },
    [SELECT_LIST]: (id) => {
      socket.emit(SocketMessage.SELECT_LIST, id._id);
    },
    [SET_EDITING]: (editing) => {
      if (editing.editing === true) {
        socket.emit(SocketMessage.JOIN_LIST_ROOM, editing.list._id);
      } else {
        socket.emit(SocketMessage.LEAVE_LIST_ROOM, editing.list._id);
      }
    },
    [ADD_ENTRY]: (entry) => {
      socket.emit(SocketMessage.ADD_ENTRY, entry.entry);
    }
  };

  // Return the handler that will be called for each action dispatched
  return (next) => (action) => {
    if (reducer[action.type]) {
      reducer[action.type](action);
    }
    next(action); // This is a middleware, we still need to call this!
  };
};

export default socketMiddleware;
