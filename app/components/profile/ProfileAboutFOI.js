import { Button } from 'react-native-elements';
import { Linking, Text, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import React from 'react';

import { primaryColor } from '../../styles/colors';
import { styles } from './styles';
import BlankContainer from '../BlankContainer';
import FloatingHeading from '../text/FloatingHeading';

const SECTIONS = [
  {
    title: 'Informationsfreiheit',
    content: (
      <Text>
        {`Informationsfreiheit ist das Recht auf freien Zugang zu amtlichen Informationen. Sie ist eines der wichtigsten Grundrechte in der Wissensgesellschaft, das sich aus Artikel 5 des Grundgesetzes zur Meinungs- und Informationsfreiheit ergibt.

`}
        <FloatingHeading>
          Warum ist Informationsfreiheit wichtig?
        </FloatingHeading>
        {`

Weil der Zugang zu Wissen der Bevölkerung die Macht zum informierten und selbstbestimmten Handeln verleiht. Herrschaftswissen wird zu öffentlichem Wissen. Informationsfreiheit ist ein Mittel zur Kontrolle politischer Prozesse. Sie kann Korruption vorbeugen, erhöht die Transparenz und Rechenschaftspflicht von Politik und Verwaltung. Der freie Informationsfluss durch den Staat stärkt und belebt die Demokratie, weil er Partizipation möglich macht. Nur wer Einblick in das Zustandekommen kollektiv verbindlicher Entscheidungen hat, kann diese auch effektiv beeinflussen - vorausgesetzt, dass dazu passende demokratische Mittel bereitstehen.

Die Informationsfreiheit ist in Deutschland über verschiedene Auskunftsgesetze geregelt. Zentral ist dabei das revolutionäre Informationsfreiheitsgesetz (IFG), nach dem alle Menschen auf Bundesebene und in den meisten Bundesländern Auskünfte von deutschen Behörden und Einblick in staatlichen Dokumente verlangen können - und das ohne Angabe von Gründen. Damit ist, zumindest dem Gesetz nach, die Auskunft des Staates gegenüber seinen Bürgern zum Standard geworden, eine Nicht-Auskunft muss begründet werden.

Jährlich werden etwa 10.000 Anfragen an Bundesbehörden gesendet. Mehr als die Hälfte aller IFG-Anfragten in Deutschland werden über FragDenStaat gestellt.

`}
      </Text>
    ),
  },
  {
    title: 'Gebühren',
    content: (
      <Text
      >{`Einfache Anfragen an Behörden sind in der Regel kostenlos. Erfordern Anfragen eine außergewöhnlich hohe Bearbeitungszeit, können Behörden Gebühren verlangen. Auch Print-Kopien können in Rechnung gestellt werden. Die Gebühren unterscheiden sich je nach Bundesland (mehr zu den Ländern).

Für einen schnellen Überblick bitte hier klicken.

Manche Behörden neigen zu dem abschreckenden Hinweis, dass sie “möglicherweise” eine Gebühr für den Zugang zu Informationen verlangen könnten. Wir haben in dem Anfrageformular einen Textvorschlag gemacht, demzufolge die Behörde Sie informieren soll, wenn sie die Anfrage nicht für eine solche einfache Auskunft hält. Nach unserer Rechtsauffassung muss die Behörde sich daran halten. Wir können nicht dafür garantieren, dass die Behörde ihr Ermessen in diesem Zusammenhang pflichtgemäß ausübt.

Allerdings können wir gemeinsam mit unserem Partner Wikimedia Gebühren für manche Anfragen übernehmen. Wie das funktioniert, steht hier.`}</Text>
    ),
  },
  {
    title: 'Bereichsausnahme',
    content: (
      <View>
        <Text
        >{`Betriebs- und Geschäftsgeheimnisse, Geheimdienst, Laufende Gerichtsverfahren, Bedrogun der inneren Sicherheit und Datenschutz sind vom IFG ausgeschlossen. Darüber hinaus sind einzelne öffentliche Einrichtungen sind Bundes- und Landesebene vom Informationszugang ausgeschlossen.`}</Text>
        <Button
          title={'Mehr Dazu'}
          backgroundColor={primaryColor}
          onPress={() =>
            Linking.openURL(
              'https://fragdenstaat.de/hilfe/ifg/bereichsausnahmen/'
            )}
        />
      </View>
    ),
  },
  {
    title: 'Fristen & Ablehnungen',
    content: (
      <Text>
        {`

  Nach den Informationsfreiheitsgesetzen ist eine Behörde verpflichtet, einen Antrag auf Informationszugang “unverzüglich” zu beantworten. Die Information soll dem Antragsteller laut Gesetz spätestens innerhalb eines Monats zugänglich gemacht werden, wobei diese “Soll-Vorschrift” gleichzeitig bedeutet, dass es keine Sanktionsmöglichkeit bei Überschreitung der Frist gibt. Verzögert sich die Informationsgewährung und die Frist wird überschritten, etwa weil die beantragten Informationen besonders umfangreich sind, so muss die Behörde dies begründen und dem Antragsteller innerhalb der Frist eine Sachstandsmitteilung als Zwischennachricht übersenden.

Zwar ist dies nicht möglich, wenn gemäß § 4 IFG ein behördlicher Entscheidungsprozess noch nicht abgeschlossen ist. Entscheidungsgrundlagen im Prozess, also beispielsweise Gutachten und Zeugenbefragungen, sollten allerdings schon vorher zugänglich sein.

Im Fall der Beteiligung Dritter kann die Frist von einem Monat jedoch überschritten werden. In solchen Einzelfällen kann die angefragte Behörde nach § 8 IFG einen schriftlichen Antrag oder eine Konkretisierung des Antrags verlangen, etwa um die Identität des Antragstellers festzustellen oder eine Begründung für das Informationsersuchen zu erhalten. Dies wird erforderlich, wenn Belange Dritter betroffen sind, d.h. personenbezogene Daten, Urheberrechte oder Betriebs- und Geschäftsgeheimnisse. In diesem Fall gibt die Behörde dem Dritten schriftlich Gelegenheit zur Stellungnahme innerhalb eines Monats und entscheidet nach Eingang der Antwort über den Informationszugang. Dazu gehört jedoch nicht die Einschaltung von Datenschutzbeauftragten, für die keine Frist gilt.

Aus datenschutzrechtlichen Gründen sollte die Behörde den Antragsteller jedoch zunächst fragen, ob er einer Schwärzung oder Abtrennung der Daten des Dritten zustimmt. Nach § 7 IFG kann sich der Antragsteller mit einer Unkenntlichmachung der Informationen, die Belange Dritter berühren, einverstanden erklären. Ist ein Schutz der Daten dadurch ausreichend gesichert, kann auf ein Verfahren nach § 8 IFG verzichtet werden.

Die Praxis sieht jedoch anders aus: Nach der Evaluation des Bundes-IFG durch das Institut für Gesetzesfolgenabschätzung überziehen Behörden bei einem Drittel aller Anfragen ihre Frist - und zwar nicht nur bei aufwändigen Verfahren mit Beteiligung Dritter, sondern auch bei einfachen Anfragen. Dies führt häufig dazu, dass gerade bei politisch relevanten Themen ein Sachverhalt nicht mehr aktuell ist, wenn er nach Monaten an die Öffentlichkeit gelangt.

`}
        <FloatingHeading
        >{`Ablehnungen zum "Schutz des Staates"`}</FloatingHeading>
        {`

Das Informationsfreiheitsgesetz kennt etwa 30 verschiedene Gründe, auf deren Basis Behörden eine Auskunft ablehnen können. Während manche eher selten bemüht werden, werden andere besonders häufig gegen Antragsteller in Stellung gebracht. Sie lassen sich unterscheiden in private Belange, nämlich der Schutz personenbezogener Daten sowie der Schutz von Betriebs- und Geschäftsgeheimnissen, und in öffentliche Belange. Hierzu zählen unter anderem die innere Sicherheit, internationale Beziehungen sowie die Bereichsausnahme für deutsche Nachrichtendienste.

Bei den umfangreichen Ausnahmetatbeständen nach § 3 IFG haben die Behörden in der Regel einen großen Spielraum, zwischen Geheimhaltungsinteressen und öffentlichem Interesse abzuwägen. Sollten sie sich für Geheimhaltung entscheiden, müssen sie dies ausführlich begründen.

Jedoch macht es das Gesetz den Behörden vor allem in einigen Fällen leicht, den Informationszugang auszuschließen. Dies betrifft etwa die Bereichsausnahme für Geheimdienste: Sie sind - dem Geist des IFG zuwiderlaufend - komplett von einer Pflicht zur Information befreit. So können sie auch nicht von Bürgerinnen kontrolliert werden.

Außerdem dürfen alle Dokumente, die mit einer Geheimhaltungsstufe nach der Verschlusssachenanweisung versehen sind (also etwa “Nur für den Dienstgebrauch” oder “geheim”), nicht herausgegeben werden. Zwar ist die Behörde bei einer Anfrage gehalten, die Einstufung nochmals zu überprüfen. Da die Verwaltungsmitarbeiter allerdings selbst über die Einstufung entscheiden, gibt ihnen dieser Ausnahmetatbestand eine weitere Handhabe, sich gegen Transparenz zu wehren. Dabei ist die Ausnahme aus Sicherheitsperspektive vollkommen unnötig: Bei Gefährdungen der inneren und öffentlichen Sicherheit ist nach dem IFG ohnehin kein Dokument herauszugeben.

Schließlich haben nach einem Urteil des Bundesverfassungsgerichts (7 C 22.08) die Ministerien einen großen Spielraum in der Bewertung von Auswirkungen auf internationale Beziehungen. Das bedeutet, dass Gerichte nur begrenzt nachprüfen können, ob eine Veröffentlichung nachteilige Auswirkungen haben würde. Daher bleibt der gesamte Bereich nur eingeschränkt transparent.

Ablehnung zum "Schutz Dritter"
In vielen Fällen verbergen sich besonders umstrittene Ablehnungsgründe für IFG-Anträge in §§ 5 und 6 des IFG: Diese regeln den Schutz personenbezogener Daten sowie den Schutz des geistigen Eigentums (mehr) und von Betriebs- oder Geschäftsgeheimnissen (mehr). Demzufolge besteht der Anspruch auf Informationszugang nicht, soweit Datenschutzgründe überwiegen bzw. „soweit der Schutz geistigen Eigentums entgegensteht“. Da in all diesen Fällen die Rechte sogenannter Dritter, also Privatpersonen oder Unternehmen, betroffen sind, werden in der Regel vor der Herausgabe von Informationen Drittbeteiligungen durchgeführt, bei denen die Betroffenen um Einverständnis gebeten werden.

§ 5 versucht, weitergehend als vergleichbare Gesetze in anderen Staaten, eine Abwägung zwischen Datenschutz und Informationsfreiheit zu schaffen. Diese sind tatsächlich zwei Seiten einer Medaille. Das schutzwürdige private Interesse steht dem öffentlichen Interesse entgegen. Behörden gewähren Privatpersonen daher in der Regel eine schriftliche Anhörung, um in einem Streitfall anschließend abzuwägen, ob das Interesse der Privatperson am Schutz ihrer Daten oder das öffentliche Interesse an der Herausgabe der Daten überwiegt. Daher sieht das IFG auch vor, dass in einem solchen Fall die Antragstellerin begründen soll, warum das öffentliche Interesse - und nicht ihr privates Interesse - an einer Veröffentlichung besonders groß ist.

Aber auch eine weitere Möglichkeit der Konfliktlösung ist denkbar, wenn gewünschte Dokumente personenbezogene Daten wie Adressen und Namen von Kleinunternehmern enthalten: Direkt nach Antragstellung können sich Behörde und Antragsteller darauf verständigen, dass alle personenbezogenen Daten geschwärzt werden.

Der Paragraph trifft allerdings nicht auf personenbezogene Daten von Behördenmitarbeitern zu, sofern diese im Zusammenhang mit der amtlichen Tätigkeit des Vorgangs stehen.

Im Falle des geistigen Eigentums und von Betriebs- und Geschäftsgeheimnissen gibt es, anders als beim Schutz personenbezogener Daten, keine Abwägungspflicht mit dem öffentlichen Interesse (wobei Bundesländer wie Nordrhein-Westfalen diese im Landes-IFG verankert haben). Fallen Dokumente unter eine solche Ausnahme, darf der Zugang zu Informationen nur dann gewährt werden, wenn die Betroffene eingewilligt hat.

Auch wenn sich Behörden immer wieder auf ihre Urheberrechte an Dokumenten berufen, genießen amtliche Werke keinen Urheberrechtsschutz. Bei Werken von Dritten, etwa Meinungsumfragen im Auftrag von Behörden, kann diese jedoch die Veröffentlichung und Vervielfältigung untersagen, wenngleich eine Akteneinsicht auch hier unproblematisch erscheint.

Deutlich umstrittener ist der Ausnahmetatbestand der Betriebs- und Geschäftsgeheimnisse. Was versteht man darunter? Das IFG selbst schweigt sich darüber aus. Aus anderen Gesetzen und Gerichtsurteilen lässt sich jedoch herleiten, dass die Geheimnisse sich auf ein bestimmtes Unternehmen beziehen müssen, nur wenigen Personen bekannt sein dürfen, nach dem Willen des Unternehmen geheim gehalten werden sollen und ein berechtigtes wirtschaftliches Geheimhaltungsinteresse.`}
      </Text>
    ),
  },
  {
    title: 'Widersprüche & Klagen',
    content: (
      <Text>{`
Gegen einen Bescheid der Behörde, also z.B. eine (Teil-)Ablehnung oder einen Gebührenbescheid ist innerhalb eines Monats ein Widerspruch möglich. Dieser sollte eine juristische Argumentation liefern, die erneut von der Behörde geprüft wird. Bei der Argumentation von Widersprüchen (und auch später Klagen) hilft die Datenbank zu Urteilen im Zusammenhang mit Informationsfreiheit. Auch Tätigkeitsberichte der Beauftragten für Datenschutz und Informationsfreiheit bieten Argumentationshilfen. Die Ablehnung eines Widerspruchs kostet in der Regel 30 Euro.

Klagen
Gegen die Ablehnung eines Widerspruchs lässt sich innerhalb eines Monats Klage vor dem für die Behörde zuständigen Verwaltungsgericht erheben. Auch wenn die Behörde drei Monate lang nicht reagiert, ist ohne vorherigen Widerspruch eine Untätigkeitsklage möglich. Wir können dich bei Klagen unterstützen. Mit dem Fonds Transparenzklagen.de, den wir gemeinsam mit der Gesellschaft für Freiheitsrechte betreiben, finanzieren wir Klagen nach den Informationsfreiheitsgesetzen und stellen Anwälte.

Wenn du dich um eine Transparenzpatenschaft und Finanzierung deiner Klage bewerben willst, melde dich bei uns unter Transparenzklagen.de.'`}</Text>
    ),
  },
  {
    title: 'Bundesländer',
    content: (
      <View>
        <Text
        >{`Die Regelung der Informationsfreiheit unterscheidet sich deutlich in den Bundesländern. So gibt es inzwischen eine "Drei-Klassen-Gesellschaft" aus Bundesländern ohne Informationsfreiheit (Bayern, Sachsen, Hessen, Niedersachen), Bundesländern mit Transparenzgesetz (Hamburg, Rheinland-Pfalz) und Bundesländern mit Informationsfreiheitsgesetz (alle anderen). Mit einem Transparenzgesetz können Dokumente nicht nur nachgefragt, sondern werden auch aktiv veröffentlicht.
`}</Text>
        <Button
          title={'Mehr Dazu'}
          backgroundColor={primaryColor}
          onPress={() =>
            Linking.openURL('https://fragdenstaat.de/hilfe/ifg/laender/')}
        />
      </View>
    ),
  },
  {
    title: 'IFG, UIG, VIG',
    content: (
      <Text
      >{`Nach dem Textvorschlag auf FragDenStaat werden alle Anfragen an Behörden gleichzeitig auf Basis des Informationsfreiheitsgesetzes (IFG), Umweltinformationsgesetzes (UIG) und Verbraucherinformationsgesetzes (VIG) gestellt. Während das IFG Rechtsanspruch auf Dokumente aller Art bei Behörden verleiht, bieten UIG und VIG weitergehende Ansprüche auf Umwelt- bzw. Verbraucherinformationen. Sind solche Informationen gefragt, bietet es sich an, ausdrücklich diese Spezialgesetze zu erwähnen.

Typische UIG-Anfragen drehen sich zum Beispiel um Unterlagen eines Flughafens, um Lärmmessungen, CO2-Daten, Gutachten zu Umweltauswirkungen von Bauvorhaben und um öffentlichen Nahverkehr.

Typische VIG-Anfragen drehen sich um Ergebnisse von Hygienekontrollen etwa bei Volksfesten und beim Weihnachtsmarkt oder Lebensmittelkontrollen in Restaurants.

Anfragen nach dem VIG sind zudem bis zu einem Verwaltungsaufwand von 250 Euro gebührenfrei und bei Anfragen zu Rechtsverstößen bis zu 1000 Euro gebührenfrei.`}</Text>
    ),
  },
];

const ProfileAboutFOI = () => {
  this._renderHeader = section => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  };

  this._renderContent = section => {
    return <View style={styles.content}>{section.content}</View>;
  };

  return (
    <BlankContainer>
      <Accordion
        sections={SECTIONS}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
      />
    </BlankContainer>
  );
};

ProfileAboutFOI.navigationOptions = {
  title: 'Über Informationsfreiheit',
};

export default ProfileAboutFOI;
