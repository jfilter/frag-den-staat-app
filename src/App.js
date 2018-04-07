import { Provider } from 'react-redux';
import { View } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';

import { AppWithNavigationState } from './navigators/ReduxNavigation';
import { errorAlert, successAlert } from './utils/dropDownAlert';
import configureStore from './configureStore';

const { store, persistor } = configureStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={{ width: '100%', height: '100%' }}>
            <AppWithNavigationState />
            <DropdownAlert
              ref={ref => errorAlert.setDropDown(ref)}
              closeInterval={0}
            />
            <DropdownAlert ref={ref => successAlert.setDropDown(ref)} />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
