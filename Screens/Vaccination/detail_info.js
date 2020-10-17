import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import VaccineInfo from './vaccineInfo';
import CheckBox from '@react-native-community/checkbox';

const Detail_info = ({navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  let name = navigation.getParam('name', 'No-data');
  return (
    <View style={{flex: 1, backgroundColor: '#f8f8f9', paddingBottom: 30}}>
      <VaccineInfo name={name} />

      <View style={styles.center}>
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
      </View>
    </View>
  );
};

export default Detail_info;

const styles = StyleSheet.create({
  Text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 2,
    marginLeft: 5,
  },

  // textContainer: {
  //   flexDirection: 'row',
  //   marginLeft:'3.5%',
  //   alignItems: 'center',
  //   backgroundColor: '#ff8913',
  //   borderWidth: 0.5,
  //   borderColor: '#fff',
  //   height: 145,
  //   width: 150,
  //   borderRadius: 25,
  //   margin: 5,
  // },

  center: {
    marginLeft: 15,
    marginTop: '10%',
    flexDirection: 'row',
  },
});
