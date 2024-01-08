import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {verticalScale} from '../../General/Dimention/Dimention';
import Fonts from '../../General/Fonts/Fonts';
import {useDispatch} from 'react-redux';
import {signout} from '../../Storage/Action';

const CustomDrawer = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(signout());
  };
  const data = [
    {
      id: 1,
      Name: 'Home',
      navigation: 'Footer',
      icon: require('../../Assets/images/home-1.png'),
    },
    {
      id: 2,
      Name: 'Products',
      navigation: 'Footer',
      icon: require('../../Assets/images/box.png'),
    },
    {
      id: 3,
      Name: 'Categories',
      navigation: 'Footer',
      icon: require('../../Assets/images/categories.png'),
    },
    {
      id: 4,
      Name: 'Orders',
      navigation: 'Orders',
      icon: require('../../Assets/images/note1.png'),
    },
    {
      id: 5,
      Name: 'Reviews',
      navigation: 'Footer',
      icon: require('../../Assets/images/rating.png'),
    },
    {
      id: 6,
      Name: 'Banners',
      navigation: 'Banners',
      icon: require('../../Assets/images/label.png'),
    },
    {
      id: 7,
      Name: 'Offers',
      navigation: 'Offers',
      icon: require('../../Assets/images/offer-1.png'),
    },
    {
      id: 8,
      Name: 'Logout',
      icon: require('../../Assets/images/logout.png'),
      onPress: handleLogout,
    },
  ];

  const handlePress = item => {
    if (item.navigation) {
      navigation.navigate(item.navigation);
    } else if (item.onPress) {
      item.onPress();
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          style={styles.ProfileImg}
          source={require('../../Assets/images/user-image.jpg')}
        />
        <View>
          <Text style={styles.adminText}>Admin</Text>
          <Text>admin@gmail.com</Text>
        </View>
      </View>
      <View style={styles.lineSeperator}/>

      {data.map((item, index) => {
        return (
          <View style={styles.mainContainer} key={index}>
            <TouchableOpacity
              style={styles.touch}
              onPress={() => handlePress(item)}>
              <Image style={styles.image} source={item.icon} />
              <Text style={styles.drawerText}>{item.Name}</Text>
            </TouchableOpacity>
            <View style={styles.lineSeperator}/>

          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  ProfileImg: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 40,
  },
  adminText: {
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 18,
  },
  mainContainer: {
    marginVertical: verticalScale(10),
    padding: 10,
  },
  drawerText: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 15,
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  touch: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingBottom:10
  },
  lineSeperator:{
    width:"100%",
    borderWidth:StyleSheet.hairlineWidth,
    borderColor:"black",
   }
});

export default CustomDrawer;
