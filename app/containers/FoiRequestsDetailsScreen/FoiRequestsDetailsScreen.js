import React from 'react';
import { Text, View, ScrollView, Linking, Share, Platform } from 'react-native';
import moment from 'moment';
import deLocal from 'moment/locale/de';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Icon, Button, Divider } from 'react-native-elements';
import Accordion from 'react-native-collapsible/Accordion';

import { primaryColor, greyLight } from '../../styles/colors';
import styles from './styles';

moment.locale('de', deLocal);

class FoiRequestsDetailsScreen extends React.Component {
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

    // platform specific share button
    let iconName = 'ios-share-outline';
    let iconType = 'ionicon';
    if (Platform.OS === 'android') {
      iconName = 'share';
      iconType = 'material';
    }

    return {
      title: `#${requestId}`,
      headerRight: (
        <Icon
          name={iconName}
          type={iconType}
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

  constructor(props) {
    super(props);
    const index = props.navigation.state.params.indexInArray;
    this.request = props.requests[index];
  }

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
        <View key={att.id}>
          <View style={styles.attachmentsRowLabel}>
            <View>
              <Icon name="attach-file" size={30} />
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
      { key: 'STATUS', value: r.status },
      { key: 'RESOLUTION', value: r.resolution },
      { key: 'REFUSAL REASON', value: r.refusal_reason },
      { key: 'COSTS', value: r.costs },
      { key: 'LAW', value: r.law },
      { key: 'STARTED ON', value: moment(r.first_message).format('LLL') },
      { key: 'LAST MESSAGE', value: moment(r.last_message).format('LLL') },
      { key: 'DUE DATE', value: moment(r.due_date).format('LLL') },
    ];

    return (
      <View style={styles.table}>
        {tableData.map(({ key, value }) =>
          <View key={key} style={styles.row}>
            <View style={styles.item1}>
              <Text>
                {key}
              </Text>
            </View>
            <View style={styles.item2}>
              <Text>
                {value}
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
      ({
        id,
        sender,
        subject,
        content,
        timestamp,
        is_response,
        attachments,
      }) => {
        const filteredAttachments = attachments
          .filter(x => x.approved)
          .map(x => {
            return {
              key: x.id,
              url: x.site_url,
              name: x.name,
              filetype: x.filetype,
            };
          });
        return {
          key: id,
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
  FoiRequestsDetailsScreen
);
