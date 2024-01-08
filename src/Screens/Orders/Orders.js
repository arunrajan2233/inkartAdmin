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
import {useIsFocused, useNavigation} from '@react-navigation/native';
import CustomHeader from '../../CustomSection/CustomHeader/CustomHeader';
import {colors} from '../../General/Colors/Colors';
import {
  horizontalScale,
  verticalScale,
} from '../../General/Dimention/Dimention';
import Fonts from '../../General/Fonts/Fonts';
import CustomTextInput from '../../CustomSection/CustomTextInput/CustomTextInput';

const Orders = () => {
  const navigation = useNavigation();
  const [orderDetails, setOrderDetails] = useState();
  const [searchText, setSearchText] = useState('');
   const result = [];

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getOrderDetails();
    }
  }, [isFocused]);
  const getOrderDetails = async () => {
    await firestore()
      .collection('orders')
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          snapshot.docs.forEach(doc => {
            if (doc.exists) {
              const responseData = {id: doc.id, ...doc?.data()};
              result.push(responseData);
            }
          });
          setOrderDetails(result);
        }
      })
      .catch(err => console.log('error', err));
  };

  const handleSearch = async text => {
    setSearchText(text);
    await firestore()
      .collection('orders')
      .orderBy('orderId')
      .startAt(String(text))
      .endAt(String(text) + '\uf8ff')
      .get()
      .then(snapShot => {
        if (snapShot.empty) {
          setOrderDetails([]);
        } else {
          const objArray = [];
          snapShot?.docs.forEach(document => {
            if (document.exists) {
              const result = {id: document.id, ...document?.data()};
              objArray.push(result);
            }
          });
          setOrderDetails(objArray);
        }
      });
  };

  return (
    <View style={styles.main}>
      <CustomHeader
        back={'true'}
        heading={'Orders'}
        redirection={true}
        moveTo={'Home'}
      />

      {/* search section start  */}

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
        keyExtractor={item => String(item.id)}
        contentContainerStyle={{paddingBottom: 130}}
        ListEmptyComponent={() => {
          return (
            <View style={styles.EmptyTextContainer}>
              <Text style={styles.EmptyText}>No Orders Found</Text>
            </View>
          );
        }}
        data={orderDetails}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('OrderDetails', {item})}
              style={styles.SecondMainContainer}>
              <View style={styles.container}>
                <View style={styles.DetailsSection}>
                  <View style={styles.idContainer}>
                    <Text style={styles.text}>ID :</Text>
                    <Text style={styles.text}>{item.orderId}</Text>
                  </View>

                  <View style={styles.dateContainer}>
                    <Text style={styles.text} numberOfLines={1}>
                      Ordered on :
                    </Text>
                    <Text style={styles.text} numberOfLines={1}>
                      {item.created}
                    </Text>
                    {/* <Text style={styles.text} numberOfLines={1}>
                        {item.time}
                      </Text> */}
                  </View>

                  <View>
                    <Text style={styles.text} numberOfLines={2}>
                      Address: {item?.address}
                    </Text>
                  </View>

                  <View style={styles.PaidContainer}>
                    <Text style={styles.text} numberOfLines={1}>
                      Paid :
                    </Text>
                    <Text style={styles.text} numberOfLines={1}>
                      {item.totalAmount}
                    </Text>
                    <Text style={styles.text} numberOfLines={1}>
                      Item :
                    </Text>
                    <Text style={styles.text} numberOfLines={1}>
                      {item.cartItems.length}
                    </Text>
                  </View>
                </View>

                <View style={styles.ImageContainer}>
                  <Image
                    style={styles.image}
                    source={require('../../Assets/images/google-map.jpg')}
                  />
                </View>
              </View>

              <View style={styles.lineStyle}></View>
              <View style={styles.TotalOrderContainer}>
                <Text style={styles.text}>{item?.orderStatus??"shipped"}</Text>
                <Text style={styles.text}>rate & review product</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
   },
  searchContainer:{
    justifyContent:"center",
    alignItems:"center"
  },
  SecondMainContainer: {
    backgroundColor: colors.Offgreen,
    marginBottom: 10,
    borderRadius: 10,
    margin: 10,
  },
  container: {
    backgroundColor: colors.Offgreen,
    flexDirection: 'row',
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: 10,
    margin: 10,
  },
  DetailsSection: {
    flex: 2,
    padding: 5,
  },
  ImageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  idContainer: {
    flexDirection: 'row',
  },
  dateContainer: {
    flexDirection: 'row',
  },
  PaidContainer: {
    flexDirection: 'row',
  },
  image: {
    width: verticalScale(100),
    height: horizontalScale(100),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginLeft: 20,
  },
  text: {
    fontFamily: Fonts.Poppins_Regular,
    marginHorizontal: 3,
  },
  lineStyle: {
    backgroundColor: 'green',
    borderWidth: horizontalScale(1),
    // marginTop: verticalScale(10),
    marginHorizontal: horizontalScale(10),
    marginBottom: 10,
  },
  TotalOrderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: horizontalScale(10),
    marginBottom: 5,
  },
  EmptyTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  EmptyText: {
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: 18,
  },
});

export default Orders;
