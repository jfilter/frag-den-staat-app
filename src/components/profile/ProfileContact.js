import { Text } from 'react-native';
import React from 'react';

import { primaryColor } from '../../globals/colors';
import BlankContainer from '../library/BlankContainer';
import FloatingHeading from '../library/FloatingHeading';
import Heading from '../library/Heading';
import LinkGroup from '../library/LinkGroup';

const links = [
  {
    title: 'Twitter',
    url: 'https://twitter.com/fragdenstaat',
    icon: {
      name: 'twitter-box',
      type: 'material-community',
      color: primaryColor,
    },
  },
  {
    title: 'Facebook',
    url: 'https://www.facebook.com/fragdenstaat.de/',
    icon: {
      name: 'facebook-box',
      type: 'material-community',
      color: primaryColor,
    },
  },
  {
    title: 'info@fragdenstaat.de',
    url: 'mailto:info@fragdenstaat.de?subject=App-Anfrage',
  },
  {
    title: 'Öffentlicher Email-Verteiler',
    url: 'https://lists.okfn.org/mailman/listinfo/fragdenstaat',
  },
];

const ProfileContact = () => (
  <BlankContainer>
    <Heading>Kontakt</Heading>
    <Text>{`
        Du erreichst uns über verschiedene Kanäle.
        `}</Text>
    <LinkGroup links={links} />
    <Text>{`
      `}</Text>
    <Heading>Impressum</Heading>
    <Text>
      {`

Open Knowledge Foundation Deutschland e.V.
Singerstr. 109, 10179 Berlin
www.okfn.de
info@fragdenstaat.de

`}
      <Heading>Haftungausschluss</Heading>
      {`

`}
      <FloatingHeading>Haftung für Inhalte</FloatingHeading>
      {`

Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Als Diensteanbieter sind wir jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Zu diesen übermittelten fremden Informationen zählen insbesondere die durch unsere Nutzer gestellten Anfragen nach dem Informationsfreiheitsgesetz sowie die Antworten der jeweiligen Behörden. Die Verpflichtung zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.

`}
      <FloatingHeading>Haftung für Links</FloatingHeading>
      {`

Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.`}
    </Text>
  </BlankContainer>
);

ProfileContact.navigationOptions = {
  title: 'Kontakt & Impressum',
};

export default ProfileContact;
