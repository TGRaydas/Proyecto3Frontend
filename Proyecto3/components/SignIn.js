import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import * as firebase from 'react-native-firebase';


const getToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  if (!fcmToken) {
    fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      await AsyncStorage.setItem('fcmToken', fcmToken);
    }
  }
};


export default class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {username:'pgrand@miuandes.cl', password: 'password', showPass:true, isLoading:false}
        setState = this.setState.bind(this)
        getPassword = this.getPassword.bind(this)
        getUsername = this.getUsername.bind(this)
        requestSignIn = this.requestSignIn.bind(this)
        navigation = this.props.navigation
        firebaseSignIn = this.firebaseSignIn.bind(this)
        sendToken = this.sendToken.bind(this)
    }
    componentDidMount(){
        
    }
    async firebaseSignIn(email, password){
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        //sendToken()
      } catch (error) {
        
      }
    }
    
    getUsername(){
      return this.state.username;
    }
    getPassword(){
      return this.state.password;
    }
    async sendToken(){
      //getToken();
      fetch(global.domain+'/user/token/',{
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: await AsyncStorage.getItem('fcmToken'),
          }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            
        })
        .catch((error) =>{
          console.error(error);
          return false
        });
    }
    
    requestSignIn(email, password){
      fetch(global.domain+'/users/sign_in',{
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password,
          }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
          
          setState({
            isLoading: false,
            dataSource: responseJson,
          }, function(){
              global.userID = responseJson.userid
              if(responseJson.state != "success"){
                alert("Hubo un error en las credenciales");
                return false
              }
              //firebaseSignIn(email, password)
              navigation.push('drawerStack')
              return true
          });
    
        })
        .catch((error) =>{
          console.error(error);
          return false
        });
    }

    handleSignInUser(){
      setState({isLoading: true})
      response = requestSignIn(getUsername(), getPassword())
      if (response){
        navigation.navigate('drawerStack')
      }  
    }
    goToCreateAccount(){
      navigation.navigate('signupScreen')
    }

    render() {
      return (
        <View style = { styles.container }>
          <View style={{width: '100%', height: 40, alignItems: 'center'}}>
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
                secureTextEntry={this.state.showPass}
                value = {this.state.password}
                style={styles.input}
                onChangeText={(text) => this.setState({password: text})}
                value={this.state.password}
                />
            </View>
              <TouchableOpacity style={styles.button} onPress={this.handleSignInUser}>
                {this.state.isLoading ? (
                    <ActivityIndicator />
                  ) : (
                    <Text>Sign In</Text>
                  )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={this.goToCreateAccount} style={styles.helpView}>
            <Text >¿No tienes cuenta?</Text>
          </TouchableOpacity>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  text:{
    textAlign: 'center',
    marginBottom: 10,
  },
  container: {
    backgroundColor: '#006c92',
    flex: 1,
    borderColor: '#FFF',
    width: Dimensions.get("window").width
  },
   viewContainer:{
    marginTop: 40, width: '100%',

    alignItems: 'center',
   } ,
   helpView:{
    marginTop: 10, width: '100%',

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
  row: {
      height: '15%',
      width: '70%',
      marginTop: 50,
   
  },
  button:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1fc414',
    height: 50,
    marginTop: 40,
    width: 200,
    borderRadius: 20,
  }
  
});