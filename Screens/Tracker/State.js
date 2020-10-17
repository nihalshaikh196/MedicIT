import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Cards from './Cards';
import Table from './Table';

const State = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [name, setName] = useState();
  const [isLoading, setLoading] = useState(true);
  let stateData = [];

  const stateData1 = navigation.getParam('stateData', 'No-data');
   
  useEffect(() => {
    setName(stateData1.name);
    fetch('https://api.covid19india.org/state_district_wise.json')
      .then((response) => response.json())
      .then((json) => {
        for (id in json[name]?.districtData) {
          stateData.push(json[name].districtData[id]);  
          stateData[stateData.length - 1].state = id;
          stateData[stateData.length - 1].deaths =
            stateData[stateData.length - 1].deceased;
      }
        setData(stateData);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  }, [name]);

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f8f9', paddingBottom: 30 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={{ marginBottom: 160 }}>
          <>
            <Text
              style={{
                fontSize: 36,
                textAlign: 'center',
                marginBottom: 10,
                color: 'blue', //#e23028
              }}>
              {name}
            </Text>
          </>
          <Cards data={stateData1} />
          <Table data={data} click="state" />
        </View>
      )}
    </View>
  );
};

export default State;

const styles = StyleSheet.create({});
