import { Image, View } from 'react-native';
import { ListItem as ListItemRNElements } from 'react-native-elements';
import React from 'react';
import moment from 'moment';

import { getPrintableStatus, jurisdictionNameFromUrl } from '../../../utils';
import { greyDark, primaryColor, fontColor } from '../../../globals/colors';
import I18n from '../../../i18n';
import styles from './styles';

const locale = I18n.currentLocale().substring(0, 2);
if (locale === 'de') {
  moment.locale('de');
} else {
  moment.locale('en');
}

// This has to be done like this for the default RN image handling.
// There are other ways to dynamically add images, but this is still the easiest one.
const images = {
  asleep: (
    <Image
      source={require('./status-images/icon-asleep.png')}
      style={{ height: 35, width: 35 }}
    />
  ),
  awaiting_classification: (
    <Image
      source={require('./status-images/icon-awaiting_classification.png')}
      style={{ height: 35, width: 35 }}
    />
  ),
  awaiting_response: (
    <Image
      source={require('./status-images/icon-awaiting_response.png')}
      style={{ height: 35, width: 35 }}
    />
  ),
  not_held: (
    <Image
      source={require('./status-images/icon-not_held.png')}
      style={{ height: 35, width: 35 }}
    />
  ),
  overdue: (
    <Image
      source={require('./status-images/icon-overdue.png')}
      style={{ height: 35, width: 35 }}
    />
  ),
  partially_successful: (
    <Image
      source={require('./status-images/icon-partially_successful.png')}
      style={{ height: 35, width: 35 }}
    />
  ),
  refused: (
    <Image
      source={require('./status-images/icon-refused.png')}
      style={{ height: 35, width: 35 }}
    />
  ),
  successful: (
    <Image
      source={require('./status-images/icon-successful.png')}
      style={{ height: 35, width: 35 }}
    />
  ),
  user_withdrew: (
    <Image
      source={require('./status-images/icon-user_withdrew.png')}
      style={{ height: 35, width: 35 }}
    />
  ),
  costs_asleep: (
    <Image
      source={require('./status-images/costs_icon-asleep.png')}
      style={{ height: 35, width: 35 }}
    />
  ),
  costs_awaiting_classification: (
    <Image
      source={require('./status-images/costs_icon-awaiting_classification.png')}
      style={{ height: 35, width: 35 }}
    />
  ),
  costs_awaiting_response: (
    <Image
      source={require('./status-images/costs_icon-awaiting_response.png')}
      style={{ height: 35, width: 35 }}
    />
  ),
  costs_not_held: (
    <Image
      source={require('./status-images/costs_icon-not_held.png')}
      style={{ height: 35, width: 35 }}
    />
  ),
  costs_overdue: (
    <Image
      source={require('./status-images/costs_icon-overdue.png')}
      style={{ height: 35, width: 35 }}
    />
  ),
  costs_partially_successful: (
    <Image
      source={require('./status-images/costs_icon-partially_successful.png')}
      style={{ height: 35, width: 35 }}
    />
  ),
  costs_refused: (
    <Image
      source={require('./status-images/costs_icon-refused.png')}
      style={{ height: 35, width: 35 }}
    />
  ),
  costs_successful: (
    <Image
      source={require('./status-images/costs_icon-successful.png')}
      style={{ height: 35, width: 35 }}
    />
  ),
  costs_user_withdrew: (
    <Image
      source={require('./status-images/costs_icon-user_withdrew.png')}
      style={{ height: 35, width: 35 }}
    />
  ),
  costs_user_withdrew_costs: (
    <Image
      source={require('./status-images/costs_icon-user_withdrew.png')}
      style={{ height: 35, width: 35 }}
    />
  ),
};

const ListItem = ({ item, onPress }) => {
  const { realStatus } = getPrintableStatus(item.status, item.resolution);

  if (item.costs == 0) {
    image = images[realStatus];
  } else {
    image = images['costs_' + realStatus];
  }

  const lastContact = item.last_message || item.first_message;
  const timeAgo = moment(lastContact).fromNow();
  let subtitle = `${I18n.t(realStatus)}, ${timeAgo}`;

  if (item.public_body) {
    const publicBodyName = item.public_body.name;

    const jurisdictionUrl = item.public_body.jurisdiction;

    subtitle += `\n${publicBodyName} (${jurisdictionNameFromUrl(
      jurisdictionUrl
    )})`;
  }

  return (
    <ListItemRNElements
      key={item.id}
      title={item.title}
      titleStyle={{ fontSize: 15, fontWeight: 'bold', color: fontColor }}
      subtitleStyle={{ fontSize: 13, fontWeight: 'bold', color: greyDark }}
      titleNumberOfLines={4}
      subtitle={subtitle}
      subtitleNumberOfLines={4}
      leftIcon={
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
            marginLeft: 10,
          }}
        >
          {image}
        </View>
      }
      chevronColor={primaryColor}
      onPress={onPress}
      containerStyle={styles.listItemContainer}
    />
  );
};

export default ListItem;
