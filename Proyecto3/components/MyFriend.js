import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default class MyFriend extends Component {
    constructor(props){
        super(props);
    }


    render() {
      return (
              <View style={styles.container}>
                  <Text>{this.props.item.nickname}</Text>
              </View>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 100,
    justifyContent: 'space-around',
    width: Dimensions.get("window").width
  },
  nameApp:{
      alignSelf: 'center'
  }
});