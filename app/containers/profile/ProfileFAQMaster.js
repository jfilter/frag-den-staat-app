import { Button, ListItem } from 'react-native-elements';
import { FlatList, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import React from 'react';

import { primaryColor } from '../../globals/colors';
import { renderSeparator } from '../../components/ListRenderer';
import data from './FAQ';

const ProfileFAQMaster = ({ navigateToAboutFOIDetails, navigateToContact }) => (
  <FlatList
    data={data}
    style={{ backgroundColor: 'white' }}
    ItemSeparatorComponent={() => renderSeparator()}
    ListHeaderComponent={
      <View style={{ padding: 10 }}>
        <Text>Wir haben die Antworten für deine Fragen. Wenn nicht:</Text>
        <Button
          title="Kontaktiere uns!"
          style={{ margin: 10 }}
          backgroundColor={primaryColor}
          onPress={() => navigateToContact()}
        />
      </View>
    }
    renderItem={({ item, index: id }) => (
      <ListItem
        leftIcon={{
          type: 'material-community',
          name: 'comment-question-outline',
        }}
        titleNumberOfLines={100}
        title={item.q}
        onPress={() => navigateToAboutFOIDetails({ id })}
        containerStyle={{
          borderBottomWidth: 0,
        }}
      />
    )}
  />
);

ProfileFAQMaster.navigationOptions = {
  title: 'Fragen & Antworten',
};

const mapDispatchToProps = dispatch => {
  return {
    navigateToContact: () =>
      dispatch(NavigationActions.navigate({ routeName: 'ProfileContact' })),
    navigateToAboutFOIDetails: params =>
      dispatch(
        NavigationActions.navigate({ routeName: 'ProfileFAQDetails', params })
      ),
  };
};

export default connect(null, mapDispatchToProps)(ProfileFAQMaster);
