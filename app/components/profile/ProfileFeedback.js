import { Button } from 'react-native-elements';
import { Linking, Text } from 'react-native';
import React from 'react';

import { primaryColor } from '../../globals/colors';
import BlankContainer from '../library/BlankContainer';

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

const ProfileFeedback = () => (
  <BlankContainer>
    <Text>
      {`Wir arbeiten stets daran die App zu verbessern, um gemeinsam für Informationsfreiheit zu kämpfen. Aber dafür brauchen wir dich. Du hast ein Fehler gefunden oder weißt, was wir noch besser machen können? Kontaktiere uns!

Damit es für dich noch einfacher ist, kannst du ohne Probleme Fehler gleich in der App melden. Einfach das Gerät schütteln und du kannst gleich ein Screenshot von dem Problem an uns senden.

Für allgemeine Anregunen kannst entweder im Github eine Issue eröffnen oder den (ehrenamtlichen) App-Entwickler Johannes Filter direkt unter hi@jfilter.de erreichen.
`}
    </Text>

    {links.map(({ title, url, icon }) => (
      <Button
        key={title}
        icon={icon}
        title={title}
        style={{ margin: 5 }}
        backgroundColor={primaryColor}
        onPress={() => {
          Linking.canOpenURL(url)
            .then(supported => {
              if (!supported) {
                console.log("Can't handle url: " + url);
              } else {
                return Linking.openURL(url);
              }
            })
            .catch(err => console.error('An error occurred', err));
        }}
      />
    ))}
  </BlankContainer>
);

ProfileFeedback.navigationOptions = {
  title: 'Feedback',
};

export default ProfileFeedback;
