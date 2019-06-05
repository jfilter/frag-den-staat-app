import { ActivityIndicator, View, Text } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import React from 'react';

import { primaryColorLight } from '../../globals/colors';
import { spaceMore } from '../../globals/content';
import BlankContainer from '../../components/library/BlankContainer';
import Heading from '../../components/library/Heading';
import I18n from '../../i18n';
import StandardButton from '../../components/library/StandardButton';
import { getCurrentAccessTokenOrRefresh } from '../../utils/oauth';
import { errorAlert, successAlert } from '../../utils/dropDownAlert';

class NewRequestConfirmScreen extends React.Component {
  state = { sending: false, success: false, fail: false };

  sendRequest = async () => {
    this.setState({ sending: true, success: false, fail: false });

    const {
      title,
      description,
      publicBody,
      anon,
    } = this.props.navigation.state.params;

    const data = {
      subject: title,
      body: description,
      publicbodies: [publicBody.id],
      public: !anon,
      full_text: false,
      // reference: `fds-mobile-app:${Platform.OS}`,
    };

    // I am not 100% sure whther it currently really works.
    // Maybe continue working on manually getting the CSRF token.
    // const r = await fetch('https://fragdenstaat.de/account/login/');
    // console.log(r);
    // console.log(r.headers.map);
    // let csrfString = r.headers.map['set-cookie'][0];
    // csrfString = csrfString.split('csrftoken=')[0];
    // csrfString = csrfString.split(';')[0];

    // console.log(csrfString);
    const accessToken = await this.props.getAccessToken();

    fetch('https://fragdenstaat.de/api/v1/request/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        Referer: 'https://fragdenstaat.de/app',
        'User-Agent': 'FragDenStaat App',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(response => {
        // weird status
        if (response.status === 'success') {
          successAlert
            .getDropDown()
            .alertWithType(
              'success',
              I18n.t('newRequestScreen.alertSuccessTitle'),
              I18n.t('newRequestScreen.alertSuccessMessage')
            );

          this.setState({ success: true });
        } else {
          errorAlert
            .getDropDown()
            .alertWithType(
              'error',
              I18n.t('newRequestScreen.alertError'),
              response.message
            );

          this.setState({ fail: true });
        }
      })
      .catch(error => {
        this.setState({ fail: true });
        errorAlert
          .getDropDown()
          .alertWithType('error', I18n.t('newRequestScreen.alertError'), error);
      });
  };

  render() {
    const {
      title,
      description,
      publicBody,
      letterStart,
      letterEnd,
      anon,
    } = this.props.navigation.state.params;
    const { name } = this.props;
    const { sending, success, fail } = this.state;

    const visibleName = anon ? '<< Anfragesteller/in >>' : name;
    const wholeText = [
      `An: ${publicBody.name}`,
      `Betreff: ${title}`,
      letterStart,
      description,
      letterEnd,
      visibleName,
    ].join('\n\n');

    return (
      <BlankContainer>
        <Heading style={{ margin: spaceMore }}>
          {I18n.t('newRequestScreen.sendTitle')}
        </Heading>

        <Text>{wholeText}</Text>

        <View style={{ marginTop: spaceMore }} />

        {!sending && !success && !fail && (
          <StandardButton
            title={I18n.t('newRequestScreen.send')}
            onPress={() => this.sendRequest()}
          />
        )}
        {sending && !success && !fail && (
          <ActivityIndicator animating size="large" color={primaryColorLight} />
        )}
        {success && (
          <Button
            icon={<Icon name="check" size={15} color="white" />}
            disabledStyle={{
              backgroundColor: '#32A54A',
            }}
            disabledTitleStyle={{
              color: 'white',
            }}
            iconRight
            title={I18n.t('newRequestScreen.success')}
            disabled
          />
        )}
        {fail && (
          <Button
            icon={<Icon name="repeat" size={15} color="white" />}
            buttonStyle={{
              backgroundColor: '#cc3232',
            }}
            titleStyle={{
              color: 'white',
            }}
            iconRight
            title={I18n.t('newRequestScreen.fail')}
            onPress={() => this.sendRequest()}
          />
        )}
      </BlankContainer>
    );
  }
}

NewRequestConfirmScreen.navigationOptions = {
  title: I18n.t('newRequest'),
};

const mapStateToProps = state => {
  return {
    name: `${state.authentication.firstName} ${state.authentication.lastName}`,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAccessToken: () =>
      dispatch((innerDispatch, getState) =>
        getCurrentAccessTokenOrRefresh(innerDispatch, getState)
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewRequestConfirmScreen);
