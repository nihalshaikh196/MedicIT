import React from 'react';
import {StyleSheet, View} from 'react-native';
import Box from './Box';

const Cards = ({data}) => {
  return (
    <View style={styles.container}>
      <Box name="Confirmed" number={data.confirmed} />
      <Box name="Active" number={data.active} />
      <Box name="Recovered" number={data.recovered} />
      <Box name="Deaths" number={data.deaths}/>
    </View>
  );
};

export default Cards;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 120,
  },
});
