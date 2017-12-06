const initialState = {
  messages: [],
  isPending: false,
  error: null,
};

function messages(state = initialState, action) {
  switch (action.type) {
    case 'MESSAGE_PENDING':
      return { ...state, isPending: true, message: [] };
    case 'MESSAGE_SUCCESS':
      return {
        ...state,
        isPending: false,
        messages: action.messages,
      };
    case 'MESSAGE_ERROR':
      return { ...state, isPending: false, error: action.error };
    default:
      return state;
  }
}

export default messages;
