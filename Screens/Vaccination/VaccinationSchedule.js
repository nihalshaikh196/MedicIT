import React from 'react';
import {
  TouchableOpacity,
  Alert,
  View,
  StyleSheet,
  Text,
  FlatList,
} from 'react-native';

import {FloatingAction} from 'react-native-floating-action';

const VaccinationSchedule = ({navigation}) => {
  let array = [];
  let day, month, year;

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

  const revoffsetDays = (offset2, y2, d2, m2) => {
    let month = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (isLeap(y2)) month[2] = 29;

    let i;
    for (i = 1; i <= 12; i++) {
      if (offset2 <= month[i]) break;
      offset2 = offset2 - month[i];
    }

    d2 = offset2;
    m2 = i;

    // console.log(d2,m2,y2);

    array.push({date: d2, month: m2, year: y2});
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

    let m2, d2;
    revoffsetDays(offset2, y2, d2, m2);
  };

  const schedule = () => {
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

    const date = navigation.getParam('date', 'No-data');

    day = parseInt(date[0].date, 10);
    month = parseInt(date[0].month, 10);
    year = parseInt(date[0].year, 10);

    if (date == 'No-data') {
      day = parseInt(new Date().getDate().toString(), 10);
      month = parseInt(new Date().getMonth().toString(), 10);
      year = parseInt(new Date().getFullYear().toString(), 10);
    }

    
    for (let i = 0; i < 24; i++) {
      addDays(day, month, year, days[i]);
      array[i].vaccineName = vaccines[i];
    }
  };

  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: '100%',
          backgroundColor: '#fff',
        }}
      />
    );
  };

  const Name = navigation.getParam('name', 'Vaccination Schedule');

  const ItemView = ({item}) => {
    return (
      <TouchableOpacity
        style={[styles.box]}
        onPress={() =>
          navigation.navigate('detailInfo', {name: item.vaccineName})
        }>
        <Text style={[styles.heading]}> {`${item.vaccineName}`} </Text>
        <Text style={[styles.date]}>
          {' '}
          <Text style={{color: '#52FFFF'}}>Scheduled Date: </Text>
          {day} / {month} / {year}{' '}
        </Text>
        <Text style={styles.name}>
          Given status:<Text style={{color: 'black'}}> No</Text>{' '}
        </Text>
      </TouchableOpacity>
    );
  };

  const actions = [
    {
      text: 'Add new child',
      icon: require('./add.png'),
      name: 'Add new child',
      position: 1,
    },
  ];

  schedule();
  //console.log(array);
  return (
    <View style={styles.container}>
        <View>
          <Text style={styles.Text}> {Name} </Text>
        </View>

        <View>
          <FlatList
            data={array}
            ItemSeparatorComponent={FlatListItemSeparator}
            renderItem={({item}) => ItemView({item})}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <FloatingAction
          actions={actions}
          onPressItem={() => navigation.navigate('childInfo')}
        />

    </View>
  );
};

export default VaccinationSchedule;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 50,
    width: 200,
    height: 120,
    borderRadius: 30,
    backgroundColor: '#FF8913',
  },

  FlatListItemStyle: {
    padding: 10,
    fontSize: 20,
    height: 50,
  },

  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    width: '100%',
    height: '100%',
  },
 
  Text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    alignContent: 'center',
    textAlign: 'center',
    backgroundColor: '#1354b9',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 35,
    width: '80%',
    height: 90,
    borderRadius: 10,
  },

  Card: {
    backgroundColor: 'red',
  },

  icon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ee6e73',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },

  box: {
    flex: 1,
    backgroundColor: '#99C5FF',
    height: 120,
    borderRadius: 10,
    elevation: 5,
  },
  heading: {
    textAlign: 'left',
    fontSize: 25,
    paddingVertical: 6,
    fontWeight: '600',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    fontWeight: 'bold',
    color: '#fff',
  },
  date: {
    color: '#323232',
    textAlign: 'left',
    fontSize: 18,
    marginLeft: 20,
    fontWeight: 'bold',
    paddingVertical: 3,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },

  name: {
    color: '#52FFFF',
    textAlign: 'left',
    fontSize: 18,
    marginLeft: 23,
    fontWeight: 'bold',
    paddingVertical: 3,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
});
