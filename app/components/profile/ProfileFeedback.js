import { AsyncStorage, Platform, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import Instabug from 'instabug-reactnative';
import React from 'react';

import BlankContainer from '../library/BlankContainer';
import I18n from '../../i18n';
import LinkGroup from '../library/LinkGroup';

const links = [
  {
    title: 'Github',
    url: 'https://github.com/jfilter/frag-den-staat-app',
  },
  {
    title: 'hi@jfilter.de',
    url: 'mailto:hi@jfilter.de?subject=Frag-Den-Staat-App-Anfrage',
  },
];

class ProfileFeedback extends React.Component {
  constructor() {
    super();
    this.state = { inApp: true };
  }

  async componentWillMount() {
    const value = await AsyncStorage.getItem('@inAppBugReportingEnabled');
    const inApp = value === null || value === 'true';
    this.setState({ inApp });
  }

  toggleSwitch = () => {
    const newSetting = !this.state.inApp;

    if (Platform.OS === 'android') {
      if (newSetting) {
        Instabug.setShakingThresholdForAndroid(250);
      } else {
        Instabug.setShakingThresholdForAndroid(10000);
      }
    }

    this.setState({ inApp: newSetting });
    // even though we cannot be sure that the writing to AsyncStorage will be successful, we assume so.
    AsyncStorage.setItem('@inAppBugReportingEnabled', newSetting.toString());
  };

  render() {
    return (
      <BlankContainer>
        <Text>
          {`Wir arbeiten stets daran die App zu verbessern, um gemeinsam für Informationsfreiheit zu kämpfen. Aber dafür brauchen wir dich. Du hast ein Fehler gefunden oder weißt, was wir noch besser machen können? Kontaktiere uns!

Damit es für dich noch einfacher ist, kannst du ohne Probleme Fehler gleich in der App melden. Einfach das Gerät schütteln und du kannst gleich ein Screenshot von dem Problem an uns senden.

Für allgemeine Anregunen kannst entweder im Github eine Issue eröffnen oder den (ehrenamtlichen) App-Entwickler Johannes Filter direkt unter hi@jfilter.de erreichen.
`}
        </Text>
        <LinkGroup links={links} />
        <ListItem
          title={I18n.t('moreScreen.inAppReporting')}
          switchButton
          hideChevron
          switched={this.state.inApp}
          onSwitch={this.toggleSwitch}
          containerStyle={{ borderBottomWidth: 0, marginTop: 10 }}
        />
        <Text>{Platform.OS === 'ios' && I18n.t('moreScreen.restartApp')}</Text>
      </BlankContainer>
    );
  }
}

ProfileFeedback.navigationOptions = {
  title: 'Feedback',
};

export default ProfileFeedback;
