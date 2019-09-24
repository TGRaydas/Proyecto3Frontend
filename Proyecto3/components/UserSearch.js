import React, { PureComponent } from 'react';
import { View, Alert, Text, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';

class UserSearch extends PureComponent {
    constructor(props){
        super(props);
        setText = this.props.setText
        description = this.props.description
    }


  render() {
    return (
      <TouchableOpacity style={styles.root} onPress={(e) => setText(this.props.description)}>
        <Text>{this.props.description}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    padding: 10,
    borderRadius: 20,
    height: 40,
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center'
  }
})

export default UserSearch;