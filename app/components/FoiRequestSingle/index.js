import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Linking,
  Share,
  Platform,
  TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';
import { Icon, Button, Divider } from 'react-native-elements';
import Accordion from 'react-native-collapsible/Accordion';
import moment from 'moment';
import deLocal from 'moment/locale/de';

import styles from './styles';
import { primaryColor, grey } from '../../styles/colors';
import { headerStyles, iconSize } from '../../styles/header';
import { ORIGIN } from '../../utils/globals';

moment.locale('de', deLocal);

class FoiRequestSingle extends React.Component {
  _renderMessageHeader = msg =>
    <View style={styles.msgHeader}>
      <Text style={styles.msgHeaderText}>
        {`${moment(msg.timestamp).format('DD.MM.YYYY')}: ${msg.sender}`}
      </Text>
    </View>;

  _renderAttachments = attachments => {
    return attachments.map(att => {
      const isPdf = att.filetype === 'application/pdf';
      let viewPdfButton;

      if (isPdf) {
        viewPdfButton = (
          <Button
            containerViewStyle={styles.viewPdfButton}
            backgroundColor={primaryColor}
            title="VIEW PDF"
            onPress={() => this.props.navigateToPdfViewer({ uri: att.url })}
            icon={{ name: 'remove-red-eye', color: 'white' }}
          />
        );
      }

      return (
        <View key={att.id}>
          <View style={styles.attachmentsRowLabel}>
            <View>
              <Icon name="attach-file" />
            </View>
            <View>
              <Text style={styles.hotfixTextPadding}>
                {att.name.replace(/_|-/g, ' ')}
              </Text>
            </View>
          </View>
          <View style={styles.attachmentsRowButton}>
            <View>
              <Button
                containerViewStyle={styles.downloadButton}
                backgroundColor={primaryColor}
                title="DOWNLOAD"
                icon={{ name: 'file-download', color: 'white' }}
                onPress={() => Linking.openURL(att.url)}
              />
            </View>
            {viewPdfButton}
          </View>
          <Divider style={styles.dividerAttachments} />
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
        <Divider style={styles.dividerBeforeMessageContent} />
        <Text>
          {msg.content.trim()}
        </Text>
      </View>
    );
  };

  _renderTable = () => {
    const { request } = this.props;
    const tableData = [
      { key: 'STATUS', value: request.status },
      { key: 'RESOLUTION', value: request.resolution },
      { key: 'REFUSAL REASON', value: request.refusal_reason },
      { key: 'COSTS', value: request.costs },
      // { key: 'LAW', value: request.law },
      { key: 'STARTED ON', value: moment(request.first_message).format('LLL') },
      {
        key: 'LAST MESSAGE',
        value: moment(request.last_message).format('LLL'),
      },
      { key: 'DUE DATE', value: moment(request.due_date).format('LLL') },
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
        <View style={styles.row}>
          <View style={styles.item1}>
            <Text style={styles.law}>LAW</Text>
          </View>
          <View style={styles.item2}>
            <TouchableHighlight
              style={styles.linkTouchable}
              underlayColor={grey}
              onPress={() => {
                fetch(ORIGIN + request.law)
                  .then(response => response.json())
                  .then(data => Linking.openURL(data.site_url))
                  .catch(error => console.error(error));
              }}
            >
              <Text style={styles.link}>Check it out!</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  };

  _renderMessages = () => {
    const filtedMessages = this.props.request.messages.filter(
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
          underlayColor={grey}
        />
      </View>
    );
  };

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <View>
          <Text style={styles.heading}>
            {this.props.request.title}
          </Text>
          <View>
            <Text style={styles.subheadingTo}>to</Text>
            <Text style={styles.subheading}>
              {this.props.request.public_body}
            </Text>
          </View>
          {this._renderTable()}
          <View style={styles.summary}>
            <Text>
              {this.props.request.description}
            </Text>
          </View>
          {this._renderMessages()}
        </View>
      </ScrollView>
    );
  }
}

FoiRequestSingle.navigationOptions = ({ navigation }) => {
  const requestId = navigation.state.params.request.id;
  function share() {
    Share.share(
      {
        message: 'Check out this Freedom of Information request!',
        url: `${ORIGIN}/a/${requestId}`,
        title: 'FragDenStaat.de',
      },
      {
        // Android only:
        dialogTitle: 'FragDenStaat.de',
      }
    );
  }

  let iconName = 'share';
  let iconType = 'material';

  // platform specific share button
  if (Platform.OS === 'ios') {
    iconName = 'ios-share-outline';
    iconType = 'ionicon';
  }

  return {
    title: `#${requestId}`,
    headerRight: (
      <Icon
        name={iconName}
        type={iconType}
        color={primaryColor}
        size={iconSize}
        onPress={share}
        containerStyle={headerStyles.headerRightIconContainer}
      />
    ),
  };
};

FoiRequestSingle.propTypes = {
  navigateToPdfViewer: PropTypes.func.isRequired,
  request: PropTypes.shape({
    public_body: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    costs: PropTypes.number,
    id: PropTypes.number.isRequired,
    last_message: PropTypes.string,
    first_message: PropTypes.string.isRequired,
    due_date: PropTypes.string.isRequired,
    jurisdiction: PropTypes.string.isRequired,
    law: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    resolution: PropTypes.string,
    refusal_reason: PropTypes.string,
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string.isRequired,
        subject: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        not_publishable: PropTypes.bool.isRequired,
        sender: PropTypes.string.isRequired,
        timestamp: PropTypes.string.isRequired,
        attachments: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number.isRequired,
            approved: PropTypes.bool.isRequired,
            filetype: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            site_url: PropTypes.string.isRequired,
          })
        ),
      })
    ).isRequired,
  }).isRequired,
};

export default FoiRequestSingle;
