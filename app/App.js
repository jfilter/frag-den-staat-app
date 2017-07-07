import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import AppReducer from './reducers';
import AppWithNavigationState from './navigators/AppNavigator';

// TODO: retrieve state from persistent storage for e.g. auth
const initialState = {};

let middleware = [thunkMiddleware];
if (__DEV__) {
  middleware = [...middleware, createLogger()];
}

class App extends React.Component {
  store = createStore(AppReducer, initialState, applyMiddleware(...middleware));

  render() {
    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default App;
