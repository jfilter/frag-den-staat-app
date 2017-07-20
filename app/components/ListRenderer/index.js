import React from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import { ListItem } from 'react-native-elements';
import moment from 'moment';

import styles from './styles';
import { getPrintableStatus, shortenJurisdiction } from '../../utils';
import { getPublicBodyNameAndJurisdiction } from '../../utils/fakeApi';
import { primaryColor, primaryColorLight } from '../../styles/colors';

const renderNumberOfResultHeader = nResults => {
  const nResultsText = nResults >= 0 ? `${nResults} REQUESTS` : null;
  return (
    <Text style={styles.nResults}>
      {nResultsText}
    </Text>
  );
};

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
  let subtitle = `${statusName}, ${timeAgo}`;
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
