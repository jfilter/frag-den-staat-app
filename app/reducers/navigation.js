import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../navigators/AppNavigator';

const initialNavState = AppNavigator.router.getStateForAction(
  NavigationActions.navigate({ routeName: 'Requests' })
);

function navigation(state = initialNavState, action) {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
}

export default navigation;
