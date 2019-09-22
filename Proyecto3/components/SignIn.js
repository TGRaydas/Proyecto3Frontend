import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
export default class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {username:'pgrand@miuandes.cl', password: '1616831c', showPass:true, isLoading:false}
        setState = this.setState.bind(this)
        getPassword = this.getPassword.bind(this)
        getUsername = this.getUsername.bind(this)
        requestSignIn = this.requestSignIn.bind(this)
        navigation = this.props.navigation
    }
    componentDidMount(){
        
    }

    getUsername(){
      return this.state.username;
    }
    getPassword(){
      return this.state.password;
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
                DefaultPreference.set('email', null).then(function() {console.log('done')});
                DefaultPreference.set('password', null).then(function() {console.log('done')});
                return false
              }
              
              navigation.push('drawerStack')
              DefaultPreference.set('email', getUsername()).then(function() {console.log('done')});
              DefaultPreference.set('password', getPassword()).then(function() {console.log('done')});
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