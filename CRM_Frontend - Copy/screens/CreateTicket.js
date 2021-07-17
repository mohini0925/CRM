import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import {Picker} from '@react-native-picker/picker';

const connect = async (data, setError) =>{
    const URL = "http://192.168.31.168:3000/createTicket";
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
          Alert.alert(
              "Sent",
              responseJson.message);
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


const CreateTicket = () =>{
    const [Tname, setTname] = useState("");
    const [type, settype] = useState('Complaint');
    const [desc, setdesc] = useState("");
    const [error, setError] = useState("");

    const clearInput = () =>{
      setTname("");
      setdesc("");
      settype("");
    }
    return(
        <SafeAreaView style={{flex:1}}>
     <View style={styles.container}>
     <Text style={styles.errorText}>{error}</Text>
         <View style={styles.inputView}>
             <TextInput style={styles.textInput}
                placeholder="Ticket Subject"
                placeholderTextColor="#a0a09e"
                onChangeText={(Tname) => setTname(Tname)}
                value={Tname}>
                
             </TextInput>
         </View>
         <View style={styles.inputView}>
             <Picker style={styles.textInput}
                selectedValue={type}
                onValueChange={(itemValue) =>
                  settype(itemValue)
                }
                value={type}>
                <Picker.Item label="Complaint" value="Complaint" />
                <Picker.Item label="Request" value="Request" />
                <Picker.Item label="Billing" value="Billing" />
                <Picker.Item label="Quotation" value="Quotation" />
                <Picker.Item label="Warranty" value="Warranty" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
         </View>
         <View style={styles.inputView}>
             <TextInput style={styles.textInput}
                multiline={true}
                numberOfLines={4}
                placeholder="Description"
                placeholderTextColor="#a0a09e"
                onChangeText={(desc) => setdesc(desc)}
                value={desc}>
             </TextInput>
         </View>
         <View style={styles.inputView}>
             <TextInput style={styles.textInput}
                placeholder="Upload Files"
                placeholderTextColor="#a0a09e"
               >
             </TextInput>
         </View>


         <TouchableOpacity style={styles.loginBtn} onPress={()=> {
           const data = {
            T_name : Tname,
            T_type : type,
            T_desc : desc,
          };
          connect(data, setError) 
          clearInput()}}
          >
           <Text style={styles.loginText}>Raise Ticket</Text>
         </TouchableOpacity>

     </View>
        </SafeAreaView>
    );
}

export default CreateTicket;

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




