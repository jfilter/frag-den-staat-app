import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import AuthButton from './AuthButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const ProfileMainScreen = () =>
  <View style={styles.container}>
    <AuthButton />
    <Text>Über FragDenStaat.de</Text>
    <Text>Kontakt und Impressum</Text>
    <Text>Feedback</Text>
  </View>;

ProfileMainScreen.navigationOptions = {
  title: 'Profile & More',
};

export default ProfileMainScreen;
