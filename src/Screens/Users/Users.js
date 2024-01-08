import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import CustomHeader from '../../CustomSection/CustomHeader/CustomHeader';
import {colors} from '../../General/Colors/Colors';
import Fonts from '../../General/Fonts/Fonts';
 import CustomTextInput from '../../CustomSection/CustomTextInput/CustomTextInput';
import Snackbar from 'react-native-snackbar';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const result = [];

    await firestore()
      .collection('Users')
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          snapshot.docs.forEach(doc => {
            if (doc.exists) {
              const responseData = {id: doc.id, ...doc?.data()};
              result.push(responseData);
            }
          });
          setUsers(result);
        }
      })
      .catch(err => console.log('error', err));
  };

  const handleBlock = async item => {
   console.warn("pressed");
    };
 
  const handleSearch = async text => {
    setSearchText(text);
    await firestore()
      .collection('Users')
      .orderBy('firstName')
      .startAt(String(text))
      .endAt(String(text) + '\uf8ff')
      .get()
      .then(snapShot => {
        if (snapShot.empty) {
          setUsers([]);
        } else {
          const objArray = [];
          snapShot?.docs.forEach(document => {
            if (document.exists) {
              const result = {id: document.id, ...document?.data()};
              objArray.push(result);
            }
          });
          setUsers(objArray);
        }
      });
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        back={'true'}
        heading={'Users'}
        redirection={true}
        moveTo={'Home'}
      />
      <View style={styles.searchContainer}>
        <CustomTextInput
          icon={
            <Image
              style={{
                width: 30,
                height: 30,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
              source={require('../../Assets/images/search.png')}
            />
          }
          // value={}
          bgColor={colors.OffwhiteLevel_2}
          width={'95%'}
          text={'Search Here..'}
          onChangeText={text => handleSearch(text)}
          value={searchText}
        />
      </View>
      <FlatList
        data={users}
        keyExtractor={item => String(item.id)}

        renderItem={({item, index}) => {
           return (
            <View style={styles.profileContainer}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.profileImage}
                  source={
                    item?.image
                      ? {uri: item?.image}
                      : require('../../Assets/images/user-image.jpg')
                  }
                />
              </View>
              <View>
                <Text style={styles.nameText}>
                  {item?.firstName} {item?.lastName}
                </Text>

                <Text style={styles.detailsText}>{item.email}</Text>
                <Text style={styles.mobileText}>{item.mobile_number}</Text>
              </View>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  onPress={() => handleBlock(item)}
                  style={styles.blockBtn}>
                  <Text style={styles.btnText}>
                    {item?.active ? 'block' : 'Unblock'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    borderRadius: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
    backgroundColor: colors.OffwhiteLevel_2,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'space-around',
  },
  imageContainer: {
    padding: 10,
  },
  detailsText: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 16,
    color: 'red',
  },
  nameText: {
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: 19,
    color: colors.black,
  },
  mobileText: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 18,
  },
  blockBtn: {
    padding: 6,
  },
  btnContainer: {
    backgroundColor: 'red',
    borderRadius: 10,
  },
  btnText: {
    color: colors.white,
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 16,
  },
  searchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Users;
