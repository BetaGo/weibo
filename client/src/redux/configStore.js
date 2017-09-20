import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import ThunkMiddleware from 'redux-thunk';

import reducer from './modules/reducers';

export const history = createHistory();

const RouterMiddleware = routerMiddleware(history);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(RouterMiddleware, ThunkMiddleware))
);

export default store;
