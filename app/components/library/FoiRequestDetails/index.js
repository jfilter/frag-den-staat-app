import 'moment/locale/de';

import { Divider, Icon } from 'react-native-elements';
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

import { ORIGIN } from '../../../globals';
import { breakLongWords } from '../../../utils/strings';
import { getPrintableStatus } from '../../../utils';
import { greyLight, primaryColor } from '../../../globals/colors';
import { spaceMore } from '../../../globals/content';
import { styles } from './styles';
import { styles as tableStyles } from '../Table/styles';
import BlankContainer from '../BlankContainer';
import Heading from '../Heading';
import I18n from '../../../i18n';
import Link from '../Link';
import NavBarIcon from '../../foiRequests/NavBarIcon';
import StandardButton from '../StandardButton';
import SubHeading from '../SubHeading';
import Table from '../Table';

class FoiRequestDetails extends React.Component {
  componentDidMount() {
    const locale = I18n.currentLocale().substring(0, 2);
    moment.locale(locale);

    const { messages } = this.props.messages;
    if (messages.length === 0) {
      this.props.fetchMessages(this.props.request.messages);
    }
  }

  _renderMessageHeader = msg => (
    <View style={[tableStyles.row, styles.msgHeader]}>
      <Text style={[tableStyles.item1, styles.link]}>
        {`${moment(msg.timestamp).format('DD.MM.YYYY')}`}
      </Text>
      <View style={[tableStyles.item2, styles.item2]}>
        <Text
          style={{
            color: primaryColor,
            flexShrink: Platform.OS === 'ios' ? 1 : 1.1, // for some strange reason, this fixes a bug of the attach icon overlapping on Android
          }}
        >
          {msg.sender}
        </Text>
        {msg.attachments.length > 0 && (
          <Icon name="attach-file" size={20} color={primaryColor} />
        )}
      </View>
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
          <StandardButton
            title={I18n.t('foiRequestDetails.viewPdf')}
            onPress={() => this.props.navigateToPdfViewer({ uri: att.url })}
            icon={{ name: 'remove-red-eye', color: primaryColor }}
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
              <StandardButton
                title={I18n.t('foiRequestDetails.download')}
                icon={{ name: 'file-download', color: primaryColor }}
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
          <Text style={tableStyles.item2}>
            {
              TODO
              // TODO: get it working again with new API
              // getPublicBodyNameAndJurisdiction(msg.recipient_public_body)
              //   .publicBodyName
            }
          </Text>
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
          <Text selectable style={tableStyles.item2}>
            {msg.sender}
          </Text>
        </View>
        <View style={tableStyles.row}>
          <Text style={tableStyles.item1}>
            {I18n.t('foiRequestDetails.on')}
          </Text>
          <Text selectable style={tableStyles.item2}>
            {moment(msg.timestamp).format('LLLL')}
          </Text>
        </View>
        {escalation}
        <View style={tableStyles.row}>
          <Text style={tableStyles.item1}>
            {I18n.t('foiRequestDetails.subject')}
          </Text>
          <Text selectable style={tableStyles.item2}>
            {msg.subject}
          </Text>
        </View>
        <Divider style={styles.dividerBeforeMessageContent} />
        <Text selectable>
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
        value: <Text selectable>{I18n.t(realStatus)}</Text>,
      },
    ];

    if (refusalReason) {
      tableData.push({
        label: I18n.t('foiRequestDetails.refusalReason'),
        value: <Text selectable>{refusalReason}</Text>,
      });
    }

    if (costs && costs !== 0) {
      tableData.push({
        label: I18n.t('foiRequestDetails.costs'),
        value: <Text selectable>{costs}</Text>,
      });
    }

    tableData.push({
      label: I18n.t('foiRequestDetails.startedOn'),
      value: <Text selectable>{moment(firstMessage).format('LLL')}</Text>,
    });

    tableData.push({
      label: I18n.t('foiRequestDetails.lastMessage'),
      value: <Text selectable>{moment(lastMessage).format('LLL')}</Text>,
    });

    if (dueDate) {
      tableData.push({
        label: I18n.t('foiRequestDetails.dueDate'),
        value: <Text selectable>{moment(dueDate).format('LL')}</Text>,
      });
    }

    const { name: lawName, resource_uri: lawUrl } = law;

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
    const { messages } = this.props.messages;
    if (messages.length === 0) {
      return;
    }

    const filtedMessages = messages.filter(x => !x.not_publishable);

    const messagesPrintable = filtedMessages.map(
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
          sections={messagesPrintable.reverse()} // show latest messages first
          renderHeader={this._renderMessageHeader}
          renderContent={this._renderMessageContent}
          underlayColor={greyLight}
          initiallyActiveSection={0}
          touchableProps={{
            style: {
              marginVertical: spaceMore / 2,
            },
            hitSlop: {
              top: spaceMore / 2,
              bottom: spaceMore / 2,
              left: spaceMore / 2,
              right: spaceMore / 2,
            },
          }}
        />
      </View>
    );
  };

  render() {
    const { title, public_body: publicBody, description } = this.props.request;
    let subheading = (
      <SubHeading style={styles.subheading}>
        {I18n.t('foiRequestDetails.notYetSpecified')}
      </SubHeading>
    );
    if (publicBody) {
      const {
        id: publicBodyId,
        name: publicBodyName,
        jurisdiction,
      } = publicBody;
      const { name: jurisdictionName } = jurisdiction;

      subheading = (
        <View>
          <TouchableHighlight
            style={{
              alignSelf: 'center',
            }}
            underlayColor={greyLight}
            onPress={() => this.props.navigateToPublicBody({ publicBodyId })}
          >
            <View>
              <SubHeading style={[styles.subheading, styles.link]}>
                {publicBodyName}
              </SubHeading>
            </View>
          </TouchableHighlight>
          <Text selectable style={[styles.subheadingJurisdiction]}>
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
          <Text selectable>
            {description ||
              'The API currently does not provide a description but this will get fixed soon.'}
          </Text>
        </View>
        {this._renderMessages()}
      </BlankContainer>
    );
  }
}

FoiRequestDetails.navigationOptions = ({ navigation }) => {
  const requestId = navigation.state.params.request.id;
  const url = `${ORIGIN}/a/${requestId}`;

  function share() {
    Share.share(
      {
        ...Platform.select({
          ios: {
            url,
          },
          android: {
            message: url,
          },
        }),
        title: 'FragDenStaat',
      },
      {
        ...Platform.select({
          android: {
            // Android only:
            dialogTitle: `Share: ${url}`,
          },
        }),
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
    public_body: PropTypes.object.isRequired,
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
