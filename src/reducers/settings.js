const initialState = {
  onboardingFinished: false,
  hasNotificationPermission: false,
};

function settings(state = initialState, action) {
  switch (action.type) {
    case 'ONBOARDING_FINISHED':
      return { ...state, onboardingFinished: true };
    case 'UPDATE_NOTIFICATION_PERMISSION':
      return {
        ...state,
        hasNotificationPermission: action.hasNotificationPermission,
      };
    default:
      return state;
  }
}

export default settings;
