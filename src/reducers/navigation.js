import AppNavigator from '../navigators/AppNavigator';

// const initialNavState = AppNavigator.router.getStateForAction(
//   NavigationActions.navigate({ routeName: 'Requests' })
// );

const initialState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams('Requests')
);

function navigation(state = initialState, action) {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
}

export default navigation;
