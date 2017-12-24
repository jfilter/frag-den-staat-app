import { Platform, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import React from 'react';

import BlankContainer from '../library/BlankContainer';
import I18n from '../../i18n';
import LinkGroup from '../library/LinkGroup';

const links = [
  {
    title: 'Github',
    url: 'https://github.com/jfilter/frag-den-staat-app/issues,
  },
  {
    title: 'hi@jfilter.de',
    url: 'mailto:hi@jfilter.de?subject=[FragDenStaatApp]',
  },
];

class ProfileFeedback extends React.Component {
  render() {
    return (
      <BlankContainer>
        <Text>
          {`Wir arbeiten stets daran die App zu verbessern, um gemeinsam für Informationsfreiheit zu kämpfen. Aber dafür brauchen wir dich. Du hast ein Fehler gefunden oder weißt, was wir noch besser machen können? Kontaktiere uns!

Du kannst entweder im Github eine Issue eröffnen oder dem App-Entwickler Johannes Filter eine Email schicken.
`}
        </Text>
        <LinkGroup links={links} />
      </BlankContainer>
    );
  }
}

ProfileFeedback.navigationOptions = {
  title: 'Feedback',
};

export default ProfileFeedback;
