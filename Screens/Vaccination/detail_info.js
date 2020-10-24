import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, ImageBackground} from 'react-native';
import VaccineInfo from './vaccineInfo';
import CheckBox from '@react-native-community/checkbox';

const Detail_info = ({navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  let name = navigation.getParam('name', 'No-data');
  return (

    <View style={{flex:1,justifyContent:"center"}}>
    <ImageBackground
        source={require('../../img/bg.jpg')}
        style={styles.bgimage}>
    <Text style={styles.Text}>{name}</Text>
    <View style={{flex:1,borderTopLeftRadius:30,borderTopRightRadius:30, backgroundColor: '#f8f8f9', paddingBottom: 30}}>
      <VaccineInfo name={name} />
      
      {/* <View style={styles.center}>
        <View
          style={{
            backgroundColor: '#ff8913',
            borderWidth: 0.5,
            borderColor: '#fff',
            borderRadius: 5,
            height: 35,
            width: 130,
          }}>
          <Text style={styles.Text}>Given status:</Text>
        </View>
        <View style={{marginLeft: 20}}>
          <CheckBox
            style={styles.box}
            disabled={false}
            value={toggleCheckBox}
            onValueChange={(newValue) => setToggleCheckBox(newValue)}
            tintColors={{true: 'blue'}}
          />
        </View>
      </View> */}
    </View>
    </ImageBackground>
    </View>
  );
};

export default Detail_info;

const styles = StyleSheet.create({
  Text: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 150,
    marginBottom:20,
    marginLeft: 15,
  },
  bgimage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  center: {
    marginLeft: 15,
    marginTop: '10%',
    flexDirection: 'row',
  },
});
