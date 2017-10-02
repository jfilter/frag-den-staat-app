import { ORIGIN } from '../globals';
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

const PATH = '/api/v1/publicbody/';

function fetchPublicBody(publicBodyId) {
  return dispatch => {
    const url = `${ORIGIN}${PATH}${publicBodyId}`;

    const onSuccess = (innerDispatch => data =>
      innerDispatch(publicBodiesSuccessAction(data)))(dispatch);

    fetchAndDispatch(
      url,
      dispatch,
      publicBodiesPendingAction,
      onSuccess,
      publicBodiesErrorAction
    );
  };
}

export { fetchPublicBody };
