import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, FlatList , Image, SectionList, ActivityIndicator, TouchableOpacity } from 'react-native';
import FriendRequest from './FriendRequest'
import MyFriends from './MyFriend'
import SearchPeople from './SearchPeople'
export default class Friends extends Component {
    constructor(props){
        super(props);
        this.state = { isLoading: true};
    }
    componentDidMount(){
      return fetch(global.domain + 'friends/'+global.userID)
        .then((response) => response.json())
        .then((responseJson) => {
  
          this.setState({
            isLoading: false,
            dataSource: responseJson.friends,
            pending: responseJson.pending
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
      const DATA = [
        {
          title: 'Friend Requests',
          state: 1,
          data: this.state.pending,
        },
        {
          title: 'Friends',
          state: 2, 
          data: this.state.dataSource,
        }
      ];
      return(
        <View style={{flex: 1, paddingTop:20}}>
          <SearchPeople />
          <SectionList
            sections={DATA}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item, section: {state} }) =>  <FriendRequest state={state} item={item} />}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.header}>{title}</Text>
            )}
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