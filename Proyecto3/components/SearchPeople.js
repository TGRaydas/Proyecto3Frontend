import React, { Component } from 'react';
import {StyleSheet, Text, ScrollView, View, ActivityIndicator, Dimensions, KeyboardAvoidingView, TextInput} from 'react-native';
import LocationItem from '../Locationitem'


export default class SearchPeople extends Component {
    constructor(props){
        super(props);
        this.state = {inputLenght: 0, inputStart: 2, inputValue: '', resultData: [], isSearching:false}
        setLocation = this.props.setLocation
        this.setInputText = this.setInputText.bind(this)
    }
    componentDidMount() {
        // Instead of navigator.geolocation, just use Geolocation.
    }

    clearSearch(){
        this.setState({resultData: []})
    }

    setInputText(text){
        this.setState({inputValue: text})
        this.clearSearch()
        this.getGeocode(text)
    }

    fiendsRequests(){
        this.setState({isSearching: true})
        requestFriendsUrl = global.domain + 'search_friends'
        fetch(requestPlacesUrl)
            .then((response) => response.json())
            .then((responseJson) => {
        this.setState({
          isLoading: false,
          resultData: responseJson.predictions,
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
            marginTop: 40,
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
        if (this.state.inputLenght > 3){
            this.fiendsRequests();
        }
    }


    render() {
      return (
        <React.Fragment>
             <View>   
            <KeyboardAvoidingView>
                <TextInput style={styles.textInput} value={this.state.inputValue} onChangeText={(text) => this.inputManager(text)} placeholder={'Ingrese destino'} />
                {this.state.isSearching && <ActivityIndicator size="large" color="red" />}
                <ScrollView style={this.getScrollViewStyle()}>
                    {this.state.resultData.map(location => (
                    <LocationItem
                        {...location}
                        setText = {this.setInputText}
                        key={location.place_id}
                        description={location.description}
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
    marginTop: 40,
    paddingLeft: 10,
    marginHorizontal: 20,
    borderRadius: 20,
    borderColor: 'black',
  },
  
});