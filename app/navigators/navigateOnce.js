// hotfix to prevent navigating mutiple times on fast taps
// https://github.com/react-community/react-navigation/issues/271#issuecomment-303217976
import { NavigationActions } from 'react-navigation';

export default getStateForAction => (action, state) => {
  const { type, routeName } = action;
  return state &&
  type === NavigationActions.NAVIGATE &&
  routeName === state.routes[state.routes.length - 1].routeName
    ? state
    : getStateForAction(action, state);
};
