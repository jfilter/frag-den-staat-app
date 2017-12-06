import { fetchMultipleAndDispatch } from '../utils/networking';

function messagePendingAction() {
  return {
    type: 'MESSAGE_PENDING',
  };
}

function messageSuccessAction(messages) {
  return {
    type: 'MESSAGE_SUCCESS',
    messages,
  };
}

function messageErrorAction(error) {
  return {
    type: 'MESSAGE_ERROR',
    error,
  };
}

function fetchMessages(messageUrls) {
  return dispatch => {
    const onSuccess = (innerDispatch => data =>
      innerDispatch(messageSuccessAction(data)))(dispatch);

    fetchMultipleAndDispatch(
      messageUrls,
      dispatch,
      messagePendingAction,
      onSuccess,
      messageErrorAction
    );
  };
}

export { fetchMessages };
