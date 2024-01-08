import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import CustomHeader from '../../CustomSection/CustomHeader/CustomHeader';
import CustomTextInput from '../../CustomSection/CustomTextInput/CustomTextInput';
import {colors} from '../../General/Colors/Colors';
import firestore from '@react-native-firebase/firestore';
import CustomDropDown from '../../CustomSection/CustomDropDown/CustomDropDown';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomButton from '../../CustomSection/CustomButton/CustomButton';
import Fonts from '../../General/Fonts/Fonts';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import uploadImage from '../../General/UploadImage/UploadImage';
import Snackbar from 'react-native-snackbar';

const AddNewProduct = () => {
  const route = useRoute();
  const {productData, product, type, data} = route.params;

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const [uploadUri, setUploadUri] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(null);
  const [price, setPrice] = useState('');
  const [quntity, setQuantity] = useState('');
  const [offer, setOffer] = useState('');

  useEffect(() => {
    setName(productData?.name),
    setDescription(productData?.description),
    setPrice(productData?.price),
    // setQuantity(productData.quntity),
    setOffer(productData?.offer),
    setUploadUri(productData?.image)
  }, [productData]);

 


  
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

  const handleImagePicker = () => {
    setModalVisible(true);
  };

  const handleCreate = async () => {
    if (
      uploadUri &&
      name !== '' &&
      description !== '' &&
      category !== '' &&
       price !== '' &&
      offer !== ''
    ) {
      const responseUrl = await uploadImage(uploadUri);


      const products = {
        created: Date.now(),
        updated: Date.now(),
        categoryid:category.id,
        description: description,
        image: responseUrl,
        name: name,
        offer: offer,
        price: price,
      };

      await firestore()
        .collection('products')
        .add(products)
        .then(() => {
          Snackbar.show({
            text: 'product added ',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: 'green',
            textColor: 'white',
          });
          navigation.navigate('Products');
        });
    }
  };

  const handleUpdate=async()=>{
    if (
      uploadUri &&
      name !== '' &&
      description !== '' &&
      category !== '' &&
       price !== '' &&
      offer !== ''
    ) {
      const responseUrl = uploadUri.includes('file://')? await uploadImage(uploadUri):uploadUri;

      const products = {
         updated: Date.now(),
        categoryid:category.id,
        description: description,
        image: responseUrl,
        name: name,
        offer: offer,
        price: price,
      };

      await firestore()
        .collection('products').doc(productData.id)
        .update(products)
        .then(() => {
          Snackbar.show({
            text: 'product updated ',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: 'green',
            textColor: 'white',
          });
          navigation.navigate('Products');
        });
    }
    
  }
  return (
    <View contentContainerStyle={{paddingBottom: 100}} style={styles.container}>
      {/* **********************modal *************************** */}

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
        heading={type == 'edit' ? 'Edit' : 'New Product'}
        redirection={true}
        moveTo={'Products'}
        // edit={'true'}
        // editPress={addNewProduct}
      />

      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        <View style={styles.wrapper}>
          <CustomTextInput
             bgColor={colors.OffwhiteLevel_2}
            width={'95%'}
            text={'Name'}
            onChangeText={text => setName(text)}
            value={name}
           />
          <CustomTextInput
            // value={}
            bgColor={colors.OffwhiteLevel_2}
            width={'95%'}
            text={'Description'}
            onChangeText={text => setDescription(text)}
            value={description}
            multiline={true}
          />

          <CustomDropDown   data={data} setData={obj => setCategory(obj)} />

          

          <CustomTextInput
            // value={}
            bgColor={colors.OffwhiteLevel_2}
            width={'95%'}
            text={'price'}
            onChangeText={text => setPrice(text)}
            value={price}
            // multiline={true}
          />

          {/* <CustomTextInput
            // value={}
            bgColor={colors.OffwhiteLevel_2}
            width={'95%'}
            text={'Quantity'}
            onChangeText={text => setQuantity(text)}
            value={quntity}
            // multiline={true}
          /> */}
          <CustomTextInput
            // value={}
            bgColor={colors.OffwhiteLevel_2}
            width={'95%'}
            text={'offer'}
            onChangeText={text => setOffer(text)}
            value={offer}
            // multiline={true}
          />

          <TouchableOpacity
            onPress={handleImagePicker}
            style={{
              borderWidth: 1,
              padding: 30,
              width: '50%',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
            }}>
            <Text>Upload Product Image</Text>

            {uploadUri ? (
              <Image
                style={{width: 100, height: 100}}
                source={{uri: uploadUri}}
              />
            ) : (
              <Image
                style={{width: 40, height: 40}}
                source={require('../../Assets/images/image-upload.png')}
              />
            )}
          </TouchableOpacity>
          <CustomButton
            text={type == 'edit' ? 'Update' : 'create'}
            width={'90%'}
            colors={colors.defaultGreen}
            onpress={type=="edit"?handleUpdate :handleCreate}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
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
  button: {
    borderRadius: 20,
    // padding: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  modalText: {
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 20,
    color: colors.white,
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
});

export default AddNewProduct;
