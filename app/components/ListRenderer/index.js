import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { ListItem } from 'react-native-elements';
import moment from 'moment';

import styles from './styles';
import { getPrintableStatus } from '../../utils';
import { getPublicBodyString } from '../../utils/fakeApi';
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
  let subtitle = `${statusName}, ${timeAgo}\n`;
  subtitle += getPublicBodyString(item.public_body);

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
