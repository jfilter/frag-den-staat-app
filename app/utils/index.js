function mapToRealStatus(fakeStatus, fakeResolution) {
  if (fakeStatus === 'resolved') {
    return fakeResolution;
  }
  return fakeStatus;
}

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

export { mapToRealStatus, mapToFakeStatus };
