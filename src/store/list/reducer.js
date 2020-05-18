import { ADD_WORD } from './actions';

const INITIAL_STATE = {
  words: [],
};

const reducers = {
  [ADD_WORD]: (state, action) => ({ ...state, words: state.words.concat(action.word) }),
};

function listReducer(state = INITIAL_STATE, action) {
  if (reducers[action.type]) {
    return reducers[action.type](state, action);
  }
  return state;
}

export default listReducer;
