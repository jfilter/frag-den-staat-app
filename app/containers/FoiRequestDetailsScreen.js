import React from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableHighlight,
  Linking,
} from 'react-native';
import moment from 'moment';
import { Share } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Accordion from 'react-native-collapsible/Accordion';

import publicBodyFile from '../../scraper/public_bodies/public_bodies_cleaned.json';

// import Icon from 'react-native-vector-icons/Ionicons';

import { primaryColor, secondaryColor, greyDark } from '../styles/colors.js';

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

  _renderMessageHeader = msg =>
    <View style={styles.msgHeader}>
      <Text style={styles.msgHeaderText}>
        {msg.timestamp}
      </Text>
    </View>;

  _renderMessageContent = msg => {
    const pdfViews = msg.pdfs.map(uri =>
      <View>
        <TouchableHighlight
          onPress={() => this.props.navigateToPdfViewer({ uri })}
        >
          <Text>VIEW PDF</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() =>
            Linking.openURL(uri).catch(err =>
              console.error('An error occurred', err)
            )}
        >
          <Text>DOWNLOAD PDF</Text>
        </TouchableHighlight>
      </View>
    );
    return (
      <View style={styles.msgContent}>
        {pdfViews}
        <Text>
          {msg.sender}
        </Text>
        <Text>
          {msg.subject}
        </Text>
        <Text>
          {msg.timestamp}
        </Text>
        <Text>
          {msg.content}
        </Text>
        <Text>
          {msg.pdfs.map(x =>
            <Text>
              {x}
            </Text>
          )}
        </Text>
      </View>
    );
  };

  _buildTable = () => {
    const r = this.request;
    const tableData = [
      // ['TO', r.public_body],
      ['LAW', r.law],
      ['STARTED ON', r.first_message],
      ['STATUS', r.status],
      ['RESOLUTION', r.resolution],
      ['REFUSAL REASON', r.refusal_reason],
      ['LAST MESSAGE', r.last_message],
      ['DUE DATE', r.due_date],
      ['COSTS', r.costs],
    ];

    return (
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
  };

  _buildMessages = () => {
    const r = this.request;

    const filtedMessages = r.messages.filter(x => !x.not_publishable);
    const messages = filtedMessages.map(
      ({ sender, subject, content, timestamp, is_response, attachments }) => {
        const filteredAttachments = attachments.filter(
          x => x.approved && x.filetype === 'application/pdf'
        );
        const pdfs = filteredAttachments.map(x => x.site_url);
        return {
          sender,
          subject,
          content,
          timestamp,
          isRespsone: is_response,
          pdfs,
        };
      }
    );

    return (
      <View style={styles.msgContainer}>
        <Accordion
          align={'center'}
          duration={1000}
          sections={messages}
          renderHeader={this._renderMessageHeader}
          renderContent={this._renderMessageContent}
        />
      </View>
    );
  };

  render() {
    const r = this.request;

    const filtedMessages = r.messages.filter(x => !x.not_publishable);
    const messages = filtedMessages.map(
      ({ sender, subject, content, timestamp, is_response, attachments }) => {
        const filteredAttachments = attachments.filter(
          x => x.approved && x.filetype === 'application/pdf'
        );
        const pdfs = filteredAttachments.map(x => x.site_url);
        return {
          sender,
          subject,
          content,
          timestamp,
          isRespsone: is_response,
          pdfs,
        };
      }
    );

    return (
      <ScrollView style={styles.scrollView}>
        <View>
          <Text style={styles.heading}>
            {r.title}
          </Text>
          <View>
            <Text style={styles.subheadingTo}>to</Text>
            <Text style={styles.subheading}>
              {r.public_body}
            </Text>
          </View>
          {this._buildTable()}
          <Text>
            {r.description}
          </Text>
          {this._buildMessages()}
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
  return {
    navigateToPdfViewer: params =>
      dispatch(
        NavigationActions.navigate({
          routeName: 'FoiRequestsPdfViewer',
          params,
        })
      ),
  };
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
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: secondaryColor,
    paddingVertical: 5,
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
    marginBottom: 10,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 18,
    textAlign: 'center',
    color: primaryColor,
    marginBottom: 20,
  },
  subheadingTo: {
    textAlign: 'center',
    marginBottom: 10,
  },
  msgContainer: {
    marginBottom: 100,
  },
  msgHeader: {
    padding: 10,
    borderColor: greyDark,
    borderWidth: 1,
    marginTop: 20,
  },
  msgHeaderText: {
    textAlign: 'center',
    color: primaryColor,
  },
  msgContent: {
    padding: 10,
    borderColor: secondaryColor,
    borderWidth: 1,
    marginTop: 20,
  },
});
