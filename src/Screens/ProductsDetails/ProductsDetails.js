import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  useRoute,
} from '@react-navigation/native';

 import Collapsible from './Collapsible/Collapsible';
import Fonts from '../../General/Fonts/Fonts';
import { horizontalScale, verticalScale } from '../../General/Dimention/Dimention';
import { colors } from '../../General/Colors/Colors';
import CustomTextInput from '../../CustomSection/CustomTextInput/CustomTextInput';
import CustomHeader from '../../CustomSection/CustomHeader/CustomHeader';
 
const ProductsDetails = () => {
  const route = useRoute();
  const {product} = route.params;
  console.warn("product",product);
  //  const navigation = useNavigation();

  // const [productDetailsNav, setProductDetails] = useState({});
  // const [quantity, setQuantity] = useState(1);
  // useEffect(() => {
  //   setProductDetails(product);
  // }, [product]);

  // const navigationNeeded = (val, item) => {
  //   if (val) {
  //     productRef.current.scrollTo({x: 0, y: 0, animated: true});
  //     setProductDetails(item);
  //   }

  // const handlePress = type => {
  //   if (type === 'plus') {
  //     setQuantity(quantity + 1);
  //   } else {
  //     setQuantity(quantity === 1 ? 1 : quantity - 1);
  //   }
  // };

  // const handleSeeAllClick = () => {
  //   navigation.navigate('Review');
  // };

  // const handleCart = async () => {
  //    await firestore()
  //     .collection('cart')
  //     .where('userId', '==', userid)
  //     .where('productId', '==', product.id)
  //     .get()
  //     .then(snapshot => {
  //        snapshot.docs.length
  //       if (snapshot.empty) {
  //         firestore()
  //           .collection('cart')
  //           .add({
  //             created: Date.now(),
  //             updated: Date.now(),
  //             productId: product.id,
  //             description: product.description,
  //             price: product.price,
  //             quantity: quantity,
  //             userId: userid,
  //             image: product.image,
  //             categoryId: product.categoryid,
  //             offer: product.offer,
  //           })
  //           .catch(err => console.warn(err));
  //         dispatch(updateCartCount(cartCount + 1));
  //       } else {
  //         firestore()
  //           .collection('cart')
  //           .doc(snapshot?.docs[0].id)
  //           .update({
  //             quantity:
  //               parseInt(snapshot?.docs[0].data().quantity, 10) + quantity,
  //           });
  //       }
  //     });
  // };

  return (
    <View style={styles.mainContainer}>
          <CustomHeader
        back={'true'}
        heading={'Product Details'}
        redirection={true}
        moveTo={'Products'}
        // edit={'true'}
        // editPress={handleEdit}
      />
      <ScrollView>
        <View style={styles.imageContainer}>
          {product?.image ? (
            <Image source={{uri: product.image}} style={styles.imageStyle} />
          ) : null}
        </View>

        <View style={styles.productsDetailsContainer}>
          <Text numberOfLines={1} style={styles.productName}>
            {product?.name}
          </Text>

          {/* <View style={styles.starContainer}>
            <StarRatingModule />
            <Text style={styles.starRatingCountText}>(1 rating)</Text>
          </View> */}

          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>₹{product?.price}</Text>
            <Text style={styles.offerText}>{product?.offer} OFF</Text>
          </View>

          <View style={styles.buttonWrap}>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.buttonText}>500g/24.00</Text>
              <Image
                style={styles.imageDownArrow}
                source={require('../../Assets/images/down-arrow.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Delivery Time</Text>
              <Image
                style={styles.imageDownArrow}
                source={require('../../Assets/images/down-arrow.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.productDetailsContainer}>
            <Text style={styles.productDetailsHeading}>Product Details</Text>
            <Text style={styles.productDescription}>
              {product?.description}
            </Text>
          </View>
        </View>

        <View style={styles.collapsibleSection}>
          <Collapsible />
          {/* <CustomReview handleClick={handleSeeAllClick} /> */}
        </View>

        {/* <View style={styles.customInputContainer}>
          <CustomTextInput placeholder={'Pin Code'} />
        </View> */}

        <View style={styles.newlyAddedItemWrapper}></View>
      </ScrollView>

     {/* <View style={styles.stickyMainContainer}>
        <View style={styles.whiteBox}>
          <TouchableOpacity >
            <Text style={styles.textButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.textButton}>1</Text>
          <TouchableOpacity  >
            <Text style={styles.textButton}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.addToCartContainer}>
          <TouchableOpacity >
            <Text style={styles.cartText}>Add To Cart</Text>
          </TouchableOpacity>
        </View>
      </View>   */}
      <View/>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  imageContainer: {
    padding: 20,
    marginVertical: verticalScale(10),
    backgroundColor: colors.offWhite,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  imageStyle: {
    alignSelf: 'center',
    width: 180,
    height: 180,
  },
  productsDetailsContainer: {
    marginHorizontal: horizontalScale(10),
    overflow: 'hidden',
    marginBottom: verticalScale(25),
    borderTopEndRadius: 20,
  },
  productName: {
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 35,
    marginLeft: 10,
  },
  productDescription: {
    fontFamily: Fonts.PoppinsRegular,
    fontSize: 15,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 10,
  },
  starRatingCountText: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 16,
    color: colors.defaultGreen,
  },
  priceContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    marginVertical: verticalScale(5),
    alignItems: 'center',
  },
  priceText: {
    fontFamily: Fonts.PoppinsBold,
    fontSize: 18,
    color: colors.black,
  },
  offerText: {
    fontFamily: Fonts.PoppinsRegular,
    fontSize: 16,
    marginLeft: 10,
    color: colors.defaultGreen,
  },
  imageDownArrow: {
    width: 40,
    height: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: colors.OffwhiteLevel_2,
  },
  buttonWrap: {
    flexDirection: 'row',
  },
  buttonText: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 16,
    padding: 10,
  },
  productDetailsContainer: {
    padding: 10,
  },
  productDetailsHeading: {
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: 18,
    color: colors.black,
  },
  newlyAddedItemWrapper: {
    marginHorizontal: horizontalScale(5),
  },
  collapsibleSection: {
    marginHorizontal: horizontalScale(15),
  },
  customInputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  stickyMainContainer: {
    backgroundColor: colors.defaultGreen,
    marginBottom: verticalScale(18),
    marginHorizontal: horizontalScale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
  },
  whiteBox: {
    backgroundColor: colors.Offwhite,
    marginLeft: 20,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  textButton: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 18,
    margin: 8,
  },
  addToCartContainer: {
    marginRight: 10,
  },
  cartText: {
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: 16,
    color: colors.black,
  },
});

export default ProductsDetails;
