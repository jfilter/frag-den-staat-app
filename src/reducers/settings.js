const initialState = {
  showOnboarding: true,
};

function settings(state = initialState, action) {
  switch (action.type) {
    case 'ONBOARDING_FINISHED':
      return { ...state, showOnboarding: false };
    default:
      return state;
  }
}

export default settings;
