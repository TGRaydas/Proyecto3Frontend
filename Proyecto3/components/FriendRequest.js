import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default class FriendRequest extends Component {
    constructor(props){
        super(props);
    }


    render() {
      return (
              <View style={styles.container}>
                  <Text>{this.props.item.nickname}</Text>
                  <TouchableOpacity><Text>Accept</Text></TouchableOpacity>
                  <TouchableOpacity><Text>Reject</Text></TouchableOpacity>
              </View>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 100,
    width: Dimensions.get("window").width
  },
  nameApp:{
      alignSelf: 'center'
  }
});