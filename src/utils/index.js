import statusFile from '../data/status.json';
import jurisdictionFile from '../data/jurisdiction.json';

const mapToRealStatus = (fakeStatus, fakeResolution) =>
  fakeStatus === 'resolved' ? fakeResolution : fakeStatus;

const needToAlter = [
  'successful',
  'partially_successful',
  'not_held',
  'refused',
  'user_withdrew_costs',
  'user_withdrew',
];

function mapToFakeStatus(realStatus) {
  if (needToAlter.indexOf(realStatus) !== -1) {
    return {
      status: 'resolved',
      resolution: realStatus,
    };
  }

  return {
    status: realStatus,
    resolution: null,
  };
}

const getItemById = id => x => x.id === id;

/**
 * Gets the printable status.
 *
 * @param      {string}  status      The status
 * @param      {string}  resolution  The resolution
 * @return     {Object}  The printable status.
 */
function getPrintableStatus(status, resolution) {
  const realStatus = mapToRealStatus(status, resolution);
  const statusItem = statusFile.find(getItemById(realStatus));
  const statusName = statusItem ? statusItem.name : 'undefined status';
  return { statusName, realStatus };
}

function shortenJurisdiction(jurisdiction) {
  switch (jurisdiction) {
    case 'Mecklenburg-Vorpommern':
      return 'Meck-Pomm';
    case 'Nordrhein-Westfalen':
      return 'NRW';
    case 'Baden-Württemberg':
      return 'Ba-Wü';
    case 'Europäische Union':
      return 'EU';
    default:
      return jurisdiction;
  }
}

// there are different ways how the jurisdiction gets delievered via the API
function jurisdictionNameFromUrl(url) {
  if (typeof url === 'string' || url instanceof String) {
    // an URL which indicates we need to get the jurisdiction via the JSON file
    let name = '';
    jurisdictionFile.forEach(x => {
      if (url.endsWith(x.resource_uri)) name = x.name;
    });
    return shortenJurisdiction(name);
  }
  // it's not an URL but the whole jurisdiciton object so we need .name
  return shortenJurisdiction(url.name);
}

function shortenLabel(label, filterFor) {
  if (filterFor === 'status') return label;
  if (filterFor === 'jurisdiction') return shortenJurisdiction(label);
  return label;
}

// remove 'overdue' and 'with costs' because it is not implemented yet.
function getFilterableStatus() {
  return statusFile.filter(
    x => !['overdue', 'publicbody_needed'].includes(x.id)
  );
}

// function

//     if (!switched) {
//       const label = shortenJurisdiction(
//         jurisdictionList.find(getItemById(id)).name
//       );

export {
  mapToRealStatus,
  mapToFakeStatus,
  getItemById,
  getPrintableStatus,
  getFilterableStatus,
  shortenJurisdiction,
  shortenLabel,
  jurisdictionNameFromUrl,
};
