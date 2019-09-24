import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default class Title extends Component {
    constructor(props){
        super(props);
    }
    render() {
      return (
          <View><Text>CachoApp</Text></View>
              /*<Image
                  style={{height:45, width: '50%'}}
                  source={require('./images/BlueHeader.png')}
              />*/
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    right: 0,
    height: 40,
    backgroundColor: 'blue',
    width: Dimensions.get("window").width
  },
  nameApp:{
      alignSelf: 'center'
  }
});