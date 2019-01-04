import { FlatList, Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { SearchBar, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import React from 'react';

import { fontColor, greyDark, primaryColor } from '../../globals/colors';
import {
  searchPublicBodies,
  searchUpdateQueryAction,
} from '../../actions/search';
import { spaceMore } from '../../globals/content';
import BlankContainer from '../../components/library/BlankContainer';
import Heading from '../../components/library/Heading';
import I18n from '../../i18n';
import styles from '../search/styles';

class NewRequestStartScreen extends React.Component {
  _onSubmit = queryText => {
    this.props.dispatch(searchUpdateQueryAction(queryText));
    this.props.dispatch(searchPublicBodies());
  };

  _onSubmitSearchBar = event => {
    const queryText = event.nativeEvent.text.trim();
    this._onSubmit(queryText);
  };

  _renderItem = ({ item: publicBody }) => {
    return (
      <ListItem
        key={publicBody.name}
        title={publicBody.name}
        rightIcon={{ name: 'keyboard-arrow-right', color: primaryColor }}
        onPress={() =>
          this.props.dispatch(
            NavigationActions.navigate({
              routeName: 'NewRequestWrite',
              params: { publicBody },
            })
          )
        }
        titleStyle={{ color: fontColor }}
      />
    );
  };

  render() {
    const size = Platform.OS === 'ios' ? 35 : 26; // for icon
    return (
      <BlankContainer keyboardShouldPersistTaps="handled">
        <Heading style={{ margin: spaceMore }}>
          {I18n.t('newRequestScreen.choose')}
        </Heading>
        <SearchBar
          lightTheme
          icon={{
            type: 'material',
            color: greyDark,
            name: 'search',
            size,
          }}
          clearIcon={{
            color: greyDark,
            name: 'clear',
            size,
          }}
          textInputRef="searchInput"
          placeholder="Bundeskanzleramt, BMI, ..."
          onSubmitEditing={this._onSubmitSearchBar}
          autoFocus
          autoCorrect={false}
          containerStyle={styles.searchBarContainer}
          inputStyle={styles.searchBarInput}
          round
        />
        <FlatList
          data={this.props.results}
          renderItem={this._renderItem}
          keyboardShouldPersistTaps="handled"
        />
      </BlankContainer>
    );
  }
}

NewRequestStartScreen.navigationOptions = {
  title: I18n.t('newRequest'),
};

const mapStateToProps = state => {
  return {
    results: state.search.publicBodiesResults,
  };
};

export default connect(mapStateToProps)(NewRequestStartScreen);
