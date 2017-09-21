import { Icon, ListItem } from 'react-native-elements';
import { Image, Linking, Platform, TouchableHighlight } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import React from 'react';
import * as StoreReview from 'react-native-store-review';

import { styles } from './styles';
import BlankContainer from '../../components/BlankContainer';
import SectionHeading from '../../components/text/SectionHeading';

const ProfileStartScreen = ({
  navigateToAboutApp,
  navigateToAboutFOIMaster,
  navigateToFAQ,
  navigateToContact,
  navigateToDataUsePolicy,
  navigateToFeedback,
  navigateToAcknowledgements,
  navigateToIntroVideo,
  navigateToTermsOfUse,
}) => {
  return (
    <BlankContainer innerStyle={{ paddingHorizontal: 0 }}>
      <SectionHeading style={{ paddingTop: 0 }}>Account</SectionHeading>
      <ListItem
        containerStyle={[styles.listItemContainer, styles.firstItemContainer]}
        title="Login"
        leftIcon={{ name: 'login-variant', type: 'material-community' }}
        onPress={() => console.log('login')}
      />
      <ListItem
        containerStyle={[styles.listItemContainer]}
        title="Register"
        leftIcon={{ name: 'account-plus', type: 'material-community' }}
        onPress={() => console.log('register')}
      />
      <SectionHeading>Information</SectionHeading>
      <ListItem
        containerStyle={[styles.listItemContainer, styles.firstItemContainer]}
        title="Einführungs-Video"
        leftIcon={{ name: 'ondemand-video' }}
        onPress={navigateToIntroVideo}
      />
      <ListItem
        containerStyle={[styles.listItemContainer]}
        title="Über Frag Den Staat"
        leftIcon={{ name: 'info' }}
        onPress={navigateToAboutApp}
      />
      <ListItem
        containerStyle={styles.listItemContainer}
        title="Über Informationsfreiheit"
        leftIcon={{ name: 'info' }}
        onPress={navigateToAboutFOIMaster}
      />
      <ListItem
        containerStyle={styles.listItemContainer}
        title="Fragen und Antworten"
        leftIcon={{ name: 'question-answer' }}
        onPress={navigateToFAQ}
      />
      <SectionHeading>Miscellaneous</SectionHeading>
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
        title="Nutzungsbedingungen"
        leftIcon={{ name: 'scale-balance', type: 'material-community' }}
        onPress={navigateToTermsOfUse}
      />
      <ListItem
        containerStyle={styles.listItemContainer}
        title="Acknowledgements"
        leftIcon={{ name: 'copyright' }}
        onPress={navigateToFeedback}
      />
      <ListItem
        containerStyle={styles.listItemContainer}
        title="Feedback und Fehlermeldungen"
        leftIcon={{ name: 'feedback' }}
        onPress={navigateToFeedback}
      />
      <ListItem
        containerStyle={styles.listItemContainer}
        title="Rate this App"
        leftIcon={{ name: 'star' }}
        onPress={() => {
          if (Platform.OS === 'ios' && StoreReview.isAvailable) {
            StoreReview.requestReview();
          }
          if (Platform.OS === 'android') {
            // TODO: Link to app in playstore
          }
        }}
        hideChevron
      />
      <SectionHeading>Links</SectionHeading>
      <ListItem
        containerStyle={[styles.listItemContainer, styles.firstItemContainer]}
        title="Tue etwas Gutes. Spende an uns!"
        leftIcon={{ name: 'euro-symbol' }}
        rightIcon={{ name: 'link' }}
        onPress={() =>
          Linking.openURL('https://fragdenstaat.de/hilfe/spenden/')}
      />
      <ListItem
        containerStyle={styles.listItemContainer}
        title="Aktuelles im Blog"
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
          source={require('../../../assets/logo/original_fds_logo_small.jpg')}
        />
      </TouchableHighlight>
    </BlankContainer>
  );
};

ProfileStartScreen.navigationOptions = {
  title: 'Profile & More',
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    navigateToAboutApp: () =>
      dispatch(NavigationActions.navigate({ routeName: 'ProfileAboutApp' })),
    navigateToIntroVideo: () =>
      dispatch(NavigationActions.navigate({ routeName: 'ProfileIntroVideo' })),
    navigateToAboutFOIMaster: () =>
      dispatch(NavigationActions.navigate({ routeName: 'ProfileAboutFOI' })),
    navigateToContact: () =>
      dispatch(NavigationActions.navigate({ routeName: 'ProfileContact' })),
    navigateToDataUsePolicy: () =>
      dispatch(
        NavigationActions.navigate({ routeName: 'ProfileDataUsePolicy' })
      ),
    navigateToTermsOfUse: () =>
      dispatch(NavigationActions.navigate({ routeName: 'ProfileTermsOfUse' })),
    navigateToFAQ: () =>
      dispatch(NavigationActions.navigate({ routeName: 'ProfileFAQMaster' })),
    navigateToFeedback: () =>
      dispatch(NavigationActions.navigate({ routeName: 'ProfileFeedback' })),
    navigateToAcknowledgements: () =>
      dispatch(
        NavigationActions.navigate({ routeName: 'ProfileAcknowledgements' })
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileStartScreen);
