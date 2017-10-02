import { Text } from 'react-native';
import React from 'react';

import BlankContainer from '../library/BlankContainer';
import FloatingHeading from '../library/FloatingHeading';

const ProfileAboutApp = () => (
  <BlankContainer>
    <Text>
      {`FragDenStaat ist ein Projekt der Open Knowledge Foundation Deutschland e.V., mit dem jeder Mensch unabhängig von Alter oder Herkunft Anfragen nach den deutschen Informationsgesetzen stellen kann. Fragen und Antworten werden transparent auf dieser Seite dokumentiert.

Ziel ist es:

– die Frage nach einer Behördenauskunft für alle Menschen zu erleichtern;
– sowohl die Anfragen der BürgerInnen als auch die Antworten der Behörden transparent zu dokumentieren;
– eine Kultur der Informationsfreiheit in Deutschland zu etablieren und die zugrunde liegende Gesetze zu stärken.

`}
      <FloatingHeading>Wozu dient FragDenStaat?</FloatingHeading>
      {`

FragDenStaat möchte Sie dabei unterstützen, auf amtliche Informationen von deutschen Behörden zuzugreifen. Hierfür veröffentlicht FragDenStaat Anfragen nach den Informationsgesetzen des Bundes und der Bundesländer gemeinsam mit den Antworten der Behörden.

FragDenStaat erleichtert es NutzerInnen, sich mit eigenen Informationsanfragen an die Behörden zu wenden: Anfragen können einfach über ein Web-Formular gestellt werden. Die Anfrage wird dann von FragDenStaat per E-Mail an die entsprechende Behörde gesendet und gleichzeitig online veröffentlicht. Auch die anschließende Antwort der Behörde wird auf FragDenStaat öffentlich einsehbar gemacht.

Durch die Veröffentlichung der Antworten wird FragDenStaat zu einer Sammelstelle für amtliche Informationen. Außerdem dient die Veröffentlichung des Frage- und Antworthergangs dazu, die Antwortpraxis der Behörden transparent kontrollieren zu können. Das hilft letztlich auch den Behörden: Sie müssen ähnliche Anfragen nämlich nicht mehrfach beantworten, da Informationen bereits über FragDenStaat abrufbar sind.

Das Portal soll auch für investigative JournalistInnen und Nichtregierungsorganisationen nützlich sein: Anfragen können nicht-öffentlich gestellt und erst zu einem späteren Zeitpunkt veröffentlicht werden. Dadurch wird die exklusive Nutzung von Informationen gewahrt. Gleichzeitig kann die Webseite als Quelle angegeben werden.

`}
      <FloatingHeading>Warum sollte ich FragDenStaat nutzen?</FloatingHeading>

      {`

Die zugrunde liegende Idee: Wir als BürgerInnen haben das Recht, unsere Regierung zu kontrollieren. Durch die Veröffentlichung von Informationen auf FragDenStaat können sich mehr Menschen in den demokratischen Prozess einbringen und die Rechenschaftspflicht von Politik und Verwaltung wird erhöht.
`}
    </Text>
  </BlankContainer>
);
ProfileAboutApp.navigationOptions = {
  title: 'Über FragDenStaat',
};

export default ProfileAboutApp;
