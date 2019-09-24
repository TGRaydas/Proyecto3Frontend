import React, { Component } from 'react';
import {StyleSheet, Text, ScrollView, View, ActivityIndicator, Dimensions, KeyboardAvoidingView, TextInput} from 'react-native';
import UserSearch from './UserSearch'
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class SearchPeople extends Component {
    constructor(props){
        super(props);
        this.state = {inputLenght: 0, inputStart: 1, inputValue: '', resultData: [], isSearching:false}
        this.setInputText = this.setInputText.bind(this)
        getInputText = this.getInputText.bind(this)
    }
    componentDidMount() {
        // Instead of navigator.geolocation, just use Geolocation.
    }
    handlerSendRequest(text){
      fetch(global.domain + 'create_request', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: global.userID,
          user_sender: text,
          state: 1
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
          alert("Se envió la solicitud")
      })
    }
    clearSearch(){
        this.setState({resultData: []})
    }
    getInputText(){
      return this.state.inputValue;
    }
    setInputText(text){
        this.setState({inputValue: ''})
        this.handlerSendRequest(text)
        this.clearSearch()
    }

    fiendsRequests(){
        this.setState({isSearching: true})
        requestFriendsUrl = global.domain + 'search_friends?query=' + this.state.inputValue
        fetch(requestFriendsUrl)
            .then((response) => response.json())
            .then((responseJson) => {
        this.setState({
          isLoading: false,
          resultData: responseJson.profiles,
        }, function(){
            this.setState({isSearching: false})
        });
        })
        .catch((error) =>{
            console.error(error);
        });
    }                      

    getScrollViewStyle(){
        if(this.props.viewAdapter == 1){
          return {
            marginTop: 0,
            backgroundColor: 'white',
            width: Dimensions.get("window").width - 40
          }
        }
        else{
          return {
            backgroundColor: 'white',
            width: Dimensions.get("window").width - 40,
            marginHorizontal: 20,
          }
        }
      }


    inputManager(text){
        this.setState({inputValue: text, inputLenght: text.length})
        if (this.state.inputLenght > 1){
            this.fiendsRequests();
        }
    }


    render() {
      return (
        <React.Fragment>
             <View>   
            <KeyboardAvoidingView>
                <TextInput style={styles.textInput} value={this.state.inputValue} onChangeText={(text) => this.inputManager(text)} placeholder={'Buscar personas'} />
                {this.state.isSearching && <ActivityIndicator size="large" color="red" />}
                <ScrollView style={this.getScrollViewStyle()}>
                    {this.state.resultData.map(location => (
                    <UserSearch
                        {...location}
                        setText = {this.setInputText}
                        key={location.id}
                        description={location.nickname}
                  />))}
                </ScrollView>
            </KeyboardAvoidingView>
            
       </View>
      </React.Fragment>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: Dimensions.get("window").width - 40
  },
  textInput: {
    backgroundColor: 'rgb(255, 255, 255)',
    width: Dimensions.get("window").width - 40,
    height: 40,
    marginTop:10,
    paddingLeft: 10,
    marginHorizontal: 20,
    borderRadius: 20,
    borderColor: 'black',
  },
  
});