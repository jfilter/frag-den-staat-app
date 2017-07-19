import publicBodyFile from '../data/public_bodies.json';

/**
 * Gets the public body string.
 *
 * @param      {<type>}  publicBody  The public body
 * @return     {string}  Printable string of the public body including the jurisdiction.
 */
function getPublicBodyString(publicBody) {
  if (!publicBody) return '';

  const startToSlice = '/api/v1/publicbody/'.length;
  const endSlice = publicBody.length - 1;
  const publicBodyId = publicBody.slice(startToSlice, endSlice);
  const publicBodyObject = publicBodyFile[publicBodyId];

  if (!publicBodyObject) return '';

  const publicBodyName = publicBodyObject.publicBodyName;
  const jurisdictionName = publicBodyObject.jurisdictionName;
  return `${publicBodyName} (${jurisdictionName})`;
}

export { getPublicBodyString };
