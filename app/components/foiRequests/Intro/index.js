import { AsyncStorage, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import Onboarding from 'react-native-simple-onboarding';
import React from 'react';

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
        title: '1. Schritt',
        subtitle:
          "Stell' eine Anfrage. Wir leiten diese an die zuständige Behörde weiter.",
        backgroundColor: primaryColorLight,
        image: (
          <Icon
            name="paper-plane-o"
            type="font-awesome"
            size={50}
            color="white"
          />
        ),
      },
      {
        title: '2. Schritt',
        subtitle:
          'Du erhälst eine Benachrichtigung, sobald die Behörde auf deine Anfrage reagiert.',
        backgroundColor: primaryColor,
        image: (
          <Icon name="bell-o" type="font-awesome" size={50} color="white" />
        ),
      },
      {
        title: '3. Schritt',
        subtitle:
          'Die Antwort wird für dich und auch für andere öffentlich einsehbar.',
        backgroundColor: primaryColorDark,
        image: (
          <Icon name="globe" type="font-awesome" size={50} color="white" />
        ),
      },
      {
        title: "Los Geht's!",
        subtitle:
          "Sieh' dir die Anfragen von anderen Personen an, erstell' eine eigene oder erfahr' erst mehr über Informationsfreiheit!",
        backgroundColor: secondaryColor,
        image: (
          <Icon name="user-o" type="font-awesome" size={50} color="white" />
        ),
      },
    ];
    return <Onboarding onEnd={this.continue} pages={pageArray} />;
  }
}

export default Intro;
