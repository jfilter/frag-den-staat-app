import { ORIGIN, PUBLIC_BODY_PATH } from '../globals';
import { fetchAndDispatch } from '../utils/networking';

function publicBodiesPendingAction() {
  return {
    type: 'PUBLIC_BODIES_PENDING',
  };
}

function publicBodiesSuccessAction(publicBody) {
  return {
    type: 'PUBLIC_BODIES_SUCCESS',
    publicBody,
  };
}

function publicBodiesErrorAction(error) {
  return {
    type: 'PUBLIC_BODIES_ERROR',
    error,
  };
}

function fetchPublicBody(publicBodyId) {
  return dispatch => {
    const buildUrl = () => `${ORIGIN}${PUBLIC_BODY_PATH}${publicBodyId}`;

    const onSuccess = (innerDispatch => data =>
      innerDispatch(publicBodiesSuccessAction(data)))(dispatch);

    fetchAndDispatch(
      buildUrl,
      dispatch,
      publicBodiesPendingAction,
      onSuccess,
      publicBodiesErrorAction
    );
  };
}

export { fetchPublicBody };
