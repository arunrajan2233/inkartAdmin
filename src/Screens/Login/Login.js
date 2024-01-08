import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Fonts from '../../General/Fonts/Fonts';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';

import CustomTextInput from '../../CustomSection/CustomTextInput/CustomTextInput';
import CustomButton from '../../CustomSection/CustomButton/CustomButton';
import {colors} from '../../General/Colors/Colors';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import { login } from '../../Storage/Action';

const Login = () => {
  const [secureEntry, setSecureEntry] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleSecureEntry = () => {
    setSecureEntry(!secureEntry);
  };

  //
  const handleLogin = async () => {
    if (email.trim() === 'admin@gmail.com' && password.trim() == '123') {
      await firestore()
        .collection('Users')
        .where('email', '==', email.trim())
        .get()
        .then(async snapshot => {
          if (snapshot.empty) {
            Snackbar.show({
              text: 'This User Is Not Registered',
              duration: Snackbar.LENGTH_SHORT,
              backgroundColor: 'red',
              textColor: 'white',
            });
          } else {
            snapshot.forEach(documentSnapshot => {
              const respData = documentSnapshot.data();

              if (password.trim() === respData.password) {

                dispatch(login({userid:documentSnapshot.id}))
                Snackbar.show({
                  text: 'Login Successful',
                  duration: Snackbar.LENGTH_SHORT,
                  backgroundColor: 'green',
                  textColor: 'white',
                  fontFamily: Fonts.Poppins_Regular,
                });
                // dispatch(
                //   login({
                //     userid: documentSnapshot.id,
                //     firstName: respData.firstName,
                //     lastName: respData.lastName,
                //     email: respData.email,
                //     mobile_number:respData.mobile_number,
                //     image:respData.image,
                //   }),
                // );
                navigation.navigate('Sidebar');
              } else {
                Snackbar.show({
                  text: 'wrong password',
                  duration: Snackbar.LENGTH_SHORT,
                  backgroundColor: 'red',
                  textColor: 'white',
                });
              }
            });
          }
        })
        .catch(err => console.warn(err));
    } else {
      Snackbar.show({
        text: 'wrong username or password ',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
        textColor: 'white',
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          style={styles.bgImage}
          source={require('../../Assets/images/appbg1.jpg')}
        />

        <View style={styles.mainContainer}>
          <Image
            style={styles.logoImage}
            source={require('../../Assets/images/logo.png')}
          />
          <View style={styles.wrapper}>
            <Text style={styles.adminText}>Admin Login</Text>
            <CustomTextInput
              icon={
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    resizeMode: 'contain',
                    alignSelf: 'center',
                  }}
                  source={require('../../Assets/images/mail.png')}
                />
              }
              bgColor={colors.Offgreen}
              width={'90%'}
              text={'Email'}
              onChangeText={text => setEmail(text)}
            />
            <CustomTextInput
              icon={
                <TouchableOpacity onPress={handleSecureEntry}>
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      resizeMode: 'contain',
                      alignSelf: 'center',
                      marginTop: 10,
                    }}
                    source={
                      secureEntry
                        ? require('../../Assets/images/hide.png')
                        : require('../../Assets/images/view.png')
                    }
                  />
                </TouchableOpacity>
              }
              width={'90%'}
              text={'Password'}
              secureEntry={secureEntry}
              onChangeText={text => setPassword(text)}
            />
            <CustomButton
              text={'Login'}
              width={'90%'}
              colors={colors.defaultGreen}
              onpress={handleLogin}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  bgImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  mainContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: -10,
  },
  logoImage: {
    width: '70%',
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  adminText: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: colors.black,
  },
});

export default Login;
