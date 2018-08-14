import { Dimensions, Platform, Share, StyleSheet, View } from 'react-native';
import Pdf from 'react-native-pdf';
import React from 'react';

import I18n from '../../../i18n';
import NavBarIcon from '../../foiRequests/NavBarIcon';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
  },
});

class PdfViewer extends React.Component {
  constructor(props) {
    super(props);
    this.pdf = null;
    this.state = { width: 100, height: 100 }; // will get overriden on first rendering
  }

  _onLayout = () => {
    const { width, height } = Dimensions.get('window');
    this.setState({ width, height });
  };

  render() {
    const { uri } = this.props.navigation.state.params;
    const source = {
      uri,
      cache: true,
    };

    const { width, height } = this.state;
    return (
      <View style={styles.container} onLayout={this._onLayout}>
        <Pdf
          ref={pdf => {
            this.pdf = pdf;
          }}
          source={source}
          horizontal={false}
          enableAntialiasing={false}
          fitPolicy={0} // this spans the pdf to full width for vertical & horizontal
          style={{ flex: 1, width, height }}
        />
      </View>
    );
  }
}

PdfViewer.navigationOptions = props => {
  const url = props.navigation.state.params.uri;

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
    iconName = 'ios-share';
    iconType = 'ionicon';
  }

  return {
    drawerLockMode: 'locked-closed', // disable global drawer
    title: I18n.t('attachment'),
    headerRight: (
      <NavBarIcon iconName={iconName} iconType={iconType} onPress={share} />
    ),
  };
};

export default PdfViewer;
