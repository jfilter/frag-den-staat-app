import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import AppReducer from './reducers';
import AppWithNavigationState from './navigators/AppNavigator';

// TODO: retrieve state from persistent storage for e.g. auth
const initialState = {};

class App extends React.Component {
  loggerMiddleware = createLogger();
  store = createStore(
    AppReducer,
    initialState,
    applyMiddleware(thunkMiddleware, this.loggerMiddleware)
  );

  render() {
    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default App;
