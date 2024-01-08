import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Image,
  Alert,
  Keyboard,
} from 'react-native';
import CustomHeader from '../../CustomSection/CustomHeader/CustomHeader';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import Fonts from '../../General/Fonts/Fonts';
import {colors} from '../../General/Colors/Colors';
import Snackbar from 'react-native-snackbar';
import ActionSheet from 'react-native-actions-sheet';
import CustomTextInput from '../../CustomSection/CustomTextInput/CustomTextInput';
import CustomButton from '../../CustomSection/CustomButton/CustomButton';
import Clipboard from '@react-native-clipboard/clipboard';

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const actionSheetRef = useRef(null);
  const [type, setType] = useState('');
  const [offerAmt, setOfferAmt] = useState('');

  const [heading, setHeading] = useState('');
  const [subHeading, setSubHeading] = useState('');
  const [code, setCode] = useState('');

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      getOffers();
      setType('');
    }
  }, [isFocused]);

  // **************Get offers***************

  const getOffers = async () => {
    try {
      const snapshot = await firestore().collection('Offers').get();

      if (!snapshot.empty) {
        const objArray = [];
        snapshot.docs.forEach(doc => {
          const resultCategory = {id: doc.id, ...doc?.data()};
          objArray.push(resultCategory);
        });
        // const result = snapshot.docs.map((doc) => doc.data());
        setOffers(objArray);
        // setCategoryWithObj();
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  // ****************edit*******************

  const handleEdit = data => {
    setType('edit');
    actionSheetRef.current?.show();
  };

  // ***************delete****************
  const handleDelete = data => {
    Alert.alert('Delete Confirmation', 'Do you want to delete this product', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          await firestore()
            .collection('Offers')
            .doc(data?.id)
            .delete()
            .then(() => {
              Snackbar.show({
                text: 'product Deleted',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: 'red',
                textColor: 'white',
              });
              getOffers();
            });
        },
      },
    ]);
  };

  const addNewBanners = () => {
    actionSheetRef.current?.show();
    setType('create');
  };

  //  ************* add Banners **********

  const handleAddOffers = async () => {
    if (heading !== '' && subHeading !== '' && offerAmt !== '' && code !== '') {
      const offersData = {
        created: Date.now(),
        updated: Date.now(),
        head: heading,
        subHead: subHeading,
        offerCode: code,
        offers: offers,
      };

      await firestore()
        .collection('Offers')
        .add(offersData)
        .then(() => {
          Keyboard.dismiss();
          Snackbar.show({
            text: 'Offers added ',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: 'green',
            textColor: 'white',
          });
          actionSheetRef.current?.hide();
          getOffers();
          setHeading('');
          setSubHeading('');
          setOfferAmt('');
          setCode('');
        });
    }
  };

  // ************ update***************

  const handleUpdate = () => {
    console.warn('update');
  };

  // console.warn(type);

  const copyToClipboard = copyData => {
    Clipboard.setString(copyData?.offerCode);
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        back={'true'}
        heading={'Offers'}
        redirection={true}
        moveTo={'Home'}
        edit={'true'}
        editPress={addNewBanners}
      />

      {/* *************actionSheet**************** */}

      <ActionSheet ref={actionSheetRef}>
        <View style={styles.actionHeading}>
          <Text style={styles.headingText}>Create Banner</Text>

          <TouchableOpacity onPress={() => actionSheetRef.current?.hide()}>
            <Image
              style={styles.closeImage}
              source={require('../../Assets/images/close.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.customConatiner}>
          <CustomTextInput
            bgColor={colors.OffwhiteLevel_2}
            width={'95%'}
            text={'Heading'}
            onChangeText={text => setHeading(text)}
            value={heading}
          />

          <CustomTextInput
            bgColor={colors.OffwhiteLevel_2}
            width={'95%'}
            text={'Sub-heading'}
            onChangeText={text => setSubHeading(text)}
            value={subHeading}
            multiline={true}
          />
          <CustomTextInput
            bgColor={colors.OffwhiteLevel_2}
            width={'95%'}
            text={'Offer Code'}
            onChangeText={text => setCode(text)}
            value={code}
            multiline={true}
          />
          <CustomTextInput
            bgColor={colors.OffwhiteLevel_2}
            width={'95%'}
            text={'Offer'}
            onChangeText={text => setOfferAmt(text)}
            value={offerAmt}
          />

          <CustomButton
            text={type === 'edit' ? 'Update' : 'create'}
            width={'90%'}
            colors={colors.defaultGreen}
            onpress={type == 'edit' ? handleUpdate : handleAddOffers}
          />
        </View>
      </ActionSheet>

      <FlatList
        data={offers}
        renderItem={({item, index}) => {
          return (
            <View style={styles.imageContainer}>
              <ImageBackground
                style={styles.offerImage}
                source={require('../../Assets/images/ticket1.png')}>
                <View style={styles.offerContainer}>
                  <Text numberOfLines={1} style={styles.headText}>
                    {item?.head}
                  </Text>
                  <Text numberOfLines={1} style={styles.subHeadText}>
                    {item?.subHead}
                  </Text>
                  <TouchableOpacity
                    onPress={() => copyToClipboard(item)}
                    style={{borderWidth: 1, marginLeft: 30}}>
                    <Text numberOfLines={1} style={styles.headText}>
                      Code: {item?.offerCode}
                    </Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>

              {/* ****************handle Actions************* */}
              <View style={styles.actionContainer}>
                <TouchableOpacity onPress={() => handleDelete(item)}>
                  <Image
                    style={styles.actionImg}
                    source={require('../../Assets/images/delete.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleEdit(item)}>
                  <Image
                    style={styles.actionImgDelete}
                    source={require('../../Assets/images/edit.png')}
                  />
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
    flex: 1,
  },
  offerImage: {
    width: '95%',
    height: 140,
    resizeMode: 'contain',
    overflow: 'hidden',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
    backgroundColor: colors.white,
  },
  headText: {
    fontSize: 18,
    fontFamily: Fonts.Poppins_Bold,
    marginLeft: 20,
    paddingBottom: 8,
    paddingLeft: 10,
  },
  subHeadText: {
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: 15,
    marginLeft: 22,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  offerContainer: {
    width: '60%',
    alignItems: 'center',
  },
  actionImg: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  actionImgDelete: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  headingText: {
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 18,
  },
  actionHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginLeft: 20,
    padding: 5,
  },
  closeImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  customConatiner: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
});

export default Offers;
