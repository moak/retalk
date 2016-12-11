import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Chat from '../components/Chat'
import * as usersActions from '../actions/users'
import { Actions, Router, Scene } from 'react-native-router-flux'

import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

class App extends React.Component {

  render() {
    return (
      <View>
        <Text onPress={Actions.pageTwo}>This is Pane!</Text>
        <Chat {...this.props} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(usersActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
