import { Button } from 'react-native-elements';
import { Linking, View, Text } from 'react-native';
import React from 'react';

import { primaryColor } from '../../globals/colors';

export default [
  {
    q: 'Was kann ich anfragen?',
    a: (
      <View>
        <Text
        >{`Prinzipiell sind alle Informationen unabhängig von ihrem Speichermedium per anfragbar. Darunter fallen neben normalen Papier- und elektronischen Akten auch Videos von Polizeieinsätzen, Datenbankabzüge, Geschäftsverteilungspläne, unter Umständen Terminkalender von Politikern, Spesenabrechnungen, Korrespondenzen zwischen Lobbyisten und Politikern sowie interner Briefverkehr von Behörden zu einem Vorgang.
          `}</Text>
        <Button
          backgroundColor={primaryColor}
          title="Weitere Ideen"
          onPress={() =>
            Linking.openURL(
              'http://www.michael-hoerz.de/informationsfreiheit-fragen-ideen'
            )}
        />
      </View>
    ),
  },
  {
    q: 'Wen kann ich anfragen?',
    a: `Zur Auskunft verpflichtet sind grundsätzlich alle Stellen, die Aufgaben der öffentlichen Verwaltung wahrnehmen, also Bundes-, Landes- und Kommunalbehörden. Außerdem zur Auskunft verpflichtet sind Ministerien, Ämter, Parlamente (im Bereich der Verwaltung), Gerichte (im Bereich der Verwaltung), öffentliche Unternehmen, Handels- und Berufskammern, Krankenkassen und Schulen. Auch Stellen wie Unternehmen der Daseinsfürsorge, öffentlich-rechtliche Rundfunkanstalten (im Bereich der Verwaltung), Jobcenter, Museen oder Krankenhäuser fallen unter die Auskunftspflicht. In der Regel zählen auch Hochschulen dazu. Allerdings gibt es regionale Unterschiede: In Bayern, Sachsen, Niedersachsen und Hessen gibt es noch keine Informationsfreiheitsgesetze. Mehr dazu finden Sie hier.

    Nach den Informationsfreiheitsgesetzen sind Behörden verpflichtet, auf Ihren Antrag auf Informationszugang zu antworten. Die Antwort wird entweder die gewünschten Informationen umfassen oder einen rechtlich gültigen Grund nennen, warum kein Zugang zu den Informationen gewährt werden kann. Eine dritte Antwortmöglichkeit wäre, dass der Behörde die angefragten Informationen nicht vorliegen.

    NutzerInnen können in sieben Tagen 15 Nachrichten schreiben, pro fünf Minuten zwei Anfragen. Die Begrenzung kann nach Nachricht an die Webmaster aufgehoben werden.`,
  },
  {
    q: 'Was muss ich bei der Formulierung meiner Anfrage beachten?',
    a: `
Kurze, konzentrierte Nachrichten machen es Behörden leichter, herauszufinden, welche Informationen Sie wünschen. Das bedeutet im Gegenzug, dass Sie schneller eine Antwort erhalten. Bitte schließen Sie daher in Ihre Anfrage nur das Nötigste ein, so dass der beantwortenden Person schnell klar ist, welche Informationen Sie wünschen. Sie müssen Ihre Anfrage generell auch nicht begründen oder Argumente für den Zweck Ihrer Anfrage anführen. Bitte verzichten Sie in Ihrer Anfrage außerdem auf Aussagen, die andere herabwürdigen oder beleidigen könnten. In diesem Fall löschen wir Ihre Anfrage und Ihren Account.

Sollten Sie Informationen benötigen, um damit öffentlich zu argumentieren oder eine Kampagne anzutreiben, ist die Informationsfreiheit ein mächtiges Werkzeug. Auch wenn Sie diese Seite nicht direkt verwenden können, um Ihre Kampagne zu betreiben, möchten wir Sie dazu ermutigen, mit Hilfe dieser Seite die benötigten Informationen anzufragen. Wir ermutigen Sie zudem, Ihre Kampagne an einem anderen Ort zu betreiben - ein sehr wirksames und einfaches Mittel ist ein eigenes Weblog. Sie dürfen uns gerne auf Ihrer Kampagne verlinken, indem Sie Ihrer Anfrage eine Anmerkung hinzufügen (Sie können Anmerkungen machen, nachdem Sie Ihre Anfrage abgeschickt haben).`,
  },
  {
    q: 'Wie schnell bekomme ich eine Antwort?',
    a: `Generell muss die zuständige Behörde dem Antragsteller die Informationen “unverzüglich” zugänglich machen. In der Regel sollen die Informationen spätestens innerhalb eines Monats zugänglich gemacht werden. Wenn der Aufwand besonders groß ist, muss die Behörde den/die AntragstellerIn innerhalb eines Monats nach Eingang des Antrags darüber informieren, dass die Frist überschritten wird. Dies gilt auch für Drittbeteiligungen - also Verfahren, bei denen z.B. Unternehmen gefragt werden, ob Daten von ihnen herausgegeben werden dürfen.

Sie werden von FragDenStaat.de.de per E-Mail benachrichtigt, wenn Sie keine rechtzeitige Antwort erhalten haben. Sie können der Behörde dann eine Nachricht schicken, um sie an Ihren Antrag zu erinnern, und sie auch darauf hinweisen, inwiefern sie gegen das IFG verstößt.`,
  },
  {
    q: 'Was passiert, falls ich keine Antwort erhalte?',
    a: `Es kommt vor, dass eine Behörde eine Anfrage einfach nicht erhalten hat. Sollten Sie nach Ablauf der Frist keine Antwort erhalten haben, lohnt es sich auf jeden Fall, bei der Behörde anzurufen und freundlich nachzufragen, ob die Anfrage angekommen ist.

Falls die Anfrage nicht angekommen ist, liegt das meistens an “Spam-Filtern”. Setzen Sie sich mit der Behörde in Verbindung und bitten Sie sie, dass E-Mails, die von Adressen @fragdenstaat.de verschickt wurden, auf die Positivliste (“Whitelist”) gesetzt werden. Wenden Sie sich bitte zudem an uns: bei Bedarf verschicken wir jede generierte IFG-Anfrage erneut.

Sollten Sie trotz Ihrer Bemühungen noch keinen Erfolg gehabt haben, können Sie um eine interne Nachforschung bitten und sich anschließend bei den Beauftragten für Informationsfreiheit um Vermittlung bitten. Dies ist ebenfalls direkt in der Verwaltung der Anfrage über FragDenStaat möglich. Die Beauftragten können zwar nicht direkt in das Verfahren eingreifen, können aber in vielen Fällen die Behörden davon überzeugen, dass es sinnvoll ist, Informationen herauszugeben.`,
  },
  {
    q:
      'Wie sieht es mit der Weiterverwendbarkeit der erhaltenen Informationen aus?',
    a:
      'Nach dem Informationsweiterverwendungsgesetz dürfen Sie die erhaltenen Daten weiterverwenden. Eine Ausnahme bilden hier vermutlich in der Regel Dokumente, an denen Dritte das Urheberrecht halten. Dazu gehören etwa Gutachten von Dritten.',
  },
  {
    q: 'Wie kann ich den Antragstext anpassen?',
    a:
      'Das können Sie tun, indem Sie bei der Antragsstellung die Checkbox "Vorlage anpassen" anklicken. Es empfiehlt sich, den Textvorschlag der jeweiligen Anfrage anzupassen.',
  },
  {
    q: 'Kann ich über FragDenStaat.de Informationen zu mir selbst anfragen?',
    a: `Nein. Hiervon raten wir ab, denn Anfragen, die mit Hilfe von FragDenStaat.de gemacht werden, sind öffentlich und unter dem Informationsfreiheitsgesetz erhoben. Das Gesetz sieht nicht vor, dass Zugang zu Informationen über ein Individuum gewährt wird.

Falls Sie feststellen, dass jemand persönliche Informationen in eine Anfrage eingearbeitet hat – auch unabsichtlich – setzen Sie sich bitte unverzüglich mit uns in Verbindung, damit wir diese Informationen entfernen können.`,
  },
  {
    q: 'Ich finde die öffentliche Stelle nicht, die ich anfragen möchte',
    a:
      'Dann kontaktieren Sie uns bitte unter info@fragdenstaat.de und geben Namen, Mail-Adresse sowie Bundesland an, ggf. auch die Postadresse.',
  },
  {
    q:
      'Kann ich meine Anfrage geheim halten – zumindest, bis ich meine Geschichte veröffentlicht habe?',
    a:
      'FragDenStaat.de ist generell für öffentliche Anfragen ausgelegt. Allerdings können Sie Ihre Anfrage auch nicht-öffentlich stellen und erst zu einem späteren Zeitpunkt öffentlich schalten. Dazu müssen Sie im Anfrage-Formular den Haken bei dem Feld "Diese Anfrage ist öffentlich" abwählen.',
  },
  {
    q: 'Wie moderieren Sie Anmerkungen (Kommentare) zu den Fragen?',
    a:
      'Kommentare auf FragDenStaat.de sollen NutzerInnen dabei helfen, die gewünschten Informationen zu erhalten bzw. ihnen Hinweise zu geben, an wen sie sich wenden können, um weiterzukommen. Wir behalten uns das Recht vor, andersartige Kommentare zu löschen. Endlose und politische Diskussionen sind nicht erlaubt. Bitte verweisen Sie ggf. in ihrem Kommentar auf ein geeignetes externes Forum oder eine geeignete externe Kampagnenseite.',
  },
  {
    q: 'Pseudonyme Nutzung',
    a:
      'FragDenStaat.de kann mit einer beliebigen E-Mailadresse und einem Pseudonym als Namen genutzt werden. Dabei dürfen Sie aber nicht wissentlich Daten einer anderen Person benutzen. Eine Postadresse muss nicht zwingend angegeben werden. Allerdings lässt sich von Behörden bei falschem Namen und falscher bzw. keiner angegebenen Adresse keine Post empfangen. Wir bieten auch die Möglichkeit, Anfragen nach außen hin anonym zu stellen.',
  },
  {
    q: 'Wer bekommt meine E-Mailadresse zu sehen?',
    a:
      'Wir werden Ihre E-Mail-Adresse an niemanden weitergeben, außer wir werden dazu von einem Richter oder gesetzlich verpflichtet oder Sie fordern uns dazu ausdrücklich auf. Selbst die Behörde bekommt Ihre E-Mailadresse nicht zusehen. Sie wird nur eine Adresse von FragDenStaat.de zu sehen bekommen, die spezifisch für Ihre Anfrage ist.',
  },
  {
    q: 'Werden Sie Spam-Nachrichten an meine E-Mail-Adresse schicken?',
    a:
      'Nein! Nach dem Anmelden bei FragDenStaat.de werden wir Ihnen ausschließlich E-Mails schicken, a) die mit einer Ihrer Anfragen zu tun haben, b) mit E-Mail-Benachrichtigungen, für die Sie sich ausdrücklich angemeldet haben oder c) für weitere Zwecke, für die Sie uns ausdrücklich beauftragt haben. Wir werden niemals Ihre E-Mail-Adresse an Dritte weitergeben oder verkaufen. Die einzige Ausnahme für die Weitergabe Ihrer E-Mail-Adresse sind Fälle, in denen wir per Gesetz dazu verpflichtet werden oder Sie uns ausdrücklich dazu auffordern.',
  },
  {
    q: 'Warum wird meine Anfrage öffentlich auf der Seite erscheinen?',
    a: `Wir veröffentlichen Ihre Anfrage im Internet, damit jede(r) sie lesen und die Informationen nutzen kann, die Sie gefunden haben. In der Regel löschen wir keine Anfragen.

Ihr Name ist mit der Anfrage verknüpft, so dass er in der Regel ebenfalls veröffentlicht wird. Das Verwenden Ihres echten Namens kann zudem anderen Personen helfen, mit Ihnen in Verbindung zu treten, um Sie bei Ihren Recherchen zu unterstützen oder Ihnen ggf. bei Ihrer Kampagne zu helfen.`,
  },
  {
    q: 'Kann ich auch anonym eine Anfrage stellen?',
    a:
      'Falls Sie wünschen, dass Ihr Name nicht auf der Website veröffentlicht wird, gibt es beim Stellen des Antrags die Möglichkeit – nach außen hin – anonym zu bleiben. Ihr Name erscheint dann nicht auf der Website, wird aber an die Behörde weitergegeben, da dies gesetzlich erforderlich ist, um eine gültige IFG-Anfrage zu stellen. Versuchen Sie bitte in keinem Fall, unter einem Namen einer anderen Person eine Anfrage zu stellen!',
  },
  {
    q: 'Muss ich der bearbeitenden Stelle meine physische Adresse nennen?',
    a: `Falls Sie eine Adresse angeben, wird sie auf keinen Fall auf FragDenStaat veröffentlicht. Sie müssen sie allerdings nur angeben, wenn etwa ein Gebührenbescheid oder ein ablehnender Bescheid versendet werden soll.

Sie haben grundsätzlich das Recht, die beantragten Informationen in der von Ihnen gewünschten Form zu erhalten (§1, Abs. 2 IFG). Sollten Sie elektronische Daten bevorzugen, dann bitten Sie in Ihrer Anfrage darum, die Informationen per E-Mail zugeschickt zu bekommen, wenn sie auch in elektronischer Form vorliegen.`,
  },
  {
    q: 'Können Sie meine Anfragen löschen oder meinen Namen ändern?',
    a: `Falls Sie eine Adresse angeben, wird sie auf keinen Fall auf FragDenStaat veröffentlicht. Sie müssen sie allerdings nur angeben, wenn etwa ein Gebührenbescheid oder ein ablehnender Bescheid versendet werden soll.
FragDenStaat.de ist ein dauerhaftes und öffentliches Archiv von Informationsfreiheitsanfragen. In der Regel köschen wir keine Anfragen. Unter besonderen Umständen entfernen wir Ihre Anfrage oder ändern Ihren Namen auf der Website. Dementsprechend entfernen wir auch weitere persönlichen Informationen.`,
  },
  {
    q: 'Können Sie persönliche Informationen über mich entfernen?',
    a: `Falls Sie irgendwo auf dieser Seite persönliche Informationen über sich entdecken, die Sie gerne löschen oder verbergen lassen würden, setzen Sie sich bitte mit uns in Verbindung (info@fragdenstaat.de). Führen Sie bitte genau auf, welche Information Sie als kritisch erachten und warum und wo genau auf der Seite sie erscheint.

Falls die kritische persönliche Information versehentlich veröffentlicht wurde, werden wir sie normalerweise löschen. In der Regel berücksichtigen wir ausschließlich Lösch-Anfragen von den jeweils betroffenen Personen, aber bei sensiblen Informationen sind wir dankbar für jeden Hinweis.`,
  },
];
