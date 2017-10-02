import { Icon, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import React from 'react';

import { foiRequestsFilterChange } from '../../actions/foiRequests';
import BlankContainer from '../../components/library/BlankContainer';

class FoiRequestsFilterCategoryScreen extends React.Component {
  render() {
    return (
      <BlankContainer>
        <Text>
          Not yet implemented. This featuer will be included in future versions.
        </Text>
      </BlankContainer>
    );
  }
}

FoiRequestsFilterCategoryScreen.navigationOptions = {
  title: 'Filter',
  tabBarLabel: 'Category',
  tabBarIcon: ({ tintColor }) => (
    <Icon
      name="format-list-bulleted-type"
      type="material-community"
      color={tintColor}
    />
  ),
};

const mapDispatchToProps = dispatch => {
  return {
    changeFilter: filter => dispatch(foiRequestsFilterChange(filter)),
  };
};

export default connect(null, mapDispatchToProps)(
  FoiRequestsFilterCategoryScreen
);
