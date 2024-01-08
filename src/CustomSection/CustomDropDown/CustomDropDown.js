import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity,Image} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import Fonts from '../../General/Fonts/Fonts';
import {colors} from '../../General/Colors/Colors';
 
const CustomDropDown = props => {
  const {data, setData,prevData} = props;

 
 
  const [activeSection, setActiveSection] = useState([]);
  const [selected, setSelected] = useState(data[0]?.name);
 
 
  useEffect(() => {
    if (data) {
      setSelected( data[0]?.name);
     }
  }, [data]);

  const _updateSections = activeSection => {
    setActiveSection(activeSection);
  };

  const SECTIONS = [{id: 0, sectionData: data[0]?.name}];
 

  const _renderHeader = () => {
    return (
      <View style={styles.dropdownHeader}>
        <Text
          style={{
            fontFamily: Fonts.Poppins_Bold,
            fontSize: 18,
            color: colors.black,
            backgroundColor:colors.OffwhiteLevel_2,
            padding:20,
            borderRadius:10
             }}>
          {selected}
        </Text>


      </View>
    );
  };

  const _renderContent = () => {
    return (
      <View>

      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}

        // keyExtractor={index}
      contentContainerStyle={{ marginLeft:10}}
      
        renderItem={({item, index}) => {
            if (item === selected) {
            return null;
          } else {
            return (
              <TouchableOpacity
                style={{
                  borderTopColor: colors.black,
                  borderTopWidth: StyleSheet.hairlineWidth,
                }}
                 onPress={() => {
                  setData(item);
                  setSelected(item.name);
                  setActiveSection([]);
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.Poppins_Regular,
                    fontSize: 18,
                    lineHeight: 40,
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }
        }
      
      }
      />
      {/* <Image style={styles.ImgDownArrow} source={require("../../Assets/images/down-arrow.png")}/> */}

      </View>
    );
  };

  return (
    <View style={{width:"95%"}}>
      <Accordion
        activeSections={activeSection}
        sections={SECTIONS}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={_updateSections}
        underlayColor="transparent"
        sectionContainerStyle={{}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  dropdownHeader: {
    // justifyContent:"center",
    // alignItems:"center",
    
   },
   ImgDownArrow:{
    width:40,
    height:40,
    zIndex:99
   }
});

export default CustomDropDown;
