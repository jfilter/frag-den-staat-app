import { CheckBox } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { TextInput, Text } from 'react-native';
import { connect } from 'react-redux';
import React from 'react';

import { spaceMore } from '../../globals/content';
import BlankContainer from '../../components/library/BlankContainer';
import Heading from '../../components/library/Heading';
import I18n from '../../i18n';
import StandardButton from '../../components/library/StandardButton';
import SubHeading from '../../components/library/SubHeading';
import { primaryColor } from '../../globals/colors';

class NewRequestWriteScreen extends React.Component {
  state = {
    title: '',
    description: '',
    letterStart: null,
    letterEnd: null,
    anon: false,
  };

  async componentDidMount() {
    const { publicBody } = this.props.navigation.state.params;
    const response = await fetch(publicBody.resource_uri);
    const data = await response.json();

    // choose the law that combines the most laws
    let maxCombined = -1;
    let letterStart;
    let letterEnd;

    data.laws.forEach(x => {
      if (x.combined.length > maxCombined) {
        maxCombined = x.combined.length;
        letterStart = x.letter_start;
        letterEnd = x.letter_end;
      }
    });

    this.setState({ letterStart, letterEnd });
  }

  render() {
    const { title, description, letterEnd, letterStart, anon } = this.state;
    const { publicBody } = this.props.navigation.state.params;

    return (
      <BlankContainer>
        <Heading style={{ margin: spaceMore }}>
          {I18n.t('newRequestScreen.write')}
        </Heading>

        <SubHeading style={{ marginBottom: spaceMore }}>
          {I18n.t('newRequestScreen.title')}
        </SubHeading>

        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 5,
          }}
          onChangeText={title => this.setState({ title })}
          value={title}
          maxLength={230}
        />

        <SubHeading style={{ marginTop: spaceMore, marginBottom: spaceMore }}>
          {I18n.t('newRequestScreen.desc')}
        </SubHeading>
        <Text>{I18n.t('newRequestScreen.expl')}</Text>

        <TextInput
          style={{
            height: 160,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 5,
            marginTop: spaceMore,
          }}
          onChangeText={description => this.setState({ description })}
          value={description}
          multiline
        />
        <CheckBox
          title={I18n.t('newRequestScreen.anon')}
          checked={this.state.anon}
          containerStyle={{ marginVertical: spaceMore }}
          onPress={() => this.setState({ anon: !this.state.anon })}
          checkedColor={primaryColor}
        />

        <StandardButton
          title={I18n.t('newRequestScreen.confirm')}
          containerViewStyle={{ marginTop: spaceMore }}
          onPress={() =>
            this.props.dispatch(
              NavigationActions.navigate({
                routeName: 'NewRequestConfirm',
                params: {
                  publicBody,
                  title,
                  description,
                  letterStart,
                  letterEnd,
                  anon,
                },
              })
            )
          }
        />
      </BlankContainer>
    );
  }
}

NewRequestWriteScreen.navigationOptions = {
  title: I18n.t('newRequest'),
};

export default connect()(NewRequestWriteScreen);
