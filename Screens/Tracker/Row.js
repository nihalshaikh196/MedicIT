import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import State from './State';

const Row = ({
  name,
  confirmed,
  active,
  recovered,
  deaths,
  header,
  navigation,
  clickable
}) => {
  const handleClick = () => {
    const obj = {
      name:name,
      confirmed:confirmed,
      active:active,
      recovered:recovered,
      deaths:deaths
    }
    if (clickable == "home") {
      navigation.navigate('State', { stateData : obj });
    }
    
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleClick}>
      <Text style={header ? styles.header : [styles.row, styles.mainrow]}>
        {name}
      </Text>
      <Text style={header ? styles.header : [styles.row, styles.mainrow]}>
        {confirmed}
      </Text>
      <Text style={header ? styles.header : [styles.row, styles.mainrow]}>
        {active}
      </Text>
      <Text style={header ? styles.header : [styles.row, styles.mainrow]}>
        {recovered}
      </Text>
      <Text style={header ? styles.header : [styles.row, styles.mainrow]}>
        {deaths}
      </Text>
    </TouchableOpacity>
  );
};

export default Row;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  mainrow: {
    width: 98,
  },
  row: {
    width: 90,
    height: 40,
    padding: 10,
    borderWidth: 0.97,
    borderColor: 'rgb(0,123,255)',
  },
  // left: {
  //   borderLeftWidth: 0,
  //   paddingLeft: 20,
  // },
  header: {
    width: 98,
    top: 0,
    borderWidth: 0.97,
    borderBottomWidth: 0,
    borderColor: 'white',
    backgroundColor: 'rgb(0,123,255)',
    padding: 10,
    paddingVertical: 7,
    paddingHorizontal: 3,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
});
