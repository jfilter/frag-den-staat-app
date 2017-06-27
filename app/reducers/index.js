import { combineReducers } from 'redux';
import { AppNavigator } from '../navigators/AppNavigator';

import foiaRequests from './foiaRequests';

const firstAction = AppNavigator.router.getActionForPathAndParams('Requests');
const initialNavState = AppNavigator.router.getStateForAction(firstAction);

function nav(state = initialNavState, action) {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
}

const initialAuthState = { isLoggedIn: false };

function auth(state = initialAuthState, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isLoggedIn: true };
    case 'LOGOUT':
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}

const AppReducer = combineReducers({
  nav,
  auth,
  foiaRequests,
});

export default AppReducer;
