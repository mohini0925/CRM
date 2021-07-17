import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";

const connect = async (data, setError, navigation) =>{
  const URL = "http://192.168.31.168:3000/login";
  
  try{
     
     const response = await fetch(URL,{
       method: "POST",
       body: JSON.stringify(data),
       headers:{
        "Accept": "application/json",
        "Content-Type": 'application/json',  
       },
     }).then((response)=> response.json()).then((responseJson)=>{
      if(responseJson.error === false){
        navigation.navigate('DrawerNavigatorRoutes');
      }
      else{
       setError(responseJson.message);
      }
     });
  }
  catch(err){
    Alert.alert(err.message);
  }
} 

   
  const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const submitClear=()=>{
      setEmail("");
      setPassword("");
}

    return (
     <View style={styles.container}>
         <Image
            source={require('../assets/crm_logo.png')}
            style={{
              width: '50%',
              height: 100,
              resizeMode: 'contain',
              margin: 30,
              alignSelf: 'center',
            }}
          />
          <Text style={styles.errorText}>{error}</Text>
         <View style={styles.inputView}>
             <TextInput style={styles.textInput}
                placeholder="Email"
                placeholderTextColor="#a0a09e"
                onChangeText={(email) => setEmail(email)}
                value={email}>
             </TextInput>
         </View>
         <View style={styles.inputView}>
             <TextInput style={styles.textInput}
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor="#a0a09e"
                onChangeText={(password) => setPassword(password)}
                value={password}>
             </TextInput>
         </View>
         <TouchableOpacity>
           <Text style={styles.forgotPass}>Forgot Password ?</Text>
         </TouchableOpacity>

         <TouchableOpacity style={styles.loginBtn}  onPress={()=> {
           const data = {
            email: email,
            password: password,
          };
          connect(data, setError, navigation) 
          submitClear()}}>
           <Text style={styles.loginText}>Login</Text>
         </TouchableOpacity>

         
         <Text style={styles.create}>Don't have an account? <Text onPress={() => navigation.navigate('RegisterScreen')} style={styles.signup}>Sign Up</Text></Text>

     </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
    //   alignItems: 'center'
    },

    errorText:{
      textAlign: "center",
      marginBottom: 20,
      fontSize: 16,
      color: "#B00020",
   },

    inputView: {
        backgroundColor: "#F5F5F5",
        borderRadius: 10,
        width: "80%",
        height: 60,
        marginBottom: 20,
        alignSelf:'center',
      },

    textInput: {
        fontSize: 16,
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },

    forgotPass:{
        marginBottom: 50,
        color: "#a1a2a7",
        fontSize: 16,
        marginLeft: "11%",
    },

    loginBtn:{
        backgroundColor: "#7e7bf6",
        borderRadius: 10,
        width: "80%",
        height: 55,
        marginBottom: 20,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
    },

    loginText: {
        fontWeight: '500',
        fontSize: 18,
        color: "#fff",
        letterSpacing: 1,
    },

    create:{
        marginBottom: 50,
        color: "#a1a2a7",
        fontSize: 16,
        textAlign: "center",
        letterSpacing: 0.8,
        
    },

    signup:{
        color: "#7e7bf6",
        fontWeight: "500"
    }
      
  });


export default LoginScreen;