import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';

export default class Friends extends Component {
    constructor(props){
        super(props);
        this.state = { isLoading: true};
    }
    componentDidMount(){
      return fetch(global.domain + '/friends/'+global.userID)
        .then((response) => response.json())
        .then((responseJson) => {
  
          this.setState({
            isLoading: false,
            dataSource: responseJson.friends,
          }, function(){
            console.log(responseJson.friends)
          });
  
        })
        .catch((error) =>{
          console.error(error);
        });
    }
    render(){
      if(this.state.isLoading){
        return(
          <View style={{flex: 1, padding: 20}}>
            <ActivityIndicator/>
          </View>
        )
      }
      return(
        <View style={{flex: 1, paddingTop:20}}>
          <FlatList
            data={this.state.dataSource}
            renderItem={({item}) => <Text>{item.user_receiver_id}</Text>}
            keyExtractor={({id}, index) => id}
          />
        </View>
      );
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