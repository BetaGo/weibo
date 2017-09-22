import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import entities from './entities';
import emotions from './emotions';
import session from './session';

export default combineReducers({
  routing: routerReducer,
  entities,
  emotions,
  session
});
