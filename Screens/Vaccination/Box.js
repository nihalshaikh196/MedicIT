import React,{Component} from 'react';
import {StyleSheet,TouchableOpacity,Alert, Text,View} from 'react-native';
import VaccineInfo from './vaccineInfo';


const Box = ({name,date,month,year,navigation}) => {
  const onClickListener = () => {
    navigation.navigate('childInfo');
  };
  return (
    <TouchableOpacity style={[styles.box]} onPress={()=><VaccineInfo name/>}>
      <Text style={[styles.heading]} > {`${name}`}  </Text>
      <Text style={[styles.date]}> <Text style={{color:"#52FFFF"}}>Sceduled Date: </Text>{date} / {month} / {year} </Text>
      <Text style={styles.name}>Given status:<Text style={{color:"black"}}>     No</Text> </Text>
    </TouchableOpacity>
  );
};

export default Box;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#07B8B8',
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
    color:"#fff",
  },
  date: {
    color: '#323232',
    textAlign: 'left',
    fontSize: 18,
    marginLeft:20,
    fontWeight: 'bold',
    paddingVertical: 3,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },

  name: {
    color: '#52FFFF',
    textAlign: 'left',
    fontSize: 18,
    marginLeft:23,
    fontWeight: 'bold',
    paddingVertical: 3,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  }
});
