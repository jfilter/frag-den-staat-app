import { ORIGIN, FOI_REQUESTS_PATH } from '../globals';
import { fetchAndDispatch } from '../utils/networking';

function singleFoiRequestPendingAction() {
  return {
    type: 'SINGLE_FOI_REQUEST_PENDING',
  };
}

function singleFoiRequestSuccessAction(foiRequest) {
  return { type: 'SINGLE_FOI_REQUEST_SUCCESS', foiRequest };
}

function singleFoiRequestErrorAction(error) {
  return {
    type: 'SINGLE_FOI_REQUEST_ERROR',
    error,
  };
}

function fetchSingleFoiRequest(foiRequestId) {
  return dispatch => {
    const buildUrl = () => `${ORIGIN}${FOI_REQUESTS_PATH}${foiRequestId}`;

    const onSuccess = (innerDispatch => data =>
      innerDispatch(singleFoiRequestSuccessAction(data)))(dispatch);

    fetchAndDispatch(
      buildUrl,
      dispatch,
      singleFoiRequestPendingAction,
      onSuccess,
      singleFoiRequestErrorAction
    );
  };
}

export { fetchSingleFoiRequest };
