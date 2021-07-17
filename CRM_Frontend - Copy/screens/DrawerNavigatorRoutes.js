import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Dashboard from './Dashboard';
import CreateTicket from './CreateTicket';
import Profile from './Profile';
import ViewTicket from './ViewTicket';
import SingleTicket from './SingleTicket';
import NavigationDrawerHeader from './components/NavigationDrawerHeader';
import CustomSidebarMenu from './components/CustomSidebarMenu';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const dashboardStack = ({navigation}) => {
    return (
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            title: 'Dashboard', //Set Header Title
            headerLeft: () => (
              <NavigationDrawerHeader navigationProps={navigation} />
            ),
            headerStyle: {
              backgroundColor: '#7e7bf6',
             //Set Header color
            },
            headerTitleAlign:'center',
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: '500', //Set Header text style
            },
          }}
        />
      </Stack.Navigator>      
    );
  };

  const profileStack = ({navigation}) =>{
    return (
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen
         name="Profile"
         component={Profile}
         options={{
          title: 'Profile', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#7e7bf6',
           //Set Header color
          },
          headerTitleAlign:'center',
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: '500', //Set Header text style
          },
        }}
        />
      </Stack.Navigator>
    )
  }

    const viewTicketStack = ({navigation}) =>{
    return (
      <Stack.Navigator initialRouteName="ViewTicket">
        <Stack.Screen
         name="ViewTicket"
         component={ViewTicket}
         options={{
          title: 'View Ticket', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#7e7bf6',
           //Set Header color
          },
          headerTitleAlign:'center',
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: '500', //Set Header text style
          },
        }}
        />
        <Stack.Screen
         name="SingleTicket"
         component={SingleTicket}
         options={{
          title: 'Single Ticket', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#7e7bf6',
           //Set Header color
          },
          headerTitleAlign:'center',
          headerTintColor: '#fff'
          
          , //Set Header text color
          headerTitleStyle: {
            fontWeight: '500', //Set Header text style
          },
        }}
        />

      </Stack.Navigator>
    )
  }

  const createticketStack = ({navigation}) => {
    return (
      <Stack.Navigator
        initialRouteName="CreateTicket"
        screenOptions={{
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerTitleAlign:'center',
          headerStyle: {
            backgroundColor: '#7e7bf6', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: '500', //Set Header text style
          },
        }}>
        <Stack.Screen
          name="CreateTicket"
          component={CreateTicket}
          options={{
            title: 'Create Ticket', //Set Header Title
          }}
        />
      </Stack.Navigator>
    );
  };

  const DrawerNavigatorRoutes = (props) => {
    return (
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#7e7bf6',
          color: '#fff',
          itemStyle: {marginVertical: 3, color: 'white'},
          labelStyle: {
            color: '#fff',
            fontSize: 16,
          },
        }}
        screenOptions={{headerShown: false}}
        drawerContent={CustomSidebarMenu}>
        <Drawer.Screen
          name="dashboardStack"
          options={{drawerLabel: 'Dashboard'}}
          component={dashboardStack}

          
        />
          <Drawer.Screen
          name="viewTicketStack"
          options={{drawerLabel: 'View Ticket'}}
          component={viewTicketStack}
        />
        <Drawer.Screen
          name="createticketStack"
          options={{drawerLabel: 'Create Ticket'}}
          component={createticketStack}
        />
        <Drawer.Screen
          name="profileStack"
          options={{drawerLabel: 'Your Profile'}}
          component={profileStack}
        />
      </Drawer.Navigator>
    );
  };
  
  export default DrawerNavigatorRoutes;