const initialState = {
  onboardingFinished: false,
};

function settings(state = initialState, action) {
  switch (action.type) {
    case 'ONBOARDING_FINISHED':
      return { ...state, onboardingFinished: true };
    default:
      return state;
  }
}

export default settings;
