import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {colors} from '../../General/Colors/Colors';
import {
  horizontalScale,
  verticalScale,
} from '../../General/Dimention/Dimention';
import CustomHeader from '../../CustomSection/CustomHeader/CustomHeader';
import Fonts from '../../General/Fonts/Fonts';
import Snackbar from 'react-native-snackbar';

const Products = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [product, setProducts] = useState([]);
  const [category, setCategory] = useState([]);


    useEffect(() => {
    if (isFocused) {
      GetProducts();
      GetCategory();
    }
  }, [isFocused]);


  // **************get Products ***********

  const GetProducts = async () => {
    try {
      const snapshot = await firestore().collection('products').get();

     

      if (!snapshot.empty) {
        const result = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc?.data(),
        }));

        setProducts(result);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  // ************get Category*************

  const GetCategory = async () => {
    try {
      const snapshot = await firestore().collection('Category').get();

      if (!snapshot.empty) {
        const objArray = [];
        snapshot.docs.forEach(doc => {
          const resultCategory = { id: doc.id, ...doc?.data() };
          objArray.push(resultCategory);
        });
        // const result = snapshot.docs.map((doc) => doc.data());
        setCategory(objArray);
        // setCategoryWithObj();
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  // ***********category data updation *************

  // const setCategoryWithObj=()=>{
  //   if (condition) {
      
  //   }
  // }

  // *******************add new product navigation*****************

  const addNewProduct = ( ) => {
    navigation.navigate('AddNewProduct', {type: 'create', data: category});
  };

  // ****************product onclick ****************

  const onpressProduct = () => {
    console.warn('pressed');
  };

  // ***********edit Products *************
  const handleEdit = item => {
    navigation.navigate('AddNewProduct', {
      type: 'edit',
      data: category,
      productData: item,

    });
     };

  // **********Delete Products **********
  const handleDelete = async productData => {

    Alert.alert('Delete Confirmation', 'Do you want to delete this product', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: async () => {
        await firestore().collection('products').doc(productData.id).delete().then(()=>{
          Snackbar.show({
            text: 'product Deleted',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: 'red',
            textColor: 'white',
          });
    
        })
        GetProducts();

      }},
    ]);


 
    };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <CustomHeader
          back={'true'}
          heading={'Products'}
          redirection={true}
          moveTo={'Home'}
          edit={'true'}
          editPress={addNewProduct}
        />
        <FlatList
          keyExtractor={item => String(item.id)}
          ListEmptyComponent={() => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 25}}>Product Will Add Soon !!!</Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          data={product}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={onpressProduct}
              style={styles.productCard}>
              <Image style={styles.ProductImage} source={{uri: item?.image}} />

              <View style={styles.lineStyle}></View>
              <View style={styles.ProductsDetails}>
                <Text numberOfLines={1} style={styles.productName}>
                  {item?.name}
                </Text>
                <Text numberOfLines={1} style={styles.productDescription}>
                  {item?.description}
                </Text>
                <View style={styles.Offercontainer}>
                  <Text style={styles.productPrice}>₹ {item?.price}</Text>
                  <View style={styles.offerpercentContainer}>
                    <Text style={styles.Offers}>{item?.offer}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleEdit(item)}>
                    <Image
                      style={{width: 25, height: 25}}
                      source={require('../../Assets/images/edit.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(item)}>
                    <Image
                      style={{width: 25, height: 25}}
                      source={require('../../Assets/images/delete.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {},
  categoryMainView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: horizontalScale(15),
  },
  categoryContainer: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  imageContainer: {
    backgroundColor: colors.Offgreen,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 30,
  },
  flatlistStyle: {},
  imageCategory: {
    width: verticalScale(50),
    height: verticalScale(50),
    alignSelf: 'center',
  },
  productCard: {
    backgroundColor: colors.Offwhite,
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    flexDirection: 'row',
    marginVertical: verticalScale(4),
    marginHorizontal: horizontalScale(15),
  },
  ProductImage: {
    width: horizontalScale(55),
    height: verticalScale(55),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  lineStyle: {
    backgroundColor: 'green',
    borderWidth: horizontalScale(1),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
    marginHorizontal: horizontalScale(10),
  },
  ProductsDetails: {
    flex: 1,
    padding: 10,
  },
  productName: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 15,
    color: colors.black,
  },
  productDescription: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 14,
    flexWrap: 'wrap',
    // marginVertical: verticalScale(5),
  },
  Offercontainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
  },
  productPrice: {
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 18,
  },
  offerpercentContainer: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 5,
  },
  Offers: {
    color: colors.Offwhite,
    fontSize: 18,
  },

  lineSeperator: {
    borderWidth: 1,
    borderColor: colors.black,
    flex: 1,
  },
  quantity: {
    backgroundColor: colors.defaultGreen,
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  symbol: {
    color: colors.black,
    fontFamily: Fonts.Poppins_SemiBold,
    marginHorizontal: horizontalScale(10),
  },
});

export default Products;
