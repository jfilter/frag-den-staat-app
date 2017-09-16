import React from 'react';
import { Button } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

const AuthButton = ({ logout, loginScreen, isLoggedIn }) => (
  <Button
    title={isLoggedIn ? 'Log Out' : 'Open Login Screen'}
    onPress={isLoggedIn ? logout : loginScreen}
  />
);

AuthButton.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  loginScreen: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.authentication.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({ type: 'LOGOUT' }),
  loginScreen: () =>
    dispatch(NavigationActions.navigate({ routeName: 'ProfileLogin' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthButton);
