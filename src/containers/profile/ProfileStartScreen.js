import { Linking, Platform } from 'react-native';
import { ListItem } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import React from 'react';
import * as StoreReview from 'react-native-store-review';

import { clearCache } from '../../utils/networking';
import { clearToken } from '../../utils/secureStorage';
import { greyDark } from '../../globals/colors';
import { oauthLogout } from '../../actions/authentication';
import { styles } from './styles';
import BlankContainer from '../../components/library/BlankContainer';
import I18n from '../../i18n';
import SectionHeading from '../../components/library/SectionHeading';

class ProfileStartScreen extends React.Component {
  componentDidUpdate() {
    // const { errorMessage } = this.props;
    // if (errorMessage !== null) {
    // this.dropdown.alertWithType('error', 'Error', errorMessage);
    // }
  }
  render() {
    const {
      navigateToAboutApp,
      navigateToAboutFOIMaster,
      navigateToFAQ,
      navigateToContact,
      navigateToDataUsePolicy,
      navigateToFeedback,
      navigateToAcknowledgements,
      navigateToIntroVideo,
      navigateToTermsOfUse,
      navigateToLoginScreen,
    } = this.props;
    return (
      <BlankContainer innerStyle={{ paddingHorizontal: 0 }}>
        <SectionHeading style={{ paddingTop: 0 }}>
          {this.props.firstName
            ? 'Welcome ' + this.props.firstName
            : I18n.t('account')}
        </SectionHeading>
        {this.props.isLoggedIn && (
          <ListItem
            containerStyle={[
              styles.listItemContainer,
              styles.firstItemContainer,
            ]}
            title="Logout"
            leftIcon={{
              color: greyDark,
              name: 'logout-variant',
              type: 'material-community',
            }}
            onPress={() => {
              this.props.logout();
              clearToken();
              clearCache();
            }}
          />
        )}
        {!this.props.isLoggedIn && (
          <ListItem
            containerStyle={[
              styles.listItemContainer,
              styles.firstItemContainer,
            ]}
            title="Login"
            leftIcon={{
              color: greyDark,
              name: 'login-variant',
              type: 'material-community',
            }}
            onPress={navigateToLoginScreen}
          />
        )}
        {!this.props.isLoggedIn && (
          <ListItem
            containerStyle={[styles.listItemContainer]}
            title="Register"
            leftIcon={{
              color: greyDark,
              name: 'account-plus',
              type: 'material-community',
            }}
            onPress={() =>
              Linking.openURL('https://fragdenstaat.de/account/login/')
            }
          />
        )}
        <SectionHeading>{I18n.t('information')}</SectionHeading>
        <ListItem
          containerStyle={[styles.listItemContainer, styles.firstItemContainer]}
          title={I18n.t('moreScreen.video')}
          leftIcon={{ color: greyDark, name: 'ondemand-video' }}
          onPress={navigateToIntroVideo}
        />
        <ListItem
          containerStyle={[styles.listItemContainer]}
          title={I18n.t('moreScreen.aboutFDS')}
          leftIcon={{ color: greyDark, name: 'info' }}
          onPress={navigateToAboutApp}
        />
        <ListItem
          containerStyle={styles.listItemContainer}
          title={I18n.t('moreScreen.aboutFOI')}
          leftIcon={{ color: greyDark, name: 'info' }}
          onPress={navigateToAboutFOIMaster}
        />
        <ListItem
          containerStyle={styles.listItemContainer}
          title={I18n.t('moreScreen.faq')}
          leftIcon={{ color: greyDark, name: 'question-answer' }}
          onPress={navigateToFAQ}
        />
        <SectionHeading>{I18n.t('miscellaneous')}</SectionHeading>
        <ListItem
          containerStyle={[styles.listItemContainer, styles.firstItemContainer]}
          title={I18n.t('moreScreen.contact')}
          leftIcon={{ color: greyDark, name: 'mail' }}
          onPress={navigateToContact}
        />
        <ListItem
          containerStyle={styles.listItemContainer}
          title={I18n.t('moreScreen.dataUse')}
          leftIcon={{
            color: greyDark,
            name: 'scale-balance',
            type: 'material-community',
          }}
          onPress={navigateToDataUsePolicy}
        />
        <ListItem
          containerStyle={styles.listItemContainer}
          title={I18n.t('moreScreen.tos')}
          leftIcon={{
            color: greyDark,
            name: 'scale-balance',
            type: 'material-community',
          }}
          onPress={navigateToTermsOfUse}
        />
        <ListItem
          containerStyle={styles.listItemContainer}
          title={I18n.t('moreScreen.acknowledgements')}
          leftIcon={{ color: greyDark, name: 'copyright' }}
          onPress={navigateToAcknowledgements}
        />
        <ListItem
          containerStyle={styles.listItemContainer}
          title={I18n.t('moreScreen.feedback')}
          leftIcon={{ color: greyDark, name: 'feedback' }}
          onPress={navigateToFeedback}
        />
        <ListItem
          containerStyle={styles.listItemContainer}
          title={I18n.t('moreScreen.rate')}
          leftIcon={{ color: greyDark, name: 'star' }}
          onPress={() => {
            if (Platform.OS === 'ios' && StoreReview.isAvailable) {
              StoreReview.requestReview();
            }
            if (Platform.OS === 'android') {
              Linking.openURL(
                'https://play.google.com/store/apps/details?id=de.fragdenstaat.app'
              );
            }
          }}
          rightIcon={{ color: greyDark, name: 'chevron-right', color: 'white' }} // chevronHide shitfs the label to the left
        />
        <SectionHeading>Links</SectionHeading>
        <ListItem
          containerStyle={[styles.listItemContainer, styles.firstItemContainer]}
          title={I18n.t('moreScreen.donate')}
          leftIcon={{ color: greyDark, name: 'euro-symbol' }}
          rightIcon={{ color: greyDark, name: 'link' }}
          onPress={() =>
            Linking.openURL('https://fragdenstaat.de/hilfe/spenden/')
          }
        />
        <ListItem
          containerStyle={styles.listItemContainer}
          title={I18n.t('moreScreen.blog')}
          leftIcon={{
            color: greyDark,
            name: 'library-books',
            type: 'material-community',
          }}
          rightIcon={{ color: greyDark, name: 'link' }}
          onPress={() => Linking.openURL('http://blog.fragdenstaat.de')}
        />
        <ListItem
          containerStyle={styles.listItemContainer}
          leftIcon={{ color: greyDark, name: 'mic' }}
          title={I18n.t('moreScreen.press')}
          rightIcon={{ color: greyDark, name: 'link' }}
          onPress={() =>
            Linking.openURL('https://fragdenstaat.de/hilfe/ueber/presse/')
          }
        />
        <ListItem
          containerStyle={styles.listItemContainer}
          leftIcon={{
            name: 'twitter-box',
            type: 'material-community',
            color: '#1DA1F2',
          }}
          title={I18n.t('moreScreen.followTwitter')}
          rightIcon={{ color: greyDark, name: 'link' }}
          onPress={() => Linking.openURL('https://twitter.com/fragdenstaat')}
        />
        <ListItem
          containerStyle={styles.listItemContainer}
          leftIcon={{
            name: 'facebook-box',
            type: 'material-community',
            color: '#3B5998',
          }}
          title={I18n.t('moreScreen.likeFacebook')}
          rightIcon={{ color: greyDark, name: 'link' }}
          onPress={() =>
            Linking.openURL('https://www.facebook.com/fragdenstaat.de/')
          }
        />
        {/* <DropdownAlert
          ref={ref => {
            this.dropdown = ref;
          }}
          onClose={() => this.props.clearError()}
        /> */}
      </BlankContainer>
    );
  }
}

ProfileStartScreen.navigationOptions = {
  title: I18n.t('more'),
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.authentication.refreshToken !== null,
    firstName: state.authentication.firstName,
  };
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
    navigateToLoginScreen: () =>
      dispatch(NavigationActions.navigate({ routeName: 'ProfileLogin' })),
    logout: () => dispatch(oauthLogout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileStartScreen);
