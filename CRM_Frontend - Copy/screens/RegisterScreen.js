
import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";



const connect = async (data, setError,navigation) =>{
  const URL = "http://192.168.31.168:3000/register";
  
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


const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [focus, setFocus] = useState(false);
    const customBorder = focus ? styles.inputFocus : styles.inputView;

    const submitClear=()=>{
      setName("")
      setPhone("")
      setEmail("");
      setPassword("");
}

    return (
    <SafeAreaView style={{flex:1}}>
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
                placeholder="Name"
                placeholderTextColor="#a0a09e"
                onFocus = {()=> setFocus(true)}
                onChangeText={(name) => setName(name)}
                value={name}>
             </TextInput>
         </View>
         <View style={styles.inputView}>
             <TextInput style={styles.textInput}
                placeholder="Mobile No."
                placeholderTextColor="#a0a09e"
                onFocus = {()=> setFocus(true)}
                value={phone}
                keyboardType="numeric"
                onChangeText={(phone) => setPhone(phone)}>
             </TextInput>
         </View>
         <View style={styles.inputView}>
             <TextInput style={styles.textInput}
                placeholder="Email"
                placeholderTextColor="#a0a09e"
                onFocus = {()=> setFocus(true)}
                onChangeText={(email) => setEmail(email)}
                value={email}>
             </TextInput>
         </View>
         <View style={styles.inputView}>
             <TextInput style={styles.textInput}
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor="#a0a09e"
                onFocus = {()=> setFocus(true)}
                onChangeText={(password) => setPassword(password)}
                value={password}>
             </TextInput>
         </View>


         <TouchableOpacity style={styles.loginBtn} onPress={()=> {
           const data = {
            name: name,
            phone: phone ,
            email: email,
            password: password,
          };
          connect(data, setError,navigation);
          submitClear()
           }} >
           <Text style={styles.loginText}>Sign Up</Text>
         </TouchableOpacity>
               <Text style={styles.create}>Already have an account? <Text onPress={() => navigation.navigate('LoginScreen')} style={styles.login}>Log In</Text></Text>

     </View>
     </SafeAreaView>
    );
  }

    

  const styles = StyleSheet.create({
    errorText:{
       textAlign: "center",
       marginBottom: 20,
       fontSize: 16,
       color: "#B00020",
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
    inputFocus:{
        backgroundColor: "#F5F5F5",
        borderRadius: 10,
        width: "80%",
        height: 60,
        marginBottom: 20,
        alignSelf:'center',
        borderColor: "#7e7bf6",
        borderWidth: 2,
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

    login:{
        color: "#7e7bf6",
        fontWeight: "500"
    }

      
  });


export default RegisterScreen;

