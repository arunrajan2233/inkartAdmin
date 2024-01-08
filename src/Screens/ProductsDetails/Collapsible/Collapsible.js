import React, {useState} from 'react';
import {View, Text, StyleSheet,Image} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import Fonts from '../../../General/Fonts/Fonts';
import { colors } from '../../../General/Colors/Colors';
   
const Collapsible = () => {
  const DetailsArray = [
    {
      title: 'Specifications',
      content:
        'As I understand, data is passed from the state and if I change it in component, it changes in state. Or maybe I am wrong? But when I try to enter text to input of this component it clears in moment. And I need to get text after clicking on button (for example like this method in screen):',
    },
    {
      title: 'Farm Details',
      content:
        'As I understand, data is passed from the state and if I change it in component, it changes in state. Or maybe I am wrong? But when I try to enter text to input of this component it clears in moment. And I need to get text after clicking on button (for example like this method in screen):',
    },
    {
      title: 'Vendor Info',
      content:
        'As I understand, data is passed from the state and if I change it in component, it changes in state. Or maybe I am wrong? But when I try to enter text to input of this component it clears in moment. And I need to get text after clicking on button (for example like this method in screen):',
    },
  ];

  const [currentSection, setCurrentSection] = useState([]);
 
  const _renderHeader = sections => {
 
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.SectionHeading}>{sections.title}</Text>
        <Image
          style={styles.upArrowStyle}
          source= {require('../../../Assets/images/down-arrow.png')}
        />
      </View>
    );
  };

  const _renderContent = sections => {
    return (
      <View>
        <Text>{sections.content}</Text>
      </View>
    );
  };

  const _updateSections = activeSections => {
    setCurrentSection(activeSections);
   };

  return (
    <>
      <Accordion
        activeSections={currentSection}
        sections={DetailsArray}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={_updateSections}
        underlayColor='transparent'
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  SectionHeading: {
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: 18,
    color: colors.black,
  },
  downarrowStyle: {
    width: 20,
    height: 20,
  },
  titleContainer:{
     flexDirection:"row",
     justifyContent:"space-between"
   },
   upArrowStyle:{
    width:40,
    height:40
   }
   
});

export default Collapsible;
