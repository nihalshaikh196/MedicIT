import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Cards from './Cards';
import Table from './Table';

const CoronaTracker = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  let stateData = [];

  useEffect(() => {
    fetch('https://api.covid19india.org/data.json')
      .then((response) => response.json())
      .then((json) => {
        for (id in json.statewise) {
          stateData.push(json.statewise[id]);
        }
        setData(stateData);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f8f9', paddingBottom: 30 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={{ marginBottom: 80 }}>
          <>
            <Text
              style={{
                fontSize: 36,
                textAlign: 'center',
                marginBottom: 10,
                color: 'blue', //#e23028
              }}>
              India
            </Text>
          </>
          <Cards data={data[0]} />
          <Table data={data} click="home"  navigation={navigation} />
        </View>
      )}
    </View>
  );
};

export default CoronaTracker;

const styles = StyleSheet.create({});
