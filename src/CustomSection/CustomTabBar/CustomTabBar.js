import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Fonts from '../../General/Fonts/Fonts';
import {colors} from '../../General/Colors/Colors';
import {useNavigation} from '@react-navigation/native';

const CustomTabBar = () => {
  const [active, setActive] = useState('Home');
  const navigation = useNavigation();
  const activeFamily = Fonts.Poppins_Bold;
  const activeSize = 20;
  const handleNavigation = name => {
    setActive(name);
    navigation.navigate(name);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleNavigation('Home')}
        style={styles.iconContainer}>
        <Image
          style={styles.menuIcons}
          source={require('../../Assets/images/home-1.png')}
        />
        <Text style={active==='Home'?styles.activeText:styles.menuText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleNavigation('Products')}
        style={styles.iconContainer}>
        <Image
          style={styles.menuIcons}
          source={require('../../Assets/images/box.png')}
        />
        <Text style={active==='Products'?styles.activeText:styles.menuText}>Products</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleNavigation('Orders')}
        style={styles.iconContainer}>
        <Image
          style={styles.menuIcons}
          source={require('../../Assets/images/note1.png')}
        />
        <Text style={active==='Orders'?styles.activeText:styles.menuText}>Orders</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleNavigation('Profile')}
        style={styles.iconContainer}>
        <Image
          style={styles.menuIcons}
          source={require('../../Assets/images/user.png')}
        />
        <Text style={active==='Profile'?styles.activeText:styles.menuText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.defaultGreen,
  },
  menuText: {
    fontFamily: Fonts.Poppins_Light,
    fontSize: 15,
    // padding:10,
    marginVertical: 5,
    color: colors.black,
  },
  menuIcons: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginTop: 5,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeText:{
    fontFamily:Fonts.Poppins_SemiBold,
    fontSize:18,
    color:colors.black
  }
});

export default CustomTabBar;
