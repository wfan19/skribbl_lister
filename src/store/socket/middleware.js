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
  updateLists
} from '../lists/actions';

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
        store.dispatch()
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
