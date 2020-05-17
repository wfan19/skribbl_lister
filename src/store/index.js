import {
    createStore, compose, combineReducers, applyMiddleware,
} from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import listReducer from './list/reducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createBrowserHistory();

const rootReducer = combineReducers({
    router: connectRouter(history),
    list: listReducer,
    // socket: socketReducer,
});

const middlewares = [
    routerMiddleware(history),
    // socketMiddleware,
];

const middleware = applyMiddleware(...middlewares);

export const store = createStore(rootReducer, composeEnhancer(middleware));
