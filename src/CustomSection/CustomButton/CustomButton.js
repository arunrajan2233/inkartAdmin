import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Fonts from '../../General/Fonts/Fonts';

const CustomButton = props => {
  const {text, colors, width,onpress} = props;
  return (
    <TouchableOpacity onPress={onpress}
      style={{
        width: width,
        backgroundColor: colors,
        borderRadius: 15,
        padding: 10,
        marginTop:15
      }}>
      <Text style={styles.textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
  },
});

export default CustomButton;
