import { ScrollView, View } from 'react-native';
import React from 'react';

import { styles } from './styles';

const BlankContainer = ({ children, innerStyle, scrollViewRef }) => (
  <ScrollView style={styles.outer} ref={scrollViewRef}>
    <View style={[styles.inner, innerStyle]}>{children}</View>
  </ScrollView>
);

export default BlankContainer;
