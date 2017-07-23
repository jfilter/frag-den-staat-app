import { Icon, ListItem } from 'react-native-elements';
import { ScrollView, Text } from 'react-native';
import React from 'react';

import { styles } from '../styles';
import AuthButton from '../AuthButton';

const ProfileStartScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text>Account</Text>
      <AuthButton />
      <Text>Information</Text>
      <ListItem title="Über Frag Den Staat" />
      <ListItem title="Über Informationsfreiheit" />
      <ListItem title="Fragen und Antworten" />
      <ListItem title="Kontakt und Impressum" />
      <ListItem title="Datenschutzerklärung" />
      <Text>Links</Text>
      <ListItem title="Spenden" />
      <ListItem title="Blog" />
      <ListItem title="Presse" />
      <ListItem title="Datenschutzerklärung" />
      <Icon name="twitter-box" type="material-community" />
      <Icon name="facebook-box" type="material-community" />
    </ScrollView>
  );
};

ProfileStartScreen.navigationOptions = {
  title: 'Profile & More',
};

export default ProfileStartScreen;
