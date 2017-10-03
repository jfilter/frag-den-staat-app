import { Icon, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import React from 'react';

import { foiRequestsFilterChange } from '../../actions/foiRequests';
import BlankContainer from '../../components/library/BlankContainer';
import I18n from '../../i18n';

class FoiRequestsFilterCategoryScreen extends React.Component {
  render() {
    return (
      <BlankContainer>
        <Text>{I18n.t('notYetImplemented')}</Text>
      </BlankContainer>
    );
  }
}

FoiRequestsFilterCategoryScreen.navigationOptions = {
  title: I18n.t('filter'),
  tabBarLabel: I18n.t('category'),
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
