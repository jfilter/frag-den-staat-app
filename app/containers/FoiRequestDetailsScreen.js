import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Linking,
  Share,
} from 'react-native';
import moment from 'moment';
import deLocal from 'moment/locale/de';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Icon, Button, Divider } from 'react-native-elements';
import Accordion from 'react-native-collapsible/Accordion';

// import publicBodyFile from '../../scraper/public_bodies/public_bodies_cleaned.json';

// import Icon from 'react-native-vector-icons/Ionicons';

import {
  primaryColor,
  secondaryColor,
  greyDark,
  greyLight,
} from '../styles/colors';

moment.locale('de', deLocal);

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
        {`${moment(msg.timestamp).format('DD.MM.YYYY')} ${msg.sender}`}
      </Text>
    </View>;

  _renderAttachments = attachments => {
    return attachments.map(att => {
      const isPdf = att.filetype === 'application/pdf';
      const viewPdfButton = isPdf
        ? <Button
            containerViewStyle={{ marginLeft: 0, marginRight: 0 }}
            backgroundColor={primaryColor}
            title="VIEW PDF"
            onPress={() => this.props.navigateToPdfViewer({ uri: att.url })}
            icon={{ name: 'remove-red-eye', color: 'white' }}
          />
        : null;

      return (
        <View>
          <View style={styles.attachmentsRowLabel}>
            <View>
              <Icon
                name="attach-file"
                // color="white"
                size={30}
                // containerStyle={{
                //   paddingVertical: 7,
                //   paddingHorizontal: 20,
                // }}
              />
            </View>
            <View>
              <Text>
                {att.name}
              </Text>
            </View>
          </View>
          <View style={styles.attachmentsRowButton}>
            {viewPdfButton}
            <View>
              <Button
                containerViewStyle={{ margin: 0 }}
                backgroundColor={primaryColor}
                title="DOWNLOAD"
                icon={{ name: 'file-download', color: 'white' }}
                onPress={() =>
                  Linking.openURL(att.url).catch(err =>
                    console.error('An error occurred', err)
                  )}
              />
            </View>
          </View>
          <Divider style={{ backgroundColor: greyLight, marginBottom: 10 }} />
        </View>
      );
    });
  };

  _renderMessageContent = msg => {
    return (
      <View style={styles.msgContent}>
        {this._renderAttachments(msg.attachments)}
        <Text>
          FROM: {msg.sender}
        </Text>
        <Text>
          ON: {moment(msg.timestamp).format('LLLL')}
        </Text>
        <Text>
          SUBJECT: {msg.subject}
        </Text>
        <Divider
          style={{
            backgroundColor: greyLight,
            marginBottom: 10,
            marginTop: 10,
          }}
        />
        <Text>
          {msg.content.trim()}
        </Text>
      </View>
    );
  };

  _renderTable = () => {
    const r = this.request;
    const tableData = [
      ['STATUS', r.status],
      ['RESOLUTION', r.resolution],
      ['REFUSAL REASON', r.refusal_reason],
      ['COSTS', r.costs],
      ['LAW', r.law],
      ['STARTED ON', moment(r.first_message).format('LLL')],
      ['LAST MESSAGE', moment(r.last_message).format('LLL')],
      ['DUE DATE', moment(r.due_date).format('LLL')],
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

  _renderMessages = () => {
    const filtedMessages = this.request.messages.filter(
      x => !x.not_publishable
    );
    const messages = filtedMessages.map(
      ({ sender, subject, content, timestamp, is_response, attachments }) => {
        const filteredAttachments = attachments
          .filter(x => x.approved)
          .map(x => {
            return { url: x.site_url, name: x.name, filetype: x.filetype };
          });
        return {
          sender,
          subject,
          content,
          timestamp,
          isRespsone: is_response,
          attachments: filteredAttachments,
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
    return (
      <ScrollView style={styles.scrollView}>
        <View>
          <Text style={styles.heading}>
            {this.request.title}
          </Text>
          <View>
            <Text style={styles.subheadingTo}>to</Text>
            <Text style={styles.subheading}>
              {this.request.public_body}
            </Text>
          </View>
          {this._renderTable()}
          <Text>
            {this.request.description}
          </Text>
          {this._renderMessages()}
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
    // textAlign: 'center',
    color: primaryColor,
  },
  msgContent: {
    padding: 10,
    borderColor: secondaryColor,
    borderWidth: 1,
    marginTop: 20,
  },
  attachmentsRowLabel: {
    flex: 1,
    flexDirection: 'row',
  },
  attachmentsRowButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});
