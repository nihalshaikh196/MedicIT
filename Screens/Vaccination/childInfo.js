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

const childInfo = ({navigation}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState('Select Date of birth');
  const [choosenDate, setDates] = useState([]);
  const [Name, setName] = useState('');


  let array = [];
  let day, month, year;


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

    Date.push({date: dd, month: mm, year: yy});

    setDates(Date);

    hideDatePicker();
  };



  const isLeap = (y) => {
      if ((y % 100 != 0 && y % 4 == 0) || y % 400 == 0) return true;
  
      return false;
    };

  const offsetDays = (d, m, y) => {
    let offset = d;

    switch (m - 1) {
      case 11:
        offset += 30;
      case 10:
        offset += 31;
      case 9:
        offset += 30;
      case 8:
        offset += 31;
      case 7:
        offset += 31;
      case 6:
        offset += 30;
      case 5:
        offset += 31;
      case 4:
        offset += 30;
      case 3:
        offset += 31;
      case 2:
        offset += 28;
      case 1:
        offset += 31;
    }

    if (isLeap(y) && m > 2) offset += 1;

    return offset;
};




  const revoffsetDays = (offset2, y3) => {
    let month = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (isLeap(y3)) month[2] = 29;

    let i;
    for (i = 1; i <= 12; i++) {
      if (offset2 <= month[i]) break;
      offset2 = offset2 - month[i];
    }

    let d3 = offset2;
    let m3 = i;

     //console.log(d3,m3,y3);

    array.push({date: d3, month: m3, year: y3});
  };

  const addDays = (d1, m1, y1, x) => {
    let offset1 = offsetDays(d1, m1, y1);
    let remDays = isLeap(y1) ? 366 - offset1 : 365 - offset1;

    
    let y2, offset2;
    if (x <= remDays) {
      y2 = y1;
      offset2 = offset1 + x;
    } else {
      x -= remDays;
      y2 = y1 + 1;
      let y2days = isLeap(y2) ? 366 : 365;
      while (x >= y2days) {
        x -= y2days;
        y2++;
        y2days = isLeap(y2) ? 366 : 365;
      }
      offset2 = x;
    }
    //console.log(d2,m2,y2);
    revoffsetDays(offset2, y2);
  };

  const insertdata= async()=>{
    await database()
     .ref('/Vaccination/'+auth().currentUser.uid+'/'+Name)
     .push(array)
     .then(() => alert("Schedule Generated!!"));
   }

  const Schedule = () => {
    if (Name === '') {
      Alert.alert('Please enter child name!');
    } else if (date === 'Select Date of birth') {
      Alert.alert('Please select date!');
    } else {

      let vaccines = [
        'BCG',
        'Hepatitis B',
        'OPV-0',
        'OPV 1',
        'Pentavalent-1',
        'Rotavirus',
        'IPV',
        'OPV-2',
        'Pentavalent-2',
        'Rotavirus',
        'OPV 3',
        'Pentavalent-3',
        'Rotavirus',
        'IPV',
        'Measles-rubella-1st',
        'Vitamin A',
        'JE-1',
        'DPT Booster-1',
        'Measles-rubella-2nd',
        'OPV Booster',
        'JE-2',
        'Vitamin-A',
        'DPT Booster -2',
        'TT',
      ];
      let days = [
        0,
        0,
        0,
        42,
        42,
        42,
        42,
        70,
        70,
        70,
        98,
        98,
        98,
        98,
        270,
        270,
        270,
        480,
        480,
        480,
        480,
        480,
        1825,
        3650,
      ];
  
      day =10;// parseInt(Date[0].date, 10);
      month =10;// parseInt(Date[0].month, 10);
      year = 2000;//parseInt(Date[0].year, 10);
  console.log(Date);
      //console.log(day,month,year);
      
      for (let i = 0; i < 24; i++) {
        addDays(day, month, year, days[i]);
        array[i].vaccineName = vaccines[i];
      }

      insertdata();
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./bg.jpg')} style={styles.image}>
        <Text style={styles.titleText}> Add Child Details </Text>

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
            <Text style={styles.Text}>Name: </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="Name of child"
                keyboardType="default"
                underlineColorAndroid="transparent"
                onChangeText={(Name) => setName(Name)}
              />
            </View>

            <View style={{height: 70, marginBottom: 40, marginTop: 20}}>
              <Text style={styles.Text}>Date of Birth: </Text>

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
            onPress={Schedule}>
            <Text style={{color: 'white', fontWeight: 'bold'}}> Generate </Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    </View>
  );
};

export default childInfo;

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
