import { Linking, View } from 'react-native';
import React from 'react';

import StandardButton from '../StandardButton';

const LinkGroup = ({ links }) => {
  return (
    <View>
      {links.map(({ title, url, icon }) => (
        <StandardButton
          key={title}
          icon={icon}
          title={title}
          onPress={() => {
            Linking.canOpenURL(url)
              .then(supported => {
                if (!supported) {
                  console.log("Can't handle url: " + url);
                } else {
                  return Linking.openURL(url);
                }
              })
              .catch(err => console.error('An error occurred', err));
          }}
        />
      ))}
    </View>
  );
};

export default LinkGroup;
