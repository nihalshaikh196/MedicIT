import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';

let Name, Height, Weight, BMI;

const Result = ({navigation}) => {
  const [observationValue, setobservationValue] = useState('');

  useEffect(() => {
    Name = navigation.getParam('Name', 'No-data');
    Height = navigation.getParam('Height', 'No-data');
    Weight = navigation.getParam('Weight', 'No-data');
    BMI = navigation.getParam('BMI', 'No-data');
    observation(BMI);
  }, []);

  const observation = (bmi) => {
    let obs;

    if (bmi < 18.5) {
      obs = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
      obs = 'Normal Weight';
    } else if (bmi >= 25 && bmi < 30) {
      obs = 'Overweight';
    } else if (bmi >= 30) {
      obs = 'Obesity';
    } else {
      obs = 'No';
    }

    setobservationValue(obs);

    console.log(observationValue);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../Vaccination/bg.jpg')}
        style={styles.image}>
        <Text style={styles.titleText}> Body Mass Index</Text>

        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}>
          <View style={styles.sideline}>
            <Text style={styles.Text}>
              Name:
              <Text style={styles.insideText}>
                {'    '}
                {Name}{' '}
              </Text>
            </Text>

            <View style={{height: 40, marginTop: 10}}>
              <Text style={styles.Text}>
                Height: <Text style={styles.insideText}> {Height} cm </Text>
              </Text>
            </View>

            <View style={{height: 90}}>
              <Text style={styles.Text}>
                Weight <Text style={styles.insideText}> {Weight} kg </Text>
              </Text>
            </View>

            <View style={{height: 90}}>
              <Text style={styles.ansText}>BMI: </Text>
              <View style={styles.inputContainer}>
                <Text
                  style={{marginLeft: 20, fontSize: 25, fontWeight: 'bold'}}>
                  {BMI}
                </Text>
                <Text style={{fontSize: 22, marginLeft: 10, color: 'grey'}}>
                  kg/m2
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.obsview}>
            <Text style={styles.ansText}>
              You are in {observationValue} category!
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  sideline: {
    borderLeftWidth: 20,
    marginLeft: '8%',
    marginTop: '20%',
    borderLeftColor: '#1354b9',
  },

  inputs: {
    height: 45,
    marginLeft: 16,
    flex: 1,
  },

  obsview: {
    marginTop: '20%',
    marginHorizontal:'10%'
  },

  Text: {
    marginLeft: 20,
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },

  ansText: {
    marginLeft: 20,
    color: '#1354b9',
    fontSize: 30,
    fontWeight: 'bold',
  },

  insideText: {
    color: 'grey',
    fontSize: 20,
    fontWeight: 'bold',
  },

  titleText: {
    color: 'white',
    fontSize: 35,
    marginTop: '30%',
    fontWeight: 'bold',
  },

  inputContainer: {
    borderBottomColor: '#1354b9',
    backgroundColor: '#ecf0f1',
    borderRadius: 30,
    borderBottomWidth: 2,
    width: 270,
    height: 45,
    marginTop: 5,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
