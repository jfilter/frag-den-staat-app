const initialState = {
  foiRequest: null,
  isPending: false,
  error: null,
};

function singleFoiRequest(state = initialState, action) {
  switch (action.type) {
    case 'SINGLE_FOI_REQUEST_PENDING':
      return { ...state, isPending: true };
    case 'SINGLE_FOI_REQUEST_SUCCESS':
      return {
        ...state,
        isPending: false,
        foiRequest: action.foiRequest,
      };
    case 'SINGLE_FOI_REQUEST_ERROR':
      return { ...state, isPending: false, error: action.error };
    default:
      return state;
  }
}

export default singleFoiRequest;
