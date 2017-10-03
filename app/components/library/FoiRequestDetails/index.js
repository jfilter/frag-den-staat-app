import { Button, Divider, Icon } from 'react-native-elements';
import {
  Linking,
  Platform,
  Share,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import 'moment/locale/de';

import { ORIGIN } from '../../../globals';
import { breakLongWords } from '../../../utils/strings';
import {
  getLawNameAndUrl,
  getPublicBodyNameAndJurisdiction,
} from '../../../utils/fakeApi';
import { getPrintableStatus } from '../../../utils';
import { grey, primaryColor } from '../../../globals/colors';
import { styles } from './styles';
import { styles as tableStyles } from '../Table/styles';
import BlankContainer from '../BlankContainer';
import Heading from '../Heading';
import I18n from '../../../i18n';
import Link from '../Link';
import NavBarIcon from '../../foiRequests/NavBarIcon';
import SubHeading from '../SubHeading';
import Table from '../Table';

class FoiRequestDetails extends React.Component {
  componentDidMount() {
    const locale = I18n.currentLocale().substring(0, 2);
    moment.locale(locale);
  }

  _renderMessageHeader = msg => (
    <View style={[tableStyles.row, styles.msgHeader]}>
      <Text style={[tableStyles.item1, styles.link]}>
        {`${moment(msg.timestamp).format('DD.MM.YYYY')}:`}
      </Text>
      <Text style={[tableStyles.item2, styles.link]}>{msg.sender}</Text>
    </View>
  );

  _renderAttachments = attachments => {
    return attachments.map(att => {
      const isPdf =
        att.filetype === 'application/pdf' ||
        att.name.toLowerCase().endsWith('.pdf'); // hotfix for #38
      let viewPdfButton;

      if (isPdf) {
        viewPdfButton = (
          <Button
            containerViewStyle={styles.viewPdfButton}
            backgroundColor={primaryColor}
            title={I18n.t('foiRequestDetails.viewPdf')}
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
                title={I18n.t('foiRequestDetails.download')}
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
    let escalation = null;

    if (msg.is_escalation) {
      escalation = (
        <View style={tableStyles.row}>
          <Text style={tableStyles.item1}>
            {I18n.t('foiRequestDetails.esclatedTo')}
          </Text>
          <TouchableHighlight
            style={[tableStyles.item2, styles.linkTouchable]}
            underlayColor={grey}
          >
            <Text style={styles.link}>{msg.recipient_public_body}</Text>
          </TouchableHighlight>
        </View>
      );
    }

    return (
      <View style={styles.msgContent}>
        {this._renderAttachments(msg.attachments)}
        <View style={tableStyles.row}>
          <Text style={tableStyles.item1}>
            {I18n.t('foiRequestDetails.from')}
          </Text>
          <Text style={tableStyles.item2}>{msg.sender}</Text>
        </View>
        <View style={tableStyles.row}>
          <Text style={tableStyles.item1}>
            {I18n.t('foiRequestDetails.on')}
          </Text>
          <Text style={tableStyles.item2}>
            {moment(msg.timestamp).format('LLLL')}
          </Text>
        </View>
        {escalation}
        <View style={tableStyles.row}>
          <Text style={tableStyles.item1}>
            {I18n.t('foiRequestDetails.subject')}
          </Text>
          <Text style={tableStyles.item2}>{msg.subject}</Text>
        </View>
        <Divider style={styles.dividerBeforeMessageContent} />
        <Text>
          {msg.content_hidden
            ? I18n.t('foiRequestDetails.notYetVisible')
            : msg.content.trim()}
        </Text>
      </View>
    );
  };

  _renderTable = () => {
    const {
      status,
      resolution,
      refusal_reason: refusalReason,
      costs,
      last_message: lastMessage,
      first_message: firstMessage,
      due_date: dueDate,
      law,
    } = this.props.request;

    const { realStatus } = getPrintableStatus(status, resolution);

    const tableData = [
      {
        label: I18n.t('status'),
        value: <Text>{I18n.t(realStatus)}</Text>,
      },
    ];

    if (refusalReason) {
      tableData.push({
        label: I18n.t('foiRequestDetails.refusalReason'),
        value: <Text>{refusalReason}</Text>,
      });
    }

    if (costs && costs !== 0) {
      tableData.push({
        label: I18n.t('foiRequestDetails.costs'),
        value: <Text>{costs}</Text>,
      });
    }

    tableData.push({
      label: I18n.t('foiRequestDetails.startedOn'),
      value: <Text>{moment(firstMessage).format('LLL')}</Text>,
    });

    tableData.push({
      label: I18n.t('foiRequestDetails.lastMessage'),
      value: <Text>{moment(lastMessage).format('LLL')}</Text>,
    });

    if (dueDate) {
      tableData.push({
        label: I18n.t('foiRequestDetails.dueDate'),
        value: <Text>{moment(dueDate).format('LL')}</Text>,
      });
    }

    const { name: lawName, site_url: lawUrl } = getLawNameAndUrl(law);

    if (lawName && lawUrl) {
      tableData.push({
        label: I18n.t('foiRequestDetails.law'),
        value: <Link label={breakLongWords(lawName)} url={lawUrl} />,
      });
    }

    return (
      <View style={styles.table}>
        <Table data={tableData} />
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
        content_hidden,
        is_escalation,
        recipient_public_body,
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
          content_hidden,
          is_escalation,
          recipient_public_body,
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
    const { title, public_body: publicBody, description } = this.props.request;
    let subheading = <Text style={styles.subheading}>Not Yet Specified</Text>;
    if (publicBody) {
      const {
        publicBodyName,
        jurisdictionName,
        publicBodyId,
      } = getPublicBodyNameAndJurisdiction(publicBody);
      subheading = (
        <View>
          <TouchableHighlight
            style={{
              alignSelf: 'center',
            }}
            underlayColor={grey}
            onPress={() => this.props.navigateToPublicBody({ publicBodyId })}
          >
            <View>
              <SubHeading style={[styles.subheading, styles.link]}>
                {publicBodyName}
              </SubHeading>
            </View>
          </TouchableHighlight>
          <Text style={[styles.subheadingJurisdiction]}>
            ({jurisdictionName})
          </Text>
        </View>
      );
    }

    return (
      <BlankContainer>
        <Heading style={styles.heading}>{title}</Heading>
        <View>
          <Text style={styles.subheadingTo}>
            {I18n.t('foiRequestDetails.to')}
          </Text>
          {subheading}
        </View>
        {this._renderTable()}
        <View style={styles.summary}>
          <Text>{description}</Text>
        </View>
        {this._renderMessages()}
      </BlankContainer>
    );
  }
}

FoiRequestDetails.navigationOptions = ({ navigation }) => {
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
      <NavBarIcon iconName={iconName} iconType={iconType} onPress={share} />
    ),
  };
};

FoiRequestDetails.propTypes = {
  navigateToPdfViewer: PropTypes.func.isRequired,
  navigateToPublicBody: PropTypes.func.isRequired,
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
        content: PropTypes.string,
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

export default FoiRequestDetails;
