import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'react-native-firebase';
import Title from './Title'
export default class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {username:'', password: '', conf_password: '', showPass:true, isLoading:false}
        setState = this.setState.bind(this)
        getPassword = this.getPassword.bind(this)
        getUsername = this.getUsername.bind(this)
        firebaseSignUp = this.firebaseSignUp.bind(this)
    }
    static navigationOptions = {
        title: 'Sign Up!',
       
      }
    getUsername(){
      return this.state.username;
    }
    getPassword(){
      return this.state.password;
    }
    async firebaseSignUp(email, password){
      try {
          await firebase.auth().createUserWithEmailAndPassword(email, password)
      } catch (error) {
        alert(error)
      }
    }
    handleCreateUser(){
      setState({isLoading: true})
      fetch(global.domain+'/users',{
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: getUsername(),
          password: getPassword(),
          }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
    
          setState({
            isLoading: false,
            dataSource: responseJson.status,
          }, function(){
              global.userID = responseJson.userid
              //firebaseSignUp(getUsername(), getPassword());
              navigation.push('drawerStack')
          });
    
        })
        .catch((error) =>{
          console.error(error);
        });
    }
    goToSignUp(){
      navigation.replace('loginScreen')
      navigation.navigate('loginScreen')
    }
    render() {
      return (
        <ScrollView style = { styles.container }>
          <KeyboardAvoidingView>
          <View style={{width: '100%', height: 40, alignItems: 'center'}}>
            <Title />
          </View>
          <View style={styles.viewContainer}>
          <View style={styles.row}>
          <Text style={styles.text}>Username</Text>
            <TextInput
                style={styles.input}
                placeholder={"Username"}
                value = {this.state.username}
                onChangeText={(text) => this.setState({username: text})}
                value={this.state.username}
                />
          </View>
          <View style={styles.row}>
              <Text style={styles.text}>Password</Text>
                <TextInput
                placeholder={"Password"}
                value = {this.state.password}
                secureTextEntry={this.state.showPass}
                style={styles.input}
                onChangeText={(text) => this.setState({password: text})}
                value={this.state.password}
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Confirm</Text>
                <TextInput
                style={styles.input}
                secureTextEntry={this.state.showPass}
                placeholder={"Confirm Password"}
                onChangeText={(text) => this.setState({conf_password: text})}
                value={this.state.conf_password}
                />
            </View>
              <TouchableOpacity style={styles.button} onPress={this.handleCreateUser}>
                {this.state.isLoading ? (
                    <ActivityIndicator />
                  ) : (
                    <Text>Create Account</Text>
                  )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={this.goToSignUp} style={styles.helpView}>
            <Text >Volver</Text>
          </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    flex: 1,
    backgroundColor: '#006c92',
    borderColor: '#FFF',
    width: Dimensions.get("window").width
  },
   viewContainer:{
    marginTop: 40, width: '100%',

    alignItems: 'center',
   } ,
  input: {
    backgroundColor: 'white',
    paddingLeft: 10,
    //borderColor: 'black',
    borderWidth: 1,
    padding: 2,
    marginLeft: 10,
    height: 40,
    borderRadius: 50,
    width: '95%',
  },
  helpView:{
   marginTop: 10, width: '100%',

   alignItems: 'center',
  },
  row: {
      height: '15%',
      width: '70%',
      marginTop: 30,
   
  },
  text:{
    textAlign: 'center',
    marginBottom: 10,
  },
  button:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1fc414',
    height: 50,
    marginTop: 50,
    width: 200,
    borderRadius: 20,
  }
  
});