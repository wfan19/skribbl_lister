import {
    createStore, compose, combineReducers, applyMiddleware,
} from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import socketReducer from './socket/reducer';
import listReducer from './list/reducer';
import listsReducer from './lists/reducer';

import socketMiddleware from './socket/middleware';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createBrowserHistory();

const rootReducer = combineReducers({
    router: connectRouter(history),
    socket: socketReducer,
    list: listReducer,
    lists: listsReducer,
});

const middlewares = [
    routerMiddleware(history),
    socketMiddleware,
];

const middleware = applyMiddleware(...middlewares);

export const store = createStore(rootReducer, composeEnhancer(middleware));
