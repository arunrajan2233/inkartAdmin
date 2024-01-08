import React from 'react';
import {View, Text, StyleSheet, TextInput, bgColor, icon} from 'react-native';
import {colors} from '../../General/Colors/Colors';
import Fonts from '../../General/Fonts/Fonts';

const CustomTextInput = props => {
  const {text, width,icon,secureEntry,onChangeText,value,bgColor,multiline} = props;
  return (
    <View
      style={{
        flexDirection: icon ? 'row' : 'column',
        width: width,
        marginVertical: 15,
        backgroundColor: bgColor,
        borderRadius: 15,
        padding: 10,
        justifyContent:"space-between",
        
      }}>
      <TextInput
        placeholder={text}
        selectionColor={colors.defaultGreen}
        placeholderTextColor={colors.black}
        style={{color:colors.black,fontFamily:Fonts.Poppins_Regular,}}
        secureTextEntry={secureEntry}
        onChangeText={onChangeText}
        value={value}
        multiline={multiline}
      
      />
      {icon?icon:null}  
    </View>
  );
};

const styles = StyleSheet.create({});

export default CustomTextInput;
