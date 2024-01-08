import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import CustomHeader from '../../CustomSection/CustomHeader/CustomHeader';
import {colors} from '../../General/Colors/Colors';
import Fonts from '../../General/Fonts/Fonts';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = () => {

  const [orders,setOrders]=useState('');
  const [products,setProducts]=useState('');
  const [users,setUsers]=useState('');

  useEffect(()=>{
    getAllCount();
  },[])

  const getAllCount=async()=>{
    const productRef=await firestore().collection('products').get();
    const ordersRef=await firestore().collection('orders').get();
    const usersRef=await firestore().collection('Users').get();

    setOrders(ordersRef.size);
    setProducts(productRef.size);
    setUsers(usersRef.size)
  }
  const navigation = useNavigation();

  const handlenavigation = data => {
    console.warn(data);
    navigation.navigate(data);
  };
  return (
    <View style={styles.container}>
      <CustomHeader
        back={'false'}
        heading={'Home'}
        redirection={true}
        moveTo={''}
      />

      {/* Orders Box */}

      <TouchableOpacity
        onPress={() => handlenavigation('Orders')}
        style={styles.orderContainer}>
        <View>
          <Image
            style={styles.orderImage}
            source={require('../../Assets/images/note.png')}
          />
        </View>
        <View>
          <Text style={styles.countText}>{orders}</Text>
          <Text style={styles.orderText}>Orders</Text>
        </View>
      </TouchableOpacity>

      {/*  products box */}

      <TouchableOpacity
        onPress={() => handlenavigation('Products')}
        style={styles.productContainer}>
        <View>
          <Image
            style={styles.orderImage}
            source={require('../../Assets/images/grocery.png')}
          />
        </View>
        <View>
          <Text style={styles.countText}>{products}</Text>
          <Text style={styles.orderText}>Products</Text>
        </View>
      </TouchableOpacity>

      {/*  users box */}

      <TouchableOpacity
        onPress={() => handlenavigation('Users')}
        style={styles.usersContainer}>
        <View>
          <Image
            style={styles.orderImage}
            source={require('../../Assets/images/boy.png')}
          />
        </View>
        <View>
          <Text style={styles.countText}>{users}</Text>
          <Text style={styles.orderText}>Users</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  orderContainer: {
    backgroundColor: colors.category1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginTop: 30,
    padding: 30,
    borderRadius: 20,
  },
  orderImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 10,
  },
  countText: {
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: 25,
    color: colors.black,
  },
  orderText: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 16,
    color: colors.black,
    marginTop: -10,
  },
  productContainer: {
    backgroundColor: colors.category3,
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginTop: 30,
    padding: 30,
    borderRadius: 20,
  },
  usersContainer: {
    backgroundColor: colors.category4,
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginTop: 30,
    padding: 30,
    borderRadius: 20,
  },
});

export default HomeScreen;
