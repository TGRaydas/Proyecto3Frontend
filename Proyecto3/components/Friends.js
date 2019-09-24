import React, { Component } from 'react';
import { View, Text, Dimensions, AsyncStorage, StyleSheet, ScrollView, FlatList , Image, SectionList, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import FriendRequest from './FriendRequest'
import MyFriends from './MyFriend'
import SearchPeople from './SearchPeople'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as firebase from 'react-native-firebase'
const getToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  if (!fcmToken) {
    fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      await AsyncStorage.setItem('fcmToken', fcmToken);
    }
  }
};

const requestPermission = async () =>
  firebase
    .messaging()
    .requestPermission()
    .then(() => {
      getToken();
    })
    .catch(error => {
      console.warn(`${error} permission rejected`);
    });


export const checkPermission = async () => {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
    getToken();
  } else {
    requestPermission();
  }
};

const notificationListener = () =>
  firebase.notifications().onNotification(notification => {
    const {
      notifications: {
        Android: {
          Priority: { Max }
        }
      }
    } = firebase;
    notification.android.setChannelId(CHANNEL_NOTIFICATIONS.CHANNEL_ID);
    notification.android.setPriority(Max);
    notification.setData(notification.data);
    firebase.notifications().displayNotification(notification);
  });

export const notificationOpenBackListener = async () => {

  const notificationOpen = await firebase.notifications().getInitialNotification();
  if (notificationOpen) {
    // Agregar el codigo que se considere necesario
  }
};
/*export const createChannel = () => {
  const channel = new firebase.notifications.Android.Channel(
    CHANNEL_NOTIFICATIONS.CHANNEL_ID,
    CHANNEL_NOTIFICATIONS.CHANNEL_NAME,
    firebase.notifications.Android.Importance.Max
  ).setDescription(CHANNEL_NOTIFICATIONS.CHANNEL_DESCRIPTION);
  firebase.notifications().android.createChannel(channel);
};*/

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
      
      //createChannel();
      //checkPermission();
      //notificationListener();
      //notificationOpenBackListener();
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