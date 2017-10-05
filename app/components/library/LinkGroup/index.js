import { Button } from 'react-native-elements';
import { Linking, View } from 'react-native';
import React from 'react';

import { primaryColor } from '../../../globals/colors';

const LinkGroup = ({ links }) => {
  return (
    <View>
      {links.map(({ title, url, icon }) => (
        <Button
          key={title}
          icon={icon}
          title={title}
          containerViewStyle={{ margin: 5 }}
          backgroundColor={primaryColor}
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
