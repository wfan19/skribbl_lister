export const CONNECTED = 'socket/connected';
export const DISCONNECTED = 'socket/disconnected';
export const CONNECT_SOCKET = 'socket/connect_socket';
export const DISCONNECT_SOCKET = 'socket/disconnect_socket';
export const CONNECTION_CHANGED = 'socket/connection_changed';

// The socket's connection state change

export const connected = () => ({
  type: CONNECTED,
  connected: true,
});

export const disconnected = () => ({
  type: DISCONNECTED,
  connected: false,
});

export const connectSocket = () => ({
    type: CONNECT_SOCKET,
})

export const connectionChanged = (connected) => ({
    type: CONNECTION_CHANGED,
    connected: connected
})