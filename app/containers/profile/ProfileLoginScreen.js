import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const ProfileLoginScreen = ({ navigation, isLoggedIn, login, goBack }) => {
  let content;
  if (isLoggedIn) {
    content = (
      <View>
        <Text>You are now logged in!</Text>
        <Button onPress={goBack} title="Go back" />
      </View>
    );
  } else {
    content = (
      <View>
        <Text style={styles.welcome}>Screen Login</Text>
        <Text style={styles.instructions}>Your instructions are here.</Text>
        <Button onPress={login} title="Log in" />
      </View>
    );
  }

  return <View style={styles.container}>{content}</View>;
};

ProfileLoginScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

ProfileLoginScreen.navigationOptions = {
  title: 'Log In',
};

const mapStateToProps = state => ({
  isLoggedIn: state.authentication.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  login: () => dispatch({ type: 'LOGIN' }),
  goBack: () => dispatch(NavigationActions.back()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileLoginScreen);
