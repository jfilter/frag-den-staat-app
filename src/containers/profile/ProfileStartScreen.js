import { Linking, Platform } from 'react-native';
import { ListItem } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import React from 'react';
import * as StoreReview from 'react-native-store-review';

import { clearError } from '../../actions/error';
import { requestAuthUrl } from '../../utils/oauth';
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
    } = this.props;
    return (
      <BlankContainer innerStyle={{ paddingHorizontal: 0 }}>
        <SectionHeading style={{ paddingTop: 0 }}>
          {I18n.t('account')}
        </SectionHeading>
        <ListItem
          containerStyle={[styles.listItemContainer, styles.firstItemContainer]}
          title="Login"
          leftIcon={{ name: 'login-variant', type: 'material-community' }}
          onPress={() => Linking.openURL(requestAuthUrl)}
        />
        <ListItem
          containerStyle={[styles.listItemContainer]}
          title="Register"
          leftIcon={{ name: 'account-plus', type: 'material-community' }}
          onPress={() =>
            Linking.openURL('https://fragdenstaat.de/account/login/')
          }
        />
        <SectionHeading>{I18n.t('information')}</SectionHeading>
        <ListItem
          containerStyle={[styles.listItemContainer, styles.firstItemContainer]}
          title={I18n.t('moreScreen.video')}
          leftIcon={{ name: 'ondemand-video' }}
          onPress={navigateToIntroVideo}
        />
        <ListItem
          containerStyle={[styles.listItemContainer]}
          title={I18n.t('moreScreen.aboutFDS')}
          leftIcon={{ name: 'info' }}
          onPress={navigateToAboutApp}
        />
        <ListItem
          containerStyle={styles.listItemContainer}
          title={I18n.t('moreScreen.aboutFOI')}
          leftIcon={{ name: 'info' }}
          onPress={navigateToAboutFOIMaster}
        />
        <ListItem
          containerStyle={styles.listItemContainer}
          title={I18n.t('moreScreen.faq')}
          leftIcon={{ name: 'question-answer' }}
          onPress={navigateToFAQ}
        />
        <SectionHeading>{I18n.t('miscellaneous')}</SectionHeading>
        <ListItem
          containerStyle={[styles.listItemContainer, styles.firstItemContainer]}
          title={I18n.t('moreScreen.contact')}
          leftIcon={{ name: 'mail' }}
          onPress={navigateToContact}
        />
        <ListItem
          containerStyle={styles.listItemContainer}
          title={I18n.t('moreScreen.dataUse')}
          leftIcon={{ name: 'scale-balance', type: 'material-community' }}
          onPress={navigateToDataUsePolicy}
        />
        <ListItem
          containerStyle={styles.listItemContainer}
          title={I18n.t('moreScreen.tos')}
          leftIcon={{ name: 'scale-balance', type: 'material-community' }}
          onPress={navigateToTermsOfUse}
        />
        <ListItem
          containerStyle={styles.listItemContainer}
          title={I18n.t('moreScreen.acknowledgements')}
          leftIcon={{ name: 'copyright' }}
          onPress={navigateToAcknowledgements}
        />
        <ListItem
          containerStyle={styles.listItemContainer}
          title={I18n.t('moreScreen.feedback')}
          leftIcon={{ name: 'feedback' }}
          onPress={navigateToFeedback}
        />
        <ListItem
          containerStyle={styles.listItemContainer}
          title={I18n.t('moreScreen.rate')}
          leftIcon={{ name: 'star' }}
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
          rightIcon={{ name: 'chevron-right', color: 'white' }} // chevronHide shitfs the label to the left
        />
        <SectionHeading>Links</SectionHeading>
        <ListItem
          containerStyle={[styles.listItemContainer, styles.firstItemContainer]}
          title={I18n.t('moreScreen.donate')}
          leftIcon={{ name: 'euro-symbol' }}
          rightIcon={{ name: 'link' }}
          onPress={() =>
            Linking.openURL('https://fragdenstaat.de/hilfe/spenden/')
          }
        />
        <ListItem
          containerStyle={styles.listItemContainer}
          title={I18n.t('moreScreen.blog')}
          leftIcon={{ name: 'library-books', type: 'material-community' }}
          rightIcon={{ name: 'link' }}
          onPress={() => Linking.openURL('http://blog.fragdenstaat.de')}
        />
        <ListItem
          containerStyle={styles.listItemContainer}
          leftIcon={{ name: 'mic' }}
          title={I18n.t('moreScreen.press')}
          rightIcon={{ name: 'link' }}
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
          rightIcon={{ name: 'link' }}
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
          rightIcon={{ name: 'link' }}
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
    // errorMessage: state.authentication.errorMessage,
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
    // clearError: () => dispatch(clearError),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileStartScreen);
