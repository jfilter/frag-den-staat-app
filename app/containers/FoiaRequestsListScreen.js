import React from 'react';
import { FlatList, Text, View, StyleSheet, Image } from 'react-native';
import { ListItem } from 'react-native-elements';
import moment from 'moment';

import { connect } from 'react-redux';
import { foiaRequestsFetchData } from '../actions/foiaRequests';
import publicBodyFile from '../../scraper/public_bodies/public_bodies_cleaned.json';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

class FoiaRequestsListScreen extends React.Component {
  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
    // this._loadMoreData = this._loadMoreData.bind(this);
  }

  componentDidMount() {
    this.props.fetchData();
  }

  _renderItem = ({ item, index }) => {
    const imagePath = `${item.status}`;
    const lastContact = item.last_message || item.first_message;
    const timeAgo = moment(lastContact).fromNow();
    let subtitle = `${item.status}, ${timeAgo}`;

    if (item.public_body) {
      const startToSlice = '/api/v1/publicbody/'.length;
      const endSlice = item.public_body.length - 1;
      const publicBodyId = item.public_body.slice(startToSlice, endSlice);
      const publicBodyObject = publicBodyFile[publicBodyId];
      const publicBodyName = publicBodyObject.publicBodyName;
      const jurisdictionName = publicBodyObject.jurisdictionName;

      subtitle += `\n${publicBodyName} (${jurisdictionName})`;
    }

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
        // avatarStyle={{ marginTop: 20 }}
        // TODO: Not possible right now, come back later to check if they have fixed it.
        // avatarStyle={{ overlayContainerStyle: { backgroundColor: 'white' } }}
        containerStyle={{ alignItems: 'center', justifyContent: 'center' }}
      />
    );
  };

  render() {
    if (this.props.error !== '') {
      return (
        <View>
          <Text>ERROR!</Text>
          <Text>
            {this.props.error}
          </Text>
        </View>
      );
    }

    if (this.props.isPending) {
      return <Text>Loading…</Text>;
    }

    return (
      <View>
        <FlatList data={this.props.requests} renderItem={this._renderItem} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    requests: state.foiaRequests.requests,
    error: state.foiaRequests.error,
    isPending: state.foiaRequests.isPending,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(foiaRequestsFetchData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  FoiaRequestsListScreen
);
