import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { ListItem } from 'react-native-elements';
import moment from 'moment';

import styles from './styles';
import publicBodyFile from '../../../scraper/public_bodies/public_bodies_cleaned.json';
import statusFile from '../../data/status.json';
import { getItemById, mapToRealStatus } from '../../utils';
import { primaryColor, primaryColorLight } from '../../styles/colors';

const renderNumberOfResultHeader = nResults => {
  const nResultsText = nResults !== -1 ? `${nResults} REQUESTS` : null;
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
  // fix because that it's complicated with the status. see utils/index.js for more information.
  const realStatus = mapToRealStatus(item.status, item.resolution);
  const imagePath = realStatus;
  const statusName = statusFile.find(getItemById(realStatus)).name;

  const lastContact = item.last_message || item.first_message;
  const timeAgo = moment(lastContact).fromNow();
  let subtitle = `${statusName}, ${timeAgo}`;

  if (item.public_body) {
    const startToSlice = '/api/v1/publicbody/'.length;
    const endSlice = item.public_body.length - 1;
    const publicBodyId = item.public_body.slice(startToSlice, endSlice);
    const publicBodyObject = publicBodyFile[publicBodyId];
    const publicBodyName = publicBodyObject.publicBodyName;
    const jurisdictionName = publicBodyObject.jurisdictionName;

    subtitle = `${subtitle}\n${publicBodyName} (${jurisdictionName})`;
  }

  return (
    <ListItem
      key={item.id}
      title={item.title}
      titleNumberOfLines={3}
      subtitle={subtitle}
      subtitleNumberOfLines={3}
      avatar={{
        uri: imagePath,
      }}
      chevronColor={primaryColor}
      onPress={onPress}
      // avatarStyle={{ marginTop: 20 }}
      // TODO: Not possible right now, come back later to check if they have fixed it.
      // avatarStyle={{ overlayContainerStyle: { backgroundColor: 'white' } }}
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
