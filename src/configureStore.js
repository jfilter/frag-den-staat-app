import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import { navMiddleware } from './navigators/ReduxNavigation';
import authentication from './reducers/authentication';
import foiRequests from './reducers/foiRequests';
import navigation from './reducers/navigation';
import publicBodies from './reducers/publicBodies';
import search from './reducers/search';
import singleFoiRequest from './reducers/singleFoiRequest';
import settings from './reducers/settings';

const configAuthentication = {
  key: 'authentication',
  storage,
  whitelist: ['userId', 'firstName', 'lastName'],
};

const configSettings = {
  key: 'settings',
  storage,
};

const authenticationPersistedReducer = persistReducer(
  configAuthentication,
  authentication
);
const settingsPersistedReducer = persistReducer(configSettings, settings);

// only persist selected reducers
const rootReducer = combineReducers({
  authentication: authenticationPersistedReducer,
  settings: settingsPersistedReducer,
  navigation,
  foiRequests,
  search,
  publicBodies,
  singleFoiRequest,
});

const configureStore = () => {
  let middleware = [thunkMiddleware, navMiddleware];

  if (__DEV__) {
    middleware = [...middleware, createLogger()];
  }

  const store = createStore(rootReducer, applyMiddleware(...middleware));
  const persistor = persistStore(store);

  return { persistor, store };
};

export default configureStore;
