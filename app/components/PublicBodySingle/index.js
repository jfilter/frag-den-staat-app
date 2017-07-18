import React from 'react';
import { Text, View, ScrollView, Linking, Share, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Icon, Button, Divider } from 'react-native-elements';
import Accordion from 'react-native-collapsible/Accordion';
import moment from 'moment';
import deLocal from 'moment/locale/de';

import styles from './styles';
import { primaryColor, grey } from '../../styles/colors';
import { headerStyles, iconSize } from '../../styles/header';

const PublicBodySingle = ({ item }) => {
  return (
    <ScrollView style={styles.scrollView}>
      <Text styles={styles.heading}>item.name</Text>
    </ScrollView>
  );
};

export default PublicBodySingle;
