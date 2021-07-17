import React, { useState,useEffect} from 'react';
import {View, Text, StyleSheet,Alert, SafeAreaView, TouchableOpacity, ScrollView} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const sendResponse = async (Rdata) =>{
    const URL = "http://192.168.31.168:3000/response";
    try{
       const response = await fetch(URL,{
         method: "POST",
         body: JSON.stringify(Rdata),
         headers:{
          "Accept": "application/json",
          "Content-Type": 'application/json',  
         },
       }).then((response)=> response.json()).then((responseJson)=>{
        if(responseJson.error === false){
           Alert.alert(responseJson.message);
        }
        else{
         Alert.alert(responseJson.message);
        }
       });
    }
    catch(err){
      Alert.alert(err.message);
    }
  } 

const SingleTicket = ({route}) =>{
    const [response,setResponse] = useState("");
    const Tid = route.params.data;
    const id = Tid._id;
    const [data,setData] = useState([]);

    const submitClear=()=>{
        setResponse("");
  }


    useEffect(()=>{
        const URL = "http://192.168.31.168:3000/response/" +id;
        fetch(URL).then((response)=> response.json())
        .then((responseJson)=>{
              if(responseJson.error === false){
                  setData(responseJson.data);
              }
              else{
               Alert.alert(responseJson.message);
              }
             })
            .catch((err)=>{
            Alert.alert(err.message);
          });
        }, []);


    return(
        <SafeAreaView style={{flex:1}}>
           <View style={styles.container}>
               <ScrollView>
                   <View style={styles.textContainer}>
                    <View>
                    <Text style={styles.mainTitle}>Subject :<Text style={styles.details}>{Tid.T_name}</Text></Text>
                    <Text style={styles.mainTitle}>Description :<Text style={styles.details}>{Tid.T_desc}</Text></Text>
                    <Text style={styles.mainTitle}>Type :<Text style={styles.details}>{Tid.T_type}</Text></Text>
                    <Text style={styles.mainTitle}>Status :<Text style={styles.details}>{Tid.T_status}</Text></Text>
                    <Text style={styles.mainTitle}>Response :</Text>

                    {data.map((item,key) => (
                    <View key={key} style={styles.mainMessage}>
                      <View style={styles.messageBox}><Text style={styles.messageText}>{item.R_text}</Text></View>
                      <Text style={styles.messageSender}>You</Text>
                    </View>
                    ))}
                    </View>
                </View>
               </ScrollView>
               <View style={styles.inputView}>
                        <TextInput style={styles.textInput}
                            placeholder="Send Response"
                            placeholderTextColor="#a0a09e"
                            onChangeText={(response) => setResponse(response)}
                            value={response}>     
                        </TextInput>
                        <TouchableOpacity style={styles.iconSend} onPress={()=>  {
                            const Rdata = {
                                T_id: Tid._id,
                                Sender_email: Tid.T_email ,
                                R_text : response,
                            };
                            sendResponse(Rdata);
                            submitClear();
                            }}>
                          <Icon reverse
                           name='send'
                           type='font-awesome'
                           color='#7e7bf6'
                          ></Icon> 
                          </TouchableOpacity>
                         
                    </View>
           </View>
        </SafeAreaView>
    );
}

export default SingleTicket;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },

    textContainer:{
        marginVertical: 20,
        marginHorizontal: 15,
    },
    mainTitle:{
        fontWeight: '700',
        fontSize: 20,
        color: "#705d72",
        letterSpacing: 0.8,
        marginBottom:8,
    },
    details:{
        fontWeight: '600',
        fontSize: 18,
        color: "#4e4e4e",
        
    },
    inputView: {
        backgroundColor: "#F5F5F5",
        borderRadius: 50,
        width: "100%",
        height: 65,
        alignItems:'center',
        marginBottom: 20,
        flexDirection: 'row', 
      },
    textInput: {
        fontSize: 16,
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
        flex: 1,
    },
    iconSend:{
        alignSelf: 'flex-end',
        marginTop: 5,
    },
    mainMessage:{
        alignItems: "flex-end",
        alignSelf: "flex-end",
        maxWidth: "85%",
        marginVertical : 10,
    },
    messageBox :{
       width: "auto",
       height: "auto",
       paddingHorizontal: 15,
       paddingVertical: 10,
       backgroundColor: "#fcf2fe",
       borderRadius: 8,
      
    },
    messageText:{
        fontSize: 16,
        fontWeight: "500",
        lineHeight : 20,
    },
    messageSender:{
        fontSize: 15,
        fontWeight: "700",
        color: "#808080",
    }


})