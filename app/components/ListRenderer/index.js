import { ListItem } from 'react-native-elements';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import React from 'react';
import moment from 'moment';
import 'moment/locale/de';

import { getPrintableStatus, shortenJurisdiction } from '../../utils';
import { primaryColor, primaryColorLight } from '../../globals/colors';
import I18n from '../../i18n';
import styles from './styles';

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

const locale = I18n.currentLocale().substring(0, 2);
moment.locale(locale);

const renderItem = (item, onPress) => {
  const { statusName, realStatus } = getPrintableStatus(
    item.status,
    item.resolution
  );
  const imagePath = realStatus;

  const lastContact = item.last_message || item.first_message;
  const timeAgo = moment(lastContact).fromNow();
  let subtitle = `${I18n.t(realStatus)}, ${timeAgo}`;

  if (item.public_body) {
    const publicBodyName = item.public_body.name;
    const jurisdictionName = item.public_body.jurisdiction.name;

    subtitle += `\n${publicBodyName} (${shortenJurisdiction(
      jurisdictionName
    )})`;
  }

  return (
    <ListItem
      key={item.id}
      title={item.title}
      titleNumberOfLines={4}
      subtitle={subtitle}
      subtitleNumberOfLines={4}
      leftIcon={
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 20,
            marginLeft: 10,
          }}
        >
          <Image
            source={{
              uri: imagePath,
            }}
            style={{
              height: 35,
              width: 35,
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
