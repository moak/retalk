import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';


export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <View>
        <Text style={styles.right}>{this.props.right}</Text>
        <Text style={styles.left}>{this.props.left}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  right:{

  },
  left:{
  }
});
