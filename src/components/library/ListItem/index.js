import { Image, View } from 'react-native';
import { ListItem as ListItemRNElements } from 'react-native-elements';
import React from 'react';
import moment from 'moment';

import { getPrintableStatus, shortenJurisdiction } from '../../../utils';
import { greyDark, primaryColor, fontColor } from '../../../globals/colors';
import I18n from '../../../i18n';
import styles from './styles';

const locale = I18n.currentLocale().substring(0, 2);
moment.locale(locale);

const ListItem = ({ item, onPress }) => {
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
          <Image
            source={{ uri: imagePath }}
            style={{ height: 35, width: 35 }}
          />
        </View>
      }
      chevronColor={primaryColor}
      onPress={onPress}
      containerStyle={styles.listItemContainer}
    />
  );
};

export default ListItem;
