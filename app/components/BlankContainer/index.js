import { ScrollView, View } from 'react-native';
import React from 'react';

import { styles } from './styles';

const BlankContainer = ({ children, innerStyle }) => (
  <ScrollView style={styles.outer}>
    <View style={[styles.inner, innerStyle]}>{children}</View>
  </ScrollView>
);

export default BlankContainer;
