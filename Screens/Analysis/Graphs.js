import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import {
    LineChart,
  } from "react-native-chart-kit";

import {FloatingAction} from 'react-native-floating-action';

const Graphs = ({navigation}) => {

    

  const actions = [
    {
        text: 'Add new BPL',
        icon: require('./heart.png'),
        name: 'bplinput',
        position: 1,
    },

    {
         text: 'Add new BSL',
        icon: require('./diabetes.png'),
        name: 'bslinput',
        position: 2,
      },
  ];

  return (
    <View style={styles.container}>
        <View>
          <Text style={styles.Text}> Graphs </Text>
        </View>

        <View>
  <Text>Bezier Line Chart</Text>
  <LineChart
    data={{
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
</View>

        <FloatingAction
          actions={actions}
          onPressItem={(name) => navigation.navigate(name)}
        />

    </View>
  );
};

export default Graphs;

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
    height: 50,
    borderRadius: 10,
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
