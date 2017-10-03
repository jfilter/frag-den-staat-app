import { AsyncStorage } from 'react-native';
import AppIntro from 'react-native-app-intro';
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
        description: 'Willkommen zu FragDenStaat.',
        backgroundColor: primaryColor,
        fontColor: '#fff',
        level: 10,
      },
      {
        title: 'FragDenStaat?',
        description:
          'Jede Person hat das Recht auf Informationen. FragDenStaat hilft dir dein Recht wahrzunehmen.',
        backgroundColor: primaryColor,
        fontColor: '#fff',
        level: 10,
      },
      {
        title: 'Wie funktionert das?',
        description:
          "Frag' über diese Plattform Behörden in Deutschland nach Informationen und Dokumenten.",
        backgroundColor: secondaryColor,
        fontColor: '#fff',
        level: 10,
      },
      {
        title: '1. Schritt',
        description:
          "Stell' eine Anfrage. Wir leiten diese an die zuständige Behörde weiter.",
        backgroundColor: primaryColorLight,
        fontColor: '#fff',
        level: 10,
      },
      {
        title: '2. Schritt',
        description:
          'Du erhälst eine Benachrichtigung, sobald die Behörde auf deine Anfrage reagiert.',
        backgroundColor: primaryColor,
        fontColor: '#fff',
        level: 10,
      },
      {
        title: '3. Schritt',
        description:
          'Die Antwort wird für dich und auch für andere öffentlich einsehbar.',
        backgroundColor: primaryColorDark,
        fontColor: '#fff',
        level: 10,
      },
      {
        title: "Los Geht's!",
        description:
          "Sieh' dir die Anfragen von anderen Personen an, erstell' eine eigene oder erfahr' erst mehr über Informationsfreiheit!",
        backgroundColor: secondaryColor,
        fontColor: '#fff',
        level: 10,
      },
    ];
    return (
      <AppIntro
        customStyles={{ btnContainer: { flex: 1 } }}
        onDoneBtnClick={this.continue}
        onSkipBtnClick={this.continue}
        pageArray={pageArray}
      />
    );
  }
}

export default Intro;
