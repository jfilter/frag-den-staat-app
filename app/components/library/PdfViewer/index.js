// TODO: Everything, espcially styling and a share/export button.

import {
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  View,
  Text,
} from 'react-native';
import Pdf from 'react-native-pdf';
import React from 'react';

import { greyDark, primaryColor } from '../../../globals/colors';

export default class PDFExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pageCount: 1,
    };
    this.pdf = null;
  }

  componentDidMount() {}

  prePage = () => {
    if (this.pdf) {
      let prePage = this.state.page > 1 ? this.state.page - 1 : 1;
      this.pdf.setNativeProps({ page: prePage });
      this.setState({ page: prePage });
      console.log(`prePage: ${prePage}`);
    }
  };

  nextPage = () => {
    if (this.pdf) {
      let nextPage =
        this.state.page + 1 > this.state.pageCount
          ? this.state.pageCount
          : this.state.page + 1;
      this.pdf.setNativeProps({ page: nextPage });
      this.setState({ page: nextPage });
      console.log(`nextPage: ${nextPage}`);
    }
  };

  render() {
    const uri = this.props.navigation.state.params.uri;
    let source = {
      uri,
      cache: true,
    };

    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableHighlight
            disabled={this.state.page === 1}
            style={this.state.page === 1 ? styles.btnDisable : styles.btn}
            onPress={() => this.prePage()}
          >
            <Text style={styles.btnText}>{'Previous'}</Text>
          </TouchableHighlight>
          <TouchableHighlight
            disabled={this.state.page === this.state.pageCount}
            style={
              this.state.page === this.state.pageCount
                ? styles.btnDisable
                : styles.btn
            }
            onPress={() => this.nextPage()}
          >
            <Text style={styles.btnText}>{'Next'}</Text>
          </TouchableHighlight>
        </View>
        <Pdf
          ref={pdf => {
            this.pdf = pdf;
          }}
          source={source}
          page={1}
          horizontal={false}
          enableAntialiasing={false}
          fitWidth={true}
          onLoadComplete={pageCount => {
            this.setState({ pageCount: pageCount });
          }}
          onPageChanged={(page, pageCount) => {
            this.setState({ page: page });
          }}
          onError={error => {
            console.log(error);
          }}
          style={styles.pdf}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
  },
  btn: {
    margin: 5,
    padding: 5,
    backgroundColor: primaryColor,
  },
  btnDisable: {
    margin: 5,
    padding: 5,
    backgroundColor: greyDark,
  },
  btnText: {
    color: '#FFF',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
});
