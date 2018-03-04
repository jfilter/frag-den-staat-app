import { Text } from 'react-native';
import { connect } from 'react-redux';
import React from 'react';

import BlankContainer from '../../components/library/BlankContainer';
import Heading from '../../components/library/Heading';
import data from './FAQ';

const ProfileFAQDetails = ({ id }) => (
  <BlankContainer>
    <Heading style={{ marginTop: 20 }}>
      {`${data[id].q}
      `}
    </Heading>
    {typeof data[id].a === 'string' ? <Text>{data[id].a}</Text> : data[id].a}
  </BlankContainer>
);

const mapStateToProps = (state, props) => {
  return {
    id: props.navigation.state.params.id,
  };
};

export default connect(mapStateToProps)(ProfileFAQDetails);
