import { Icon, ListItem } from 'react-native-elements';
import {
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableHighlight,
} from 'react-native';
import React from 'react';

import { styles } from './styles';
import AuthButton from './AuthButton';

const ProfileStartScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text>Account</Text>
      <AuthButton />
      <Text>Information</Text>
      <ListItem
        containerStyle={[styles.listItemContainer, styles.firstItemContainer]}
        title="Über Frag Den Staat"
        leftIcon={{ name: 'info' }}
      />
      <ListItem
        containerStyle={styles.listItemContainer}
        title="Über Informationsfreiheit"
        leftIcon={{ name: 'info' }}
      />
      <ListItem
        containerStyle={styles.listItemContainer}
        title="Fragen und Antworten"
        leftIcon={{ name: 'question-answer' }}
      />
      <Text>Bla</Text>
      <ListItem
        containerStyle={[styles.listItemContainer, styles.firstItemContainer]}
        title="Kontakt und Impressum"
        leftIcon={{ name: 'mail' }}
      />
      <ListItem
        containerStyle={styles.listItemContainer}
        title="Datenschutzerklärung"
        leftIcon={{ name: 'scale-balance', type: 'material-community' }}
      />
      <ListItem
        containerStyle={styles.listItemContainer}
        title="Feedback"
        leftIcon={{ name: 'feedback' }}
      />
      <ListItem
        containerStyle={styles.listItemContainer}
        title="Rate this App"
        leftIcon={{ name: 'star' }}
        hideChevron
      />
      <Text>Links</Text>
      <ListItem
        containerStyle={[styles.listItemContainer, styles.firstItemContainer]}
        title="Spenden"
        leftIcon={{ name: 'euro-symbol' }}
        rightIcon={{ name: 'link' }}
        onPress={() =>
          Linking.openURL('https://fragdenstaat.de/hilfe/spenden/')}
      />
      <ListItem
        containerStyle={styles.listItemContainer}
        title="Blog"
        leftIcon={{ name: 'library-books', type: 'material-community' }}
        rightIcon={{ name: 'link' }}
        onPress={() => Linking.openURL('http://blog.fragdenstaat.de')}
      />
      <ListItem
        containerStyle={styles.listItemContainer}
        leftIcon={{ name: 'mic' }}
        title="Presse"
        rightIcon={{ name: 'link' }}
        onPress={() =>
          Linking.openURL('https://fragdenstaat.de/hilfe/ueber/presse/')}
      />
      <Icon
        name="twitter-box"
        type="material-community"
        color="#1DA1F2"
        onPress={() => Linking.openURL('https://twitter.com/fragdenstaat')}
        size={50}
      />
      <Icon
        name="facebook-box"
        type="material-community"
        color="#3B5998"
        onPress={() =>
          Linking.openURL('https://www.facebook.com/fragdenstaat.de/')}
        size={50}
      />
      <TouchableHighlight
        style={{ alignSelf: 'center' }}
        onPress={() => Linking.openURL('https://fragdenstaat.de')}
      >
        <Image
          style={{ width: 50, height: 50 }}
          source={require('../../../assets/original_fds_logo_small.jpg')} // TODO: replace with new one?
        />
      </TouchableHighlight>
    </ScrollView>
  );
};

ProfileStartScreen.navigationOptions = {
  title: 'Profile & More',
};

export default ProfileStartScreen;
