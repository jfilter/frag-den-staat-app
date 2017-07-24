import { Icon, ListItem } from 'react-native-elements';
import {
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableHighlight,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import React from 'react';

import { styles } from './styles';
import AuthButton from './AuthButton';

const ProfileStartScreen = ({
  navigateToAboutApp,
  navigateToAboutFOI,
  navigateToFAQ,
  navigateToContact,
  navigateToDataUsePolicy,
  navigateToFeedback,
  navigateToAcknowledgements,
}) => {
  return (
    <ScrollView style={styles.container}>
      <Text>Account</Text>
      <AuthButton />
      <Text>Information</Text>
      <ListItem
        containerStyle={[styles.listItemContainer, styles.firstItemContainer]}
        title="Über Frag Den Staat"
        leftIcon={{ name: 'info' }}
        onPress={navigateToAboutApp}
      />
      <ListItem
        containerStyle={styles.listItemContainer}
        title="Über Informationsfreiheit"
        leftIcon={{ name: 'info' }}
        onPress={navigateToAboutFOI}
      />
      <ListItem
        containerStyle={styles.listItemContainer}
        title="Fragen und Antworten"
        leftIcon={{ name: 'question-answer' }}
        onPress={navigateToFAQ}
      />
      <Text>Bla</Text>
      <ListItem
        containerStyle={[styles.listItemContainer, styles.firstItemContainer]}
        title="Kontakt und Impressum"
        leftIcon={{ name: 'mail' }}
        onPress={navigateToContact}
      />
      <ListItem
        containerStyle={styles.listItemContainer}
        title="Datenschutzerklärung"
        leftIcon={{ name: 'scale-balance', type: 'material-community' }}
        onPress={navigateToDataUsePolicy}
      />
      <ListItem
        containerStyle={styles.listItemContainer}
        title="Feedback"
        leftIcon={{ name: 'feedback' }}
        onPress={navigateToFeedback}
      />
      <ListItem
        containerStyle={styles.listItemContainer}
        title="Rate this App"
        leftIcon={{ name: 'star' }}
        hideChevron
      />
      <ListItem
        containerStyle={styles.listItemContainer}
        title="Acknowledgements"
        leftIcon={{ name: 'copyright' }}
        onPress={navigateToFeedback}
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
  title: 'Profile, Information & More',
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    navigateToAboutApp: () =>
      dispatch(NavigationActions.navigate({ routeName: 'ProfileAboutApp' })),
    navigateToAboutFOI: () =>
      dispatch(NavigationActions.navigate({ routeName: 'ProfileAboutFOI' })),
    navigateToContact: () =>
      dispatch(NavigationActions.navigate({ routeName: 'ProfileContact' })),
    navigateToDataUsePolicy: () =>
      dispatch(
        NavigationActions.navigate({ routeName: 'ProfileDataUsePolicy' })
      ),
    navigateToFAQ: () =>
      dispatch(NavigationActions.navigate({ routeName: 'ProfileFAQ' })),
    navigateToFeedback: () =>
      dispatch(NavigationActions.navigate({ routeName: 'ProfileFeedback' })),
    navigateToAcknowledgements: () =>
      dispatch(
        NavigationActions.navigate({ routeName: 'ProfileAcknowledgements' })
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileStartScreen);
