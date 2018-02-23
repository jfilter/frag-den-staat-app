import { AsyncStorage, StatusBar, Text, View } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import React from 'react';
import I18n from '../../../i18n';

import Onboarding from 'react-native-onboarding-swiper';

import {
  primaryColor,
  primaryColorDark,
  primaryColorLight,
  secondaryColor,
} from '../../../globals/colors';

class Intro extends React.Component {
  continue = async () => {
    await AsyncStorage.setItem('@SKIP_INTRO', 'true');
    this.props.navigateToMain();
  };

  render() {
    const cta = (
      <View>
        <Text style={styles.text}>
          {`Sieh' dir die Anfragen von anderen Personen an oder erfahr' erst mehr über Informationsfreiheit in unserem kurzen Video.

          `}
          {/* {`Sieh' dir die Anfragen von anderen Personen an, erstell' eine eigene oder erfahr' erst mehr über Informationsfreiheit in unserem kurzen Video.

          `} */}
        </Text>
        <Button
          icon={{ name: 'play-circle-outline', color: secondaryColor }}
          title={'Video ansehen'}
          backgroundColor={'white'}
          borderRadius={30}
          containerViewStyle={{ borderRadius: 30 }}
          textStyle={{ color: secondaryColor }}
          onPress={() => {
            this.props.navigateToIntroVideo();
            StatusBar.setBarStyle('default');
          }}
        />
      </View>
    );

    const pageArray = [
      {
        title: 'Hey!',
        subtitle: 'Willkommen zu FragDenStaat.',
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
        backgroundColor: primaryColorDark,
        image: (
          <Icon
            name="file-text-o"
            type="font-awesome"
            size={50}
            color="white"
          />
        ),
      },
      // {
      //   title: '1. Schritt',
      //   subtitle:
      //     "Stell' eine Anfrage. Wir leiten diese an die zuständige Behörde weiter.",
      //   backgroundColor: primaryColorLight,
      //   image: (
      //     <Icon
      //       name="paper-plane-o"
      //       type="font-awesome"
      //       size={50}
      //       color="white"
      //     />
      //   ),
      // },
      // {
      //   title: '2. Schritt',
      //   subtitle:
      //     'Du erhälst eine Benachrichtigung, sobald die Behörde auf deine Anfrage reagiert.',
      //   backgroundColor: primaryColor,
      //   image: (
      //     <Icon name="bell-o" type="font-awesome" size={50} color="white" />
      //   ),
      // },
      // {
      //   title: '3. Schritt',
      //   subtitle:
      //     'Die Antwort wird für dich und auch für andere öffentlich einsehbar.',
      //   backgroundColor: primaryColorDark,
      //   image: (
      //     <Icon name="globe" type="font-awesome" size={50} color="white" />
      //   ),
      // },
      {
        title: "Los Geht's!",
        subtitle: cta,
        backgroundColor: secondaryColor,
        image: (
          <Icon name="user-o" type="font-awesome" size={50} color="white" />
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
      />
    );
  }
}

const styles = {
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
  },
};

export default Intro;
