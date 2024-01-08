import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import CustomHeader from '../../CustomSection/CustomHeader/CustomHeader';
import {useIsFocused} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {colors} from '../../General/Colors/Colors';
import Fonts from '../../General/Fonts/Fonts';
import ActionSheet from 'react-native-actions-sheet';
import CustomButton from '../../CustomSection/CustomButton/CustomButton';
import CustomTextInput from '../../CustomSection/CustomTextInput/CustomTextInput';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import uploadImage from '../../General/UploadImage/UploadImage';
import Snackbar from 'react-native-snackbar';

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [uploadUri, setUploadUri] = useState(null);
  const [type, setType] = useState('');
  const [bannerId, setBannerId] = useState('');




  const isFocused = useIsFocused();
  const actionSheetRef = useRef(null);

  useEffect(() => {
    if (isFocused) {
      getBanners();
    }
  }, [isFocused]);

  const getBanners = async () => {
    try {
      const snapshot = await firestore().collection('Banners').get();

      if (!snapshot.empty) {
        const objArray = [];
        snapshot.docs.forEach(doc => {
          const result = {id: doc.id, ...doc?.data()};
          objArray.push(result);
        });
        setBanners(objArray);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const addbanners = () => {
    actionSheetRef.current?.show();
    setType('create');

  };

  const handleImagePress = () => {
    setModalVisible(true);
  };

  const handleCamera = async () => {
    const options = {
      mediaType: 'photo',
    };
    await launchCamera(options, response => {
      setModalVisible(!modalVisible);

      if (response && response.assets) {
        setUploadUri(response?.assets[0]?.uri);
      }
    });
  };

  const handleGallery = () => {
    const options = {
      mediaType: 'photo',
    };
    launchImageLibrary(options, response => {
      setModalVisible(!modalVisible);

      if (response && response.assets) {
        setUploadUri(response?.assets[0]?.uri);
      }
    });
  };

  const handleBannerUpload = async () => {
    if (uploadUri && heading !== '' && description !== '') {
      const responseUrl = await uploadImage(uploadUri);

      const banner = {
        created: Date.now(),
        updated: Date.now(),
        description: description,
        image: responseUrl,
        heading: heading,
      };

      await firestore()
        .collection('Banners')
        .add(banner)
        .then(() => {
          Snackbar.show({
            text: 'Banner added ',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: 'green',
            textColor: 'white',
          });
          setModalVisible(false);
          actionSheetRef.current?.hide();
          getBanners();

          setDescription('');
          setHeading('');
          setUploadUri('');
        });
    }
  };

  const handleDelete = async productData => {
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
            .collection('Banners')
            .doc(productData.id)
            .delete()
            .then(() => {
              Snackbar.show({
                text: 'product Deleted',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: 'red',
                textColor: 'white',
              });
            });
          getBanners();
        },
      },
    ]);
  };

  const handleEdit = productData => {
    actionSheetRef.current?.show();
     setHeading(productData?.heading);
    setDescription(productData?.description);
    setUploadUri(productData?.image);
    setType('edit');
    setBannerId(productData?.id);
  };


//   ****************** update Banner*******************

   const handleUpdate=async()=>{
    if (
      uploadUri &&
      heading !== '' &&
      description !== ''  
     ) {
      const responseUrl = uploadUri.includes('file://')? await uploadImage(uploadUri):uploadUri;

      const banner = {
         updated: Date.now(),
         description: description,
        image: responseUrl,
        heading: heading,
       };

      await firestore()
        .collection('Banners').doc(bannerId)
        .update(banner)
        .then(() => {
          Snackbar.show({
            text: 'Banner updated ',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: 'green',
            textColor: 'white',
          });
          setModalVisible(false);
          actionSheetRef.current?.hide();
          getBanners();

          setDescription('');
          setHeading('');
          setUploadUri('');

         });
    }
    
  }



  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Please Choose </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Image
                  style={styles.closeImage}
                  source={require('../../Assets/images/close.png')}
                />
              </Pressable>
            </View>
            <View style={{flexDirection: 'row', gap: 30}}>
              <TouchableOpacity
                onPress={handleCamera}
                style={styles.mediaTouch}>
                <Text style={styles.mediaText}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleGallery}
                style={styles.mediaTouch}>
                <Text style={styles.mediaText}>Gallery</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <CustomHeader
        back={'true'}
        heading={'Banners'}
        redirection={true}
        moveTo={'Home'}
        edit={'true'}
        editPress={addbanners}
      />

      {/* ************actionSheet**************** */}

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
            text={'Description'}
            onChangeText={text => setDescription(text)}
            value={description}
            multiline={true}
          />
          <TouchableOpacity
            onPress={handleImagePress}
            style={styles.uploadImgContainer}>
            {uploadUri ? (
              <Image
                style={{width: 200, height: 100,resizeMode:"contain"}}
                source={{uri: uploadUri}}
              />
            ) : (
              <Image
                style={styles.uploadImg}
                source={require('../../Assets/images/image-upload.png')}
              />
            )}
          </TouchableOpacity>

          <CustomButton
            text={type==='create'?'Create':'edit'}
            width={'90%'}
            colors={colors.defaultGreen}
            onpress={type=='edit'?handleUpdate:handleBannerUpload}
          />
        </View>
      </ActionSheet>

      <FlatList
        contentContainerStyle={styles.list}
        keyExtractor={(item, index) => String(index)}
        data={banners}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <View style={styles.imageContainer}>
              <ImageBackground
                style={styles.bannerImage}
                source={{uri: item?.image}}>
                <Text style={styles.headingText}>{item?.heading}</Text>
                <Text style={styles.decText}>{item?.description}</Text>
              </ImageBackground>
              <View style={styles.actionContainer}>


                {/* **********handle Actions**************** */}
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
  container: {},
  bannerImage: {
    width: '100%',
    height: 200,
  },
  list: {
    gap: 10,
    padding: 20,
  },

  decText: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 18,
    overflow: 'hidden',
  },
  headingText: {
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 18,
  },
  imageContainer: {
    backgroundColor: colors.category3,
    padding: 10,
    borderRadius: 10,
  },
  closeImage: {
    width: 25,
    height: 25,
    resizeMode:"contain"
  },
  actionHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginLeft: 20,
    padding: 5,
  },
  customConatiner: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  uploadImg: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  uploadImgContainer: {
    borderWidth: 1,
    padding: 30,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-between',
  },
  modalText: {
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 20,
    color: colors.white,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  mediaText: {
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 20,
    color: colors.white,
  },
  mediaTouch: {
    backgroundColor: colors.Offgreen,
    padding: 10,
    borderRadius: 10,
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
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
});

export default Banners;
