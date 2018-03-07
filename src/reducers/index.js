import { combineReducers } from 'redux';

import authentication from './authentication';
import foiRequests from './foiRequests';
import navigation from './navigation';
import publicBodies from './publicBodies';
import search from './search';
import singleFoiRequest from './singleFoiRequest';

const AppReducer = combineReducers({
  navigation,
  authentication,
  foiRequests,
  search,
  publicBodies,
  singleFoiRequest,
});

export default AppReducer;
