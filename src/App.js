import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import React from 'react';
import thunkMiddleware from 'redux-thunk';

import DropdownAlert from 'react-native-dropdownalert';

import { errorAlert, successAlert } from './utils/dropDownAlert';

import AppReducer from './reducers';
import {
  AppWithNavigationState,
  navMiddleware,
} from './navigators/ReduxNavigation';

// TODO: retrieve state from persistent storage for e.g. auth
const initialState = {};

let middleware = [thunkMiddleware, navMiddleware];
if (__DEV__) {
  middleware = [...middleware, createLogger()];
}

class App extends React.Component {
  store = createStore(AppReducer, initialState, applyMiddleware(...middleware));

  render() {
    return (
      <Provider store={this.store}>
        <View style={{ width: '100%', height: '100%' }}>
          <AppWithNavigationState />
          <DropdownAlert
            ref={ref => errorAlert.setDropDown(ref)}
            closeInterval={0}
          />
          <DropdownAlert ref={ref => successAlert.setDropDown(ref)} />
        </View>
      </Provider>
    );
  }
}

export default App;
