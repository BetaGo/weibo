import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import entities from './entities';

export default combineReducers({
  routing: routerReducer,
  entities
});
