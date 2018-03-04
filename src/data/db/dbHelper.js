import Realm from 'realm';

import { PastQuerySchema } from './models';

const realm = new Realm({ schema: [PastQuerySchema] });

const insertPastQuery = query => {
  realm.write(() => {
    realm.create('PastQuery', {
      query,
      createdAt: new Date(),
    });
  });
};

const getPastQueries = () =>
  realm.objects('PastQuery').sorted('createdAt', true);

export { insertPastQuery, getPastQueries };
