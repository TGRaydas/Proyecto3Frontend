import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, FlatList , Image, SectionList, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import FriendRequest from './FriendRequest'
import MyFriends from './MyFriend'
import SearchPeople from './SearchPeople'
import Icon from 'react-native-vector-icons/FontAwesome'
export default class Friends extends Component {
    constructor(props){
        super(props);
        this.state = { isLoading: true, refreshing: false};
        loadData = this.loadData.bind(this);
        handlerRefresh = this.handlerRefresh.bind(this)
    }
    loadData(){
      fetch(global.domain + 'friends/'+global.userID)
        .then((response) => response.json())
        .then((responseJson) => {
  
          this.setState({
            isLoading: false,
            refreshing: false,
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
    componentDidMount(){
      this.loadData() 
    }
    handlerRefresh(){
      loadData()
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
          <View style={{flexDirection: 'row'}}>
          <Icon style={{marginTop: 10}} name='search' size={20} color='black'/>
          <SearchPeople />
          </View>
          <KeyboardAvoidingView>
          <SectionList
            sections={DATA}
            refreshing={this.state.refreshing}
            onRefresh={this.handlerRefresh}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item, section: {state} }) =>  <FriendRequest reload={handlerRefresh} state={state} user_id={item.user_id} item={item} />}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.header}>{title}</Text>
            )}
          />
          </KeyboardAvoidingView>
          
          
        </View>
      );
    }
}

const styles = StyleSheet.create({
  header:{
    padding: 20,
  },
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