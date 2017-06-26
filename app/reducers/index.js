import { combineReducers } from 'redux';

import { AppNavigator } from '../navigators/AppNavigator';

// const nav = (state, action) => AppNavigator.router.getStateForAction(action, state);

// // Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('Requests');
const initialNavState = AppNavigator.router.getStateForAction(firstAction);

function nav(state = initialNavState, action) {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
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
});

export default AppReducer;
