import { Icon, Text } from 'react-native-elements';
import { View } from 'react-native';
import { connect } from 'react-redux';
import React from 'react';

import { foiRequestsFilterChange } from '../../actions/foiRequests';
import { styles } from './styles';

class FoiRequestsFilterPublicBodyScreen extends React.Component {
  render() {
    return (
      <View style={styles.background}>
        <Text>Not yet implemented. Come back later. ;)</Text>
      </View>
    );
  }
}

FoiRequestsFilterPublicBodyScreen.navigationOptions = {
  title: 'Filter',
  tabBarLabel: 'Public Body',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="account-balance" color={tintColor} />
  ),
};

const mapDispatchToProps = dispatch => {
  return {
    changeFilter: filter => dispatch(foiRequestsFilterChange(filter)),
  };
};

export default connect(null, mapDispatchToProps)(
  FoiRequestsFilterPublicBodyScreen
);
