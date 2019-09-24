import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default class FriendRequest extends Component {
    constructor(props){
        super(props);
        getUserID = this.getUserID.bind(this);
    }
    getUserID(){
      return this.props.item.user_id
    }
    handleAcceptRequest(){
      fetch(global.domain + '/update_request', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: global.user_id,
          user_sender: getUserID(),
          state: 2
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {

      })
    }

    handleRejectRequest(){
      fetch(global.domain + '/update_request', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: global.user_id,
          user_sender: getUserID(),
          state: 0
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        
      })
    }

    render() {
      if(this.props.state == 1){
        return (
                <View style={styles.container}>
                    <Text>{this.props.item.nickname}</Text>
                    <TouchableOpacity onPress={this.handleAcceptRequest}><Text>Accept</Text></TouchableOpacity>
                    <TouchableOpacity onPress={this.handleRejectRequest}><Text>Reject</Text></TouchableOpacity>
                </View>
        )
      }
      else{
        return(
          <View style={styles.container}>
                  <Text>{this.props.item.nickname}</Text>
          </View>
        )
      }
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