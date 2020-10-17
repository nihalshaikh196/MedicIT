import React from 'react';
import {StyleSheet, Text, TouchableOpacity,View} from 'react-native';

const Box = ({name, number}) => {

  let obj = {
    heading: {
      color: 'rgba(255,7,58,0.98)',
    },
    casecount: {
      color: 'rgba(255,7,58,1)',
    },
    box:{
      marginRight:6
    }
  };

  if (name == 'Active') {
    obj.heading.color = '#007BFF';
    obj.casecount.color = '#007BFF';
  } else if (name == 'Recovered') {
    obj.heading.color = '#28a745';
    obj.casecount.color = '#28a745';
  } else if (name == 'Deaths') {
    obj.heading.color = '#6c757d';
    obj.casecount.color = '#6c757d';
    obj.box.marginRight=0;
  }
  return (
    <View style={[styles.box,obj.box]}>
      <Text style={[styles.heading, obj.heading]}>{` Total \n${name}`}</Text>
      <Text style={[styles.casecount, obj.casecount]}>{number}</Text>
    </View>
  );
};

export default Box;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#fff',
    height: 100,
    shadowColor: '#fff',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderRadius: 5,
    elevation: 5,
  },
  heading: {
    textAlign: 'center',
    fontSize: 16,
    paddingVertical: 6,
    fontWeight: '600',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  casecount: {
    color: '#20232a',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 3,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
});
