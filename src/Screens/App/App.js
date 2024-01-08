import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Login from '../Login/Login';
import HomeScreen from '../HomeScreen/HomeScreen';
import {Provider, useSelector} from 'react-redux';
import {store} from '../../Storage/Store';
import SplashScreen from '../SplashScreen/SplashScreen';
import CustomDrawer from '../../CustomSection/CustomDrawer/CustomDrawer';
import CustomTabBar from '../../CustomSection/CustomTabBar/CustomTabBar';
import Products from '../Products/Products';
import Orders from '../Orders/Orders';
import Profile from '../Profile/Profile';
import Users from '../Users/Users';
import ProductsDetails from '../ProductsDetails/ProductsDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import AddNewProduct from '../AddNewProduct/AddNewProduct';
import Banners from '../Banners/Banners';
import Offers from '../Offers/Offers';
import { DimensionContextProvider } from '../../Dimention/Index';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

const AppNavigator = () => {
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [isLoggedIn]);
  return (
    <DimensionContextProvider>

    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Login">
        {loading ? (
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        ) : (
          <>
            {isLoggedIn ? (
              <Stack.Screen name="Sidebar" component={Sidebar} />
            ) : (
              <Stack.Screen name="Login" component={Login} />
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
    </DimensionContextProvider>

  );
};
const Drawer = createDrawerNavigator();

const Sidebar = () => {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
       drawerContent={(props)=><CustomDrawer {...props}/>}>
      <Drawer.Screen name="Footer" component={Footer} />
    </Drawer.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const Footer = () => {
  return (
    <Tab.Navigator  tabBar={(props)=><CustomTabBar {...props}/>} screenOptions={{headerShown: false}} initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Products" component={Products} />
      <Tab.Screen name="Orders" component={Orders} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Users" component={Users} />
      <Tab.Screen name="ProductsDetails" component={ProductsDetails} />
      <Tab.Screen name="OrderDetails" component={OrderDetails} />
      <Tab.Screen name="AddNewProduct" component={AddNewProduct} />
      <Tab.Screen name="Banners" component={Banners} />
      <Tab.Screen name="Offers" component={Offers} />







    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default App;
