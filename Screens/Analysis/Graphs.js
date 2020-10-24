import React,{ useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Alert,
} from 'react-native';
import {
    LineChart,
  } from "react-native-chart-kit";
  import database from '@react-native-firebase/database';
  import auth from '@react-native-firebase/auth';
import {FloatingAction} from 'react-native-floating-action';

import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';

const Graphs = ({navigation}) => {

  const [Diastolic, setDiastolic] = useState([]);
  const [Systolic, setSystolic] = useState([]);
  const [bslConcentration, setConcentration] = useState([]);
  const [bplDate, setbplDate] = useState([]);
  const [bslDate, setbslDate] = useState([]);
  const [isloading, setLoading] = useState(true);


      let temp2 = ["22","25","14","11"];
      let temp3 = ["22/5/2000","30/5/2000","26/5/2000","24/5/2000",];


      const chartConfig= {
        backgroundGradientFrom: "#1354b9",
        backgroundGradientTo: "#99C5FF",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#1354b9"
        }
      };


      

    useEffect(() => {
      let temp1 = [];

      const getdata=async()=>{

       await database()
        .ref('/Analysis/'+auth().currentUser.uid+'/bpl')
        .once('value')
        .then(snapshot => {
        for(id in snapshot.val()){


          setDiastolic((prev)=>{
            return [...prev,snapshot.val()[id].Diastolic]
          });

          setSystolic((prev)=>{
            return [...prev,snapshot.val()[id].Systolic]
          });

          setbplDate((prev)=>{
            return [...prev,snapshot.val()[id].date]
          });

          
        }
        
        });


        await database()
        .ref('/Analysis/'+auth().currentUser.uid+'/bsl')
        .once('value')
        .then(snapshot => {
        for(id in snapshot.val()){
          
          setConcentration((prev)=>{
            return [...prev,snapshot.val()[id].Concentration]
          });

          setbslDate((prev)=>{
            return [...prev,snapshot.val()[id].date]
          });

        }

        setLoading(false);
        });

      }

      getdata();
      //console.log(temp1);
  }, []);


  
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
    
        <View >
          <Text style={styles.Text}> Graphs </Text>
        </View>

        {isloading?
  (<ActivityIndicator size="large" color="#0000ff"/>):
        (

        <ScrollView style={{borderTopLeftRadius:30}}>

  
        <View>
  <Text style={styles.Type}>Blood Pressure Diastolic Chart</Text>

  
  <LineChart
  
    data={{
      datasets: [
        {
          data:Diastolic
        }
      ],

      legend:["Diastolic"]

    }}
    width={Dimensions.get("window").width} // from react-native

    height={220}
    yAxisLabel=""
    withHorizontalLabels
    yAxisSuffix=""
    yAxisInterval={1} // optional, defaults to 1
    verticalLabelRotation={20}

    onDataPointClick={({index}) => Alert.alert(bplDate[index])}

    chartConfig={chartConfig}

    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />

</View>

<View>
  <Text style={styles.Type}>Blood Pressure Systolic Chart</Text>


  <LineChart

    data={{
      datasets: [
        {
          data:Systolic
        }
      ],
      legend:["Systolic"]
    }}
    width={Dimensions.get("window").width} // from react-native

    height={220}
    yAxisLabel=""
    withHorizontalLabels
    yAxisSuffix=""
    yAxisInterval={1} 
    verticalLabelRotation={20}

    onDataPointClick={({index,value}) => Alert.alert(bplDate[index])}

    chartConfig={chartConfig}

    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />

</View>


<View>
  <Text style={styles.Type}>Blood Sugar Concentration Chart</Text>


  <LineChart

    data={{
      datasets: [
        {
          data:bslConcentration
        }
      ],
      legend:["Concentration"]
    }}
    width={Dimensions.get("window").width} // from react-native

    height={220}
    yAxisLabel=""
    withHorizontalLabels
    yAxisSuffix=""
    yAxisInterval={1} // optional, defaults to 1
    verticalLabelRotation={20}

    onDataPointClick={({index,value}) => Alert.alert(bslDate[index])}

    chartConfig={chartConfig}

    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
</View>

</ScrollView>
)}
        <FloatingAction
          actions={actions}
          onPressItem={(name) => navigation.navigate(name)}
        />

    </View>


  );
};

export default Graphs;

const styles = StyleSheet.create({

  Type:{
    color: '#1354b9',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 10,
    borderBottomWidth:2,
    width:'83%'
    //width: '80%',
    //height: 50,
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
});
