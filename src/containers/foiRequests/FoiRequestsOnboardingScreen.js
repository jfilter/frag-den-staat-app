import { Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import Onboarding from 'react-native-onboarding-swiper';
import React from 'react';

import { onboardingFinishedAction } from '../../actions/settings';
import {
  primaryColor,
  primaryColorDark,
  secondaryColor,
} from '../../globals/colors';
import I18n from '../../i18n';
import PromoVideo from '../../components/foiRequests/PromoVideo';

const styles = {
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
  },
};

class FoiRequestsOnboardingScreen extends React.Component {
  state = {
    scrollEnabled: true,
  };

  continue = () => {
    this.props.onboardingFinished();
    this.props.navigateToMain();
  };

  render() {
    const cta = (
      <View style={{ width: '97%' }}>
        <Text style={styles.text}>
          {`Sieh' dir die Anfragen von anderen Personen an oder erfahr' erst mehr über Informationsfreiheit in unserem kurzen Video.





          `}
        </Text>
      </View>
    );

    const pageArray = [
      {
        title: 'Hey!',
        subtitle: 'Willkommen zu FragDenStaat.\n\n',
        backgroundColor: primaryColorDark,
        image: (
          <Icon
            name="hand-peace-o"
            type="font-awesome"
            size={50}
            color="white"
          />
        ),
      },
      {
        title: 'FragDenStaat?',
        subtitle:
          'Jede Person hat das Recht auf Informationen. FragDenStaat hilft dir dein Recht wahrzunehmen.',
        backgroundColor: primaryColor,
        image: <Icon name="info" type="font-awesome" size={50} color="white" />,
      },
      {
        title: 'Wie funktionert das?',
        subtitle:
          "Frag' über diese Plattform Behörden in Deutschland nach Informationen und Dokumenten.",
        backgroundColor: secondaryColor,
        image: (
          <Icon
            name="file-text-o"
            type="font-awesome"
            size={50}
            color="white"
          />
        ),
      },
      {
        title: "Los Geht's!",
        subtitle: cta,
        backgroundColor: primaryColorDark,
        imageContainerStyles: { paddingBottom: 30 },
        image: (
          <View style={{ width: '98%' }}>
            <PromoVideo
              togglePlay={() =>
                this.setState({ scrollEnabled: !this.state.scrollEnabled })
              }
            />
          </View>
        ),
      },
    ];
    return (
      <Onboarding
        onSkip={this.continue}
        onDone={this.continue}
        pages={pageArray}
        skipLabel={I18n.t('skipShort')}
        nextLabel={I18n.t('next')}
        flatlistProps={{ ...this.state }}
      />
    );
  }
}

FoiRequestsOnboardingScreen.navigationOptions = {
  header: null,
  tabBarVisible: false,
  drawerLockMode: 'locked-closed', // disable global drawer
};

const mapDispatchToProps = dispatch => {
  return {
    navigateToMain: () => dispatch(NavigationActions.back()),
    onboardingFinished: () => dispatch(onboardingFinishedAction()),
  };
};

export default connect(null, mapDispatchToProps)(FoiRequestsOnboardingScreen);
