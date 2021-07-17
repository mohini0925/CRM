import React, { useState , useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView} from 'react-native';
import { SearchBar } from 'react-native-elements';

const getData = async (id, navigation) =>{
    const URL = "http://192.168.31.168:3000/singleticket/"+id;
  try{
     const response = await fetch(URL).then((response)=> response.json()).then((responseJson)=>{
      if(responseJson.error === false){
        navigation.navigate('viewTicketStack',{screen: 'SingleTicket',params : {data : responseJson.data}})
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

const ViewTicket = ({navigation}) =>{
    const [search,setSearch] = useState("");
    const [data,setData] = useState([]);

    useEffect(()=>{
        const URL = "http://192.168.31.168:3000/viewticket";
        fetch(URL).then((response)=> response.json())
        .then((responseJson)=>{
              if(responseJson.error === false){
                  setData(responseJson.data);
              }
              else{
               alert(responseJson.message);
              }
             })
            .catch((err)=>{
            alert(err.message);
          });
        }, []);

    return(
        <SafeAreaView style={{flex:1}}>
           <View style={styles.container}>
             <SearchBar
                 placeholder="Type Here..."
                 onChangeText={(search) => setSearch(search)}
                 value={search}
                 lightTheme
                 showLoading
                 round
                 underlineColorAndroid='transparent'
                 platform="ios"
                 cancelButtonTitle
             />
            <ScrollView>
             <View>
             {data.map((item,key) => (
                        <View key={key} style={styles.ticketCard}>
                        <Text style={styles.subject}>{item.T_name}</Text>
                        <View style={styles.desc}>
                         <Text style={styles.field}>Description :</Text>
                         <Text style={styles.descText}>{item.T_desc}</Text>
                        </View>
                      <View style={styles.OpenContainer}>
                        <View style={styles.desc}>
                            <Text style={styles.field}>Status :</Text>
                            <Text style={styles.descText}>{item.T_status}</Text>
                        </View>
                        <TouchableOpacity style={styles.OpenBtn} onPress={() => getData(item._id,navigation)}><Text style={styles.OpenText}>Open</Text></TouchableOpacity>
                      </View>
                     </View>

                      )
                  )}
             </View>
             
             </ScrollView>
           </View>
        </SafeAreaView>
    );
}

export default ViewTicket;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },

    BtnContainer : {
        flexDirection: "row",
        alignContent: "space-around",
        justifyContent: "center",
        marginTop : 25,
    },
    

    ViewBtn : {
        backgroundColor: "#f9a12e",
        borderRadius: 8,
        width: "45%",
        height: 60,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 5,
},


    CreateBtn : {
        backgroundColor: "#fc766a",
        borderRadius: 8,
        width: "45%",
        height: 60,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center",
        marginLeft:5,
    },

    Viewtext:{
        fontWeight: '600',
        fontSize: 16,
        color: "#fff",
        letterSpacing: 0.8,
    },

    moreText:{
        fontWeight: '500',
        fontSize: 18,
        color: "#7e7bf6",
        marginTop:10,
    },

    textContainer:{
        flexDirection: "row",
        marginTop : 10,
        justifyContent: "space-between",
        alignItems: "center",
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',

        
    },

    OpenContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: '80%',
        marginTop: 5,
    },

    ticketText :{
        fontWeight: '700',
        fontSize: 22,
        color: "#705d72",
        letterSpacing: 0.8,
    },

    ticketCard:{
        paddingHorizontal:20,
        paddingVertical:15,
        width : '90%',
        backgroundColor: '#fcf2fe',
        height: 'auto',
        alignSelf: 'center',
        borderRadius: 5,
        marginTop: 15,
    },

    subject:{
        fontWeight: '700',
        fontSize: 18,
        color: "#29162c",
        letterSpacing: 0.8,
    },

    field:{
        fontWeight: '700',
        fontSize: 16,
        color: "#3a3a3a",
        marginTop: 4,
    },

    desc:{
        flexDirection: "row",
        justifyContent: "flex-start",
        textAlign: 'justify',
    },
    descText:{
        fontWeight: '600',
        fontSize: 15,
        color: "#4e4e4e",
        marginTop: 5,
        marginLeft: 5,
        flex: 1, flexWrap: 'wrap',
    },
    OpenBtn:{
        backgroundColor: "#fc766a",
        borderRadius: 50,
        width: "30%",
        height: 30,
        alignItems: "center",
        justifyContent: "center",

    },
    OpenText:{
        fontWeight: '600',
        fontSize: 14,
        color: "#fff",

    }

})