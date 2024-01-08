import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Fonts from '../../General/Fonts/Fonts';
import {colors} from '../../General/Colors/Colors';
import {useNavigation} from '@react-navigation/native';

const CustomHeader = props => {
  const {back, heading, redirection, moveTo, edit,editPress} = props;
  const navigation = useNavigation();

  const editIcon =
    edit === 'true' ? require('../../Assets/images/edit.png') : null;
  const icon =
    back === 'true'
      ? require('../../Assets/images/back-button.png')
      : require('../../Assets/images/categories.png');

  const handleNavigation = () => {
    if (back === 'true') {
      if (moveTo !== '') {
        navigation.navigate(moveTo);
      } else {
        navigation.goBack();
      }
    } else {
      handleDrawerClick();
    }
  };
  const handleDrawerClick = () => {
    navigation.toggleDrawer();
  };
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <TouchableOpacity onPress={handleNavigation}>
          <Image style={styles.backButtomImg} source={icon} />
        </TouchableOpacity>
        <Text style={styles.headingText}>{heading}</Text>
      </View>

      <TouchableOpacity onPress={editPress}>
        <Image style={styles.editImage} source={editIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    gap: 15,
    backgroundColor: colors.defaultGreen,
    justifyContent: 'space-between',
  },
  backButtomImg: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginLeft: 5,
  },
  headingText: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.black,
  },
  mainContainer: {},
  editImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  headingContainer: {
    flexDirection: 'row',
    gap: 10,
  },
});

export default CustomHeader;
