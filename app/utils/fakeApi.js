import publicBodyFile from '../data/public_bodies.json';
import lawFile from '../data/laws.json';

/**
 * Gets the public body string.
 *
 * @param      {string}  publicBody  The public body path
 * @return     {Object}  Object with printable strings of the public body and the jurisdiction.
 */
function getPublicBodyNameAndJurisdiction(publicBody) {
  if (!publicBody) return '';

  const startToSlice = '/api/v1/publicbody/'.length;
  const endSlice = publicBody.length - 1;
  const publicBodyId = publicBody.slice(startToSlice, endSlice);
  const publicBodyObject = publicBodyFile[publicBodyId];

  if (!publicBodyObject) return '';

  const publicBodyName = publicBodyObject.publicBodyName;
  const jurisdictionName = publicBodyObject.jurisdictionName;
  return { publicBodyName, jurisdictionName, publicBodyId };
}

/**
 * Gets the law name and url.
 *
 * @param      {string}  law     The law
 * @return     {Object}  The name and url of the law.
 */
function getLawNameAndUrl(law) {
  const lawObject = lawFile.find(x => x.resource_uri === law);

  if (!lawObject) return null;

  const { name, site_url } = lawObject;
  return { name, site_url };
}

export { getPublicBodyNameAndJurisdiction, getLawNameAndUrl };
