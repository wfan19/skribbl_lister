import {
    CONNECTED,
    DISCONNECTED,
} from './actions';
  
const INITIAL_STATE = {
  connected: false,
  room: null,
  loginFailed: null,
};

const reducers = {
  [CONNECTED]: (state) => ({ ...state, connected: true }),
  [DISCONNECTED]: (state) => ({ ...state, connected: false }),
};

function socketReducer(state = INITIAL_STATE, action) {
  if (reducers[action.type]) {
      return reducers[action.type](state, action);
  }
  return state;
}

export default socketReducer;
