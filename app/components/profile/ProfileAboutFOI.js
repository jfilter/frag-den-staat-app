import { Text } from 'react-native';
import React from 'react';

import BlankContainer from '../library/BlankContainer';
import FloatingHeading from '../library/FloatingHeading';
import LinkGroup from '../library/LinkGroup';

const links = [
  {
    title: 'Bereichsausnahmen',
    url: 'https://fragdenstaat.de/hilfe/ifg/bereichsausnahmen/',
  },
  {
    title: 'Fristen & Ablehnungen',
    url: 'https://fragdenstaat.de/hilfe/ifg/fristen/',
  },
  {
    title: 'Gebühren',
    url: 'https://fragdenstaat.de/hilfe/ifg/gebuehren/',
  },
  {
    title: 'IFG, UIG, VIG',
    url: 'https://fragdenstaat.de/hilfe/ifg/ifg-uig-vig/',
  },
  {
    title: 'Widersprüche & Klagen',
    url: 'https://fragdenstaat.de/hilfe/ifg/klagen/',
  },
  {
    title: 'Bundesländer',
    url: 'https://fragdenstaat.de/hilfe/ifg/laender/',
  },
];

const ProfileAboutFOI = () => (
  <BlankContainer>
    <Text>
      {`Informationsfreiheit ist das Recht auf freien Zugang zu amtlichen Informationen. Sie ist eines der wichtigsten Grundrechte in der Wissensgesellschaft, das sich aus Artikel 5 des Grundgesetzes zur Meinungs- und Informationsfreiheit ergibt.

`}
      <FloatingHeading>Warum ist Informationsfreiheit wichtig?</FloatingHeading>
      {`

Weil der Zugang zu Wissen der Bevölkerung die Macht zum informierten und selbstbestimmten Handeln verleiht. Herrschaftswissen wird zu öffentlichem Wissen. Informationsfreiheit ist ein Mittel zur Kontrolle politischer Prozesse. Sie kann Korruption vorbeugen, erhöht die Transparenz und Rechenschaftspflicht von Politik und Verwaltung. Der freie Informationsfluss durch den Staat stärkt und belebt die Demokratie, weil er Partizipation möglich macht. Nur wer Einblick in das Zustandekommen kollektiv verbindlicher Entscheidungen hat, kann diese auch effektiv beeinflussen - vorausgesetzt, dass dazu passende demokratische Mittel bereitstehen.

Die Informationsfreiheit ist in Deutschland über verschiedene Auskunftsgesetze geregelt. Zentral ist dabei das revolutionäre Informationsfreiheitsgesetz (IFG), nach dem alle Menschen auf Bundesebene und in den meisten Bundesländern Auskünfte von deutschen Behörden und Einblick in staatlichen Dokumente verlangen können - und das ohne Angabe von Gründen. Damit ist, zumindest dem Gesetz nach, die Auskunft des Staates gegenüber seinen Bürgern zum Standard geworden, eine Nicht-Auskunft muss begründet werden.

Jährlich werden etwa 10.000 Anfragen an Bundesbehörden gesendet. Mehr als die Hälfte aller IFG-Anfragten in Deutschland werden über FragDenStaat gestellt.

`}
      <FloatingHeading>
        {`Mehr Informationen gibt's auf unserer Webseite`}
      </FloatingHeading>
      {`
        `}
    </Text>
    <LinkGroup links={links} />
  </BlankContainer>
);

ProfileAboutFOI.navigationOptions = {
  title: 'Über Informationsfreiheit',
};

export default ProfileAboutFOI;
