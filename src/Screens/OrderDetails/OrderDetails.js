import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {colors} from '../../General/Colors/Colors';
import Fonts from '../../General/Fonts/Fonts';
import CustomHeader from '../../CustomSection/CustomHeader/CustomHeader';
import ActionSheet from 'react-native-actions-sheet';
import CustomButton from '../../CustomSection/CustomButton/CustomButton';
import CustomDropDown from '../../CustomSection/CustomDropDown/CustomDropDown';
import Snackbar from 'react-native-snackbar';
import firestore from '@react-native-firebase/firestore';

const OrderDetails = () => {
  const route = useRoute();
  const {item} = route.params;
  const actionSheetRef = useRef(null);
  const [orderStatus, setOrderStatus] = useState('');

  const [status, setStatus] = useState('');
  useEffect(() => {
    setOrderStatus(item.orderStatus);
  }, [item]);
  //  const [productsDetails,setProductsDetails]=useState([]);
  // function add products to the cart
  const handlePress = () => {
    actionSheetRef.current?.show();
  };
  const handleEdit = () => {
    actionSheetRef.current?.show();
  };

  const handleOrderStatus = async () => {
    try {
      if (item?.id && orderStatus !== '') {
        await firestore()
          .collection('orders')
          .doc(item.id)
          .update({
            orderStatus: status,
          })
          .then(() => {
            actionSheetRef.current?.hide();
            setOrderStatus(status);

            setTimeout(() => {
              Snackbar.show({
                text: 'Order Status Updated',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: 'green',
                textColor: 'white',
              });
            }, 1000);
          });
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const statusData = [
    {
      name: 'Ordered',
    },
    {
      name: 'Order Inprogress',
    },
    {
      name: 'Order Packed',
    },
    {
      name: 'Order Shipped',
    },
    {
      name: 'Out Of Delivery',
    },
    {
      name: 'Returned',
    },
  ];

  return (
    <View style={styles.container}>
      <ActionSheet ref={actionSheetRef}>
        <View>
          <View style={styles.actionHeading}>
            <Text style={styles.headingText}>Update Status</Text>
            <TouchableOpacity onPress={() => actionSheetRef.current?.hide()}>
              <Image
                style={styles.closeImage}
                source={require('../../Assets/images/close.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.customConatiner}>
            <CustomDropDown
              data={statusData}
              setData={text => setStatus(text)}
            />
            <CustomButton
              text={'Login'}
              width={'90%'}
              colors={colors.defaultGreen}
              onpress={handleOrderStatus}
            />
          </View>
        </View>
      </ActionSheet>

      <CustomHeader
        back={'true'}
        heading={'Order Details'}
        redirection={true}
        moveTo={'Orders'}
        edit={'true'}
        editPress={handleEdit}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.wrapperContainer}>
          {/* heading Section */}
          <View style={styles.headingContainer}>
            <View>
              <Image
                style={styles.boxImage}
                source={require('../../Assets/images/box.png')}
              />
            </View>
            <View style={styles.textContainer}>
              <Text>Order Id: {item?.orderId}</Text>
              <Text>Status: {orderStatus}</Text>
            </View>
          </View>

          {/* Order Details Section */}

          <View>
            <Text style={styles.ItemsText}>Items:</Text>

            {item?.cartItems &&
              item.cartItems.map((ele, index) => {
                return (
                  <View key={index} style={styles.ProductDetailsContainer}>
                    <Text style={styles.SlnoText}>{index + 1}.</Text>

                    <View style={styles.productContainer}>
                      <Text style={styles.productName} numberOfLines={1}>
                        {ele.name ?? ''}
                      </Text>
                      <Text numberOfLines={2}>{ele.description ?? ''}</Text>
                    </View>
                    <View>
                      <Text style={styles.priceText}> ₹ {ele.price ?? ''}</Text>
                    </View>
                  </View>
                );
              })}
          </View>

          {/* payment details section */}
          <Text style={styles.payHeading}>Payment Details</Text>

          <View style={styles.paymentDetailsContainer}>
            <View>
              <Text style={styles.payText}>Bag Total</Text>
              <Text style={styles.payText}>Coupon Discount</Text>
              <Text style={styles.payText}>Delivery</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.payText}>
                ₹ {item?.totalAmount - 50 ?? ''}
              </Text>
              <Text style={styles.discountText}>Coupon Discount</Text>
              <Text style={styles.payText}>₹ 50</Text>
            </View>
          </View>

          {/* line separator */}
          <View style={styles.separator} />

          {/* Total Amount Section  */}
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total Amount</Text>
            <Text style={styles.totalText}>₹ {item?.totalAmount ?? ''}</Text>
          </View>

          {/* Address Section */}

          <View style={styles.addressContainer}>
            <Text style={styles.addressHeading}>Address :</Text>
            <Text style={styles.addressText}>james bond</Text>
            <Text style={styles.addressText}>30 Wellington Square</Text>
            <Text style={styles.addressText}>Chelsea, UK</Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.ButtonContainer} onPress={handlePress}>
        <Text style={styles.btnText}>Update Status </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapperContainer: {
    marginRight: 15,
    marginLeft: 15,
  },
  boxImage: {
    width: 60,
    height: 60,
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.defaultGreen,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  textContainer: {
    marginLeft: 15,
  },
  ProductDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginVertical: 10,
  },
  ItemsText: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 18,
    color: colors.defaultGreen,
  },
  SlnoText: {
    fontSize: 15,
    color: colors.black,
  },
  productName: {
    fontSize: 18,
    fontFamily: Fonts.Poppins_Regular,
    fontWeight: 'bold',
    color: colors.black,
  },
  priceText: {
    fontSize: 20,
    color: colors.black,
    padding: 15,
  },
  paymentDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  payHeading: {
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
    color: colors.defaultGreen,
  },
  payText: {
    fontFamily: Fonts.Poppins_Regular,
    marginBottom: 10,
    color: colors.black,
  },
  discountText: {
    fontFamily: Fonts.Poppins_Regular,
    color: 'red',
    marginBottom: 10,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  separator: {
    height: 1,
    backgroundColor: colors.black,
    marginVertical: 10,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalText: {
    fontFamily: Fonts.Poppins_Bold,
    color: colors.black,
    fontSize: 18,
  },
  addressContainer: {
    marginTop: 15,
    marginBottom: 40,
  },
  addressHeading: {
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 18,
    color: colors.defaultGreen,
  },
  addressText: {
    fontFamily: Fonts.Poppins_Regular,
    color: colors.black,
  },
  ButtonContainer: {
    backgroundColor: colors.defaultGreen,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  btnText: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.Offwhite,
  },
  closeImage: {
    width: 30,
    height: 30,
  },
  actionHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginLeft: 20,
    padding: 5,
  },
  headingText: {
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: 18,
  },
  customConatiner: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
});

export default OrderDetails;
