import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {colors} from '../../General/Colors/Colors';
import { horizontalScale, verticalScale } from '../../General/Dimention/Dimention';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.Image}
        source={require('../../Assets/images/logo.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.defaultGreen,
  },
  Image: {
    width:horizontalScale(300),
    height:verticalScale(300),
    resizeMode: 'contain',
  },
});

export default SplashScreen;
