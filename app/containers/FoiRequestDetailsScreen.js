import React from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import { Share } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Accordion from 'react-native-collapsible/Accordion';

import publicBodyFile from '../../scraper/public_bodies/public_bodies_cleaned.json';

// import Icon from 'react-native-vector-icons/Ionicons';

import { primaryColor, secondaryColor } from '../styles/colors.js';

class FoiRequestDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    const index = props.navigation.state.params.indexInArray;
    this.request = props.requests[index];
  }

  static navigationOptions = ({ navigation, screenProps }) => {
    const requestId = navigation.state.params.id;
    function share() {
      Share.share(
        {
          message: 'LOL WAT? Check out this FOI request!',
          url: `https://fragdenstaat.de/a/${requestId}`,
          title: 'FragDenStaat.de', // What's the purpose?
        },
        {
          // Android only:
          dialogTitle: 'FragDenStaat.de',
        }
      );
    }

    return {
      title: `#${requestId}`,
      headerRight: (
        <Icon
          name="ios-share-outline"
          type="ionicon"
          color={primaryColor}
          size={30}
          onPress={share}
          containerStyle={{
            paddingVertical: 7,
            paddingHorizontal: 20,
          }}
        />
      ),
    };
  };

  _renderHeader = () =>
    <View>
      <Text>Header</Text>
    </View>;

  _renderContent = () =>
    <View>
      <Text>Header</Text>
    </View>;

  render() {
    const r = this.request;

    const tableData = [
      ['TO', r.public_body],
      ['LAW', r.law],
      ['STARTED ON', r.first_message],
      ['STATUS', r.status],
      ['RESOLUTION', r.resolution],
      ['REFUSAL REASON', r.refusal_reason],
      ['LAST MESSAGE', r.last_message],
      ['DUE DATE', r.due_date],
      ['COSTS', r.costs],
    ];

    const table = (
      <View style={styles.table}>
        {tableData.map(x =>
          <View style={styles.row}>
            <View style={styles.item1}>
              <Text>
                {x[0]}
              </Text>
            </View>
            <View style={styles.item2}>
              <Text>
                {x[1]}
              </Text>
            </View>
          </View>
        )}
      </View>
    );

    return (
      <ScrollView style={styles.scrollView}>
        <View>
          <Text style={styles.heading}>
            {r.title}
          </Text>
          {table}
          <Text>
            {r.description}
          </Text>

          <Accordion
            sections={['Section 1', 'Section 2', 'Section 3']}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    requests: state.foiRequests.requests,
    error: state.foiRequests.error,
    isPending: state.foiRequests.isPending,
    nextUrl: state.foiRequests.nextUrl,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(
  FoiRequestDetailsScreen
);

const styles = StyleSheet.create({
  item1: { width: '33%' },
  item2: { width: '67%' },
  table: {
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: secondaryColor,
    padding: 3,
    marginHorizontal: 0,
  },
  scrollView: {
    backgroundColor: 'white',
    padding: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
});
