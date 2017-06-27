import { AppNavigator } from '../navigators/AppNavigator';

const firstAction = AppNavigator.router.getActionForPathAndParams('Requests');
const initialNavState = AppNavigator.router.getStateForAction(firstAction);

function navigation(state = initialNavState, action) {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
}

export default navigation;
