import { ListItem } from 'react-native-elements';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import React from 'react';
import moment from 'moment';

import { getPrintableStatus, shortenJurisdiction } from '../../utils';
import { getPublicBodyNameAndJurisdiction } from '../../utils/fakeApi';
import { primaryColor, primaryColorLight } from '../../globals/colors';
import styles from './styles';
import I18n from '../../i18n';

const renderNumberOfResultHeader = nResults => (
  <Text style={styles.nResults}>
    {nResults >= 0 && I18n.t('countingRequests', { count: nResults })}
  </Text>
);

const renderFooter = isPending => {
  if (!isPending) return null;

  return (
    <View style={styles.footer}>
      <ActivityIndicator animating size="large" color={primaryColorLight} />
    </View>
  );
};

const renderItem = (item, onPress) => {
  const { statusName, realStatus } = getPrintableStatus(
    item.status,
    item.resolution
  );
  const imagePath = realStatus;

  const lastContact = item.last_message || item.first_message;
  const timeAgo = moment(lastContact).fromNow();
  let subtitle = `${I18n.t(realStatus)}, ${timeAgo}`;
  const { publicBodyName, jurisdictionName } = getPublicBodyNameAndJurisdiction(
    item.public_body
  );

  if (publicBodyName && jurisdictionName) {
    subtitle += `\n${publicBodyName} (${shortenJurisdiction(
      jurisdictionName
    )})`;
  }

  return (
    <ListItem
      key={item.id}
      title={item.title}
      titleNumberOfLines={3}
      subtitle={subtitle}
      subtitleNumberOfLines={3}
      leftIcon={
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
          }}
        >
          <Image
            source={{
              uri: imagePath,
            }}
            style={{
              height: 25,
              width: 25,
            }}
          />
        </View>
      }
      chevronColor={primaryColor}
      onPress={onPress}
      containerStyle={styles.listItemContainer}
    />
  );
};

const renderSeparator = () => {
  return <View style={styles.seperator} />;
};

export {
  renderSeparator,
  renderItem,
  renderFooter,
  renderNumberOfResultHeader,
};
