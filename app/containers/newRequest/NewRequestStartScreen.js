import { Text } from 'react-native';
import React from 'react';

import BlankContainer from '../../components/library/BlankContainer';
import I18n from '../../i18n';

export class NewRequestStartScreen extends React.Component {
  render() {
    return (
      <BlankContainer>
        <Text>{I18n.t('notYetImplemented')}</Text>
      </BlankContainer>
    );
  }
}
