import React, {useState, Component} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableHighlight,
  Alert,
} from 'react-native';

import DateTimePicker from 'react-native-modal-datetime-picker';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import moment from 'moment';

const bplinput = ({navigation}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState('Select Date');
  const [Data, setData] = useState([]);
  const [Systolic, setSystolic] = useState(0);
  const [Diastolic, setDiastolic] = useState(0);
  const [bplData, setbplData] = useState([]);
  let Date = [];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    let dd = moment(date).format('DD').toString();
    let mm = moment(date).format('MM').toString();
    let yy = moment(date).format('YYYY').toString();

    setDate(moment(date).format('DD/MM/YYYY').toString());

    bplData.push({date: dd, month: mm, year: yy});

    hideDatePicker();
  };


  const insertdata= async()=>{
    await database()
     .ref('/Analysis/'+auth().currentUser.uid+'/bpl')
     .push(bplData)
     .then(() => {alert("Data added!!"); navigation.navigate('Graph');});
   }

  const addData = () => {
    if (Systolic === 0) {
      Alert.alert('Please enter systolic pressure!');
    } 
    else if (Diastolic === 0) {
        Alert.alert('Please select diastolic pressure!');
      }
    else if (date === 'Select Date') {
      Alert.alert('Please select date!');
    } 
    else {
      bplData[0].Systolic=Systolic;
      bplData[0].Diastolic=Diastolic;
      //console.log();
      insertdata();
      
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../img/bg.jpg')} style={styles.image}>
        <Text style={styles.titleText}>Blood Pressure Measurements </Text>

        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
            marginTop: 20,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}>
          <View
            style={{
              borderLeftWidth: 20,
              marginLeft: '8%',
              marginTop: '30%',
              borderLeftColor: '#1354b9',
            }}>

            <Text style={styles.Text}>Systolic Pressure: </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="Systolic"
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                onChangeText={(Systolic) => setSystolic(Systolic)}
              />
            </View>

            <Text style={styles.Text}>Diastolic Pressure: </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="Diastolic"
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                onChangeText={(Diastolic) => setDiastolic(Diastolic)}
              />
            </View>

            <View style={{height: 70, marginBottom: 40, marginTop: 20}}>
              <Text style={styles.Text}>Date of Measurement: </Text>

              <TouchableHighlight
                style={styles.dateViewer}
                onPress={showDatePicker}>
                <Text
                  style={{color: '#1354b9', fontWeight: 'bold', fontSize: 20}}>
                  {' '}
                  {date}{' '}
                </Text>
              </TouchableHighlight>

              <DateTimePicker
                isVisible={isDatePickerVisible}
                mode="date"
                style={{flex: 1}}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </View>
          </View>

          <TouchableHighlight
            style={styles.buttonContainer}
            onPress={addData}>
            <Text style={{color: 'white', fontWeight: 'bold'}}> Submit </Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    </View>
  );
};

export default bplinput;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    //backgroundColor: 'teal',
    //width: 360,
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    //transform: [{ rotate: "180deg" }],
  },

  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40,
    marginLeft: '30%',
    width: 150,
    borderRadius: 30,
    backgroundColor: '#1354b9',
  },

  inputs: {
    height: 45,
    marginLeft: 16,
    flex: 1,
    fontSize: 17,
  },

  Text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },

  titleText: {
    color: 'white',
    fontSize: 35,
    marginTop: '30%',
    fontWeight: 'bold',
    marginLeft:10
    //fontFamily:'Cochin',
    //backgroundColor: '#1354b9',
  },

  inputContainer: {
    borderBottomColor: '#ecf0f1',
    backgroundColor: '#ecf0f1',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 270,
    height: 45,
    marginTop: 5,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  dateViewer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
    marginLeft: 3,
    width: 270,
    borderRadius: 6,
    borderWidth: 1,
    backgroundColor: '#ecf0f1',
  },
});
