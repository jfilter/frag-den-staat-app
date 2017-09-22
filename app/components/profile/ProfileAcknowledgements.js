import { FlatList, Text } from 'react-native';
import React from 'react';

import BlankContainer from '../BlankContainer';
import text from './credits.json';

const ProfileAcknowledgements = () => (
  <BlankContainer>
    <Text>
      Wir danken allen Leute, die uns Fehler melden und Verbesserungswünsche
      einreichen. Inbesondere danken wir all den fleißigen Beta-TesterInnen!
      Zusätzlich bedanken wir uns bei all den Open-Source-EntwicklerInnen, die
      durch ihre Software diese App erst ermöglichten.
      {`

        `}
    </Text>
    <FlatList
      removeClippedSubviews
      data={text}
      renderItem={({ item }) => <Text>{item}</Text>}
    />
  </BlankContainer>
);

export default ProfileAcknowledgements;
