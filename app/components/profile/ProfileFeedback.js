import { AsyncStorage, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
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
    const inApp = value && value === 'true';
    this.setState({ inApp });
  }

  toggleSwitch = () => {
    AsyncStorage.setItem(
      '@inAppBugReportingEnabled',
      (!this.state.inApp).toString()
    ).then(() => this.setState({ inApp: !this.state.inApp }));
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
      </BlankContainer>
    );
  }
}

ProfileFeedback.navigationOptions = {
  title: 'Feedback',
};

export default ProfileFeedback;
