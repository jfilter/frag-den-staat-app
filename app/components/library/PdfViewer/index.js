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
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
});

class PdfViewer extends React.Component {
  constructor(props) {
    super(props);
    this.pdf = null;
  }

  render() {
    const uri = this.props.navigation.state.params.uri;
    let source = {
      uri,
      cache: true,
    };

    return (
      <View style={styles.container}>
        <Pdf
          ref={pdf => {
            this.pdf = pdf;
          }}
          source={source}
          page={1}
          horizontal={false}
          enableAntialiasing={false}
          fitWidth
          style={styles.pdf}
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
    iconName = 'ios-share-outline';
    iconType = 'ionicon';
  }

  return {
    title: I18n.t('attachment'),
    headerRight: (
      <NavBarIcon iconName={iconName} iconType={iconType} onPress={share} />
    ),
  };
};

export default PdfViewer;
