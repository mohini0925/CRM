import React, { useEffect, useState} from 'react';
import {View, Text, Alert, StyleSheet} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';


const connect = async () =>{
  const URL = "http://192.168.31.168:3000/logout";
  try{
     const response = await fetch(URL).then((response)=> response.json()).then((responseJson)=>{
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



const CustomSidebarMenu = (props) => {
  // const [name,setName] = useState("");
  // const [email,setEmail] = useState("");

  // useEffect(()=>{
  //   const URL = "http://192.168.31.168:3000/session";
  //   fetch(URL).then((response)=> response.json())
  //   .then((responseJson)=>{
  //         if(responseJson.error === false){
  //           setName(responseJson.name);
  //           setEmail(responseJson.email);
  //           Alert.alert(responseJson.email)
  //         }
  //         else{
  //          Alert.alert(responseJson.message);
  //         }
  //        })
  //       .catch((err)=>{
  //       Alert.alert(err.message);
  //     });
  //   }, []);

  return (
    <View style={stylesSidebar.sideMenuContainer}>

        <Text style={stylesSidebar.profileHeaderText}>
          Mohini
        </Text>
        <Text style={stylesSidebar.profileHeaderEmail}>
          email
        </Text>

      <View style={stylesSidebar.profileHeaderLine} />

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label={({color})=>
            <Text style={{color: '#fff'}}>
              Logout
            </Text>
          }
          onPress={() => {
            props.navigation.toggleDrawer();
            Alert.alert(
              'Logout',
              'Are you sure? You want to logout?',
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: 'Confirm',
                  onPress: () => {
                  connect();
                  props.navigation.navigate("LoginScreen");
                  },
                },
              ],
              {cancelable: false},
            );
          }}
        />
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomSidebarMenu;

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#7e7bf6',
    paddingTop: 50,
    color: 'white',
  },

  
  profileHeaderText: {
    color: 'white',
    textAlign: 'left',
    paddingHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 25,
    marginLeft: 10,
    marginBottom: 12,
  },
  profileHeaderEmail: {
    color: 'white',
    textAlign: 'left',
    paddingHorizontal: 10,
    fontWeight: '400',
    marginLeft: 10,
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: '#e2e2e2',
    marginTop: 15,
  },
});