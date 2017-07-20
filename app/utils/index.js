import statusFile from '../data/status.json';

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
    default:
      return jurisdiction;
  }
}

export {
  mapToRealStatus,
  mapToFakeStatus,
  getItemById,
  getPrintableStatus,
  shortenJurisdiction,
};
