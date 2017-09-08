const initialState = {
  publicBody: null,
  isPending: false,
  error: null,
};

function publicBodies(state = initialState, action) {
  switch (action.type) {
    case 'PUBLIC_BODIES_PENDING':
      return { ...state, isPending: true };
    case 'PUBLIC_BODIES_SUCCESS':
      return { ...state, isPending: false, publicBody: action.publicBody };
    case 'PUBLIC_BODIES_ERROR':
      return { ...state, isPending: false, error: action.error };
    default:
      return state;
  }
}

export default publicBodies;
