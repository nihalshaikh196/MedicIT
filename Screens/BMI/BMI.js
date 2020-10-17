import React, {Component} from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  ImageBackground,
  TextInput,
  View,
  Alert,
} from 'react-native';


export default class Vaccination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      Height: 0,
      Weight: 0,
    };
  }

  bmiCalculate = (Height, Weight) => {
    let BMI;

    if (this.state.Name === '') {
      Alert.alert('Please enter name!');
    } else if (Height === 0) {
      Alert.alert('Please enter Height!');
    } else if (Weight === 0) {
      Alert.alert('Please enter Weight!');
    } else {

      BMI = Weight / Math.pow(Height / 100, 2);

      this.props.navigation.navigate('Result', {
        Name: this.state.Name,
        Height: Height,
        Weight: Weight,
        BMI: BMI.toFixed(2),
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../Vaccination/bg.jpg')}
          style={styles.image}>
          <Text style={styles.titleText}> BMI Calculator </Text>

          <View
            style={{
              backgroundColor: 'white',
              flex: 1,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            }}>
            <View style={styles.sideline}>
              <Text style={styles.Text}>Name: </Text>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputs}
                  placeholder="Name"
                  keyboardType="default"
                  underlineColorAndroid="transparent"
                  onChangeText={(Name) =>
                    this.setState({
                      Name,
                    })
                  }
                />
              </View>

              <View style={{height: 70, marginBottom: 40, marginTop: 20}}>
                <Text style={styles.Text}>Height: </Text>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.inputs}
                    placeholder="Height"
                    keyboardType="default"
                    underlineColorAndroid="transparent"
                    onChangeText={(Height) =>
                      this.setState({
                        Height,
                      })
                    }
                  />
                  <Text style={{fontSize: 20, marginRight: 20, color: 'grey'}}>
                    cm
                  </Text>
                </View>
              </View>

              <View style={{height: 90}}>
                <Text style={styles.Text}>Weight: </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.inputs}
                    placeholder="Weight"
                    keyboardType="default"
                    underlineColorAndroid="transparent"
                    onChangeText={(Weight) =>
                      this.setState({
                        Weight,
                      })
                    }
                  />
                  <Text style={{fontSize: 20, marginRight: 20, color: 'grey'}}>
                    kg
                  </Text>
                </View>
              </View>
            </View>
            <TouchableHighlight
              style={styles.buttonContainer}
              onPress={() =>
                this.bmiCalculate(this.state.Height, this.state.Weight)
              }>
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                {' '}
                Calculate{' '}
              </Text>
            </TouchableHighlight>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

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

  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
    marginLeft: "30%",
    width: 150,
    borderRadius: 30,
    backgroundColor: '#1354b9',
  },

  inputs: {
    height: 45,
    marginLeft: 16,
    flex: 1,
    fontSize: 20,
  },

  Text: {
    marginLeft:20,
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },

  titleText: {
    color: 'white',
    fontSize: 35,
    marginTop: '30%',
    fontWeight: 'bold',
    //backgroundColor: '#008080',
  },

  inputContainer: {
    borderBottomColor: '#ecf0f1',
    backgroundColor: '#ecf0f1',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 270,
    height: 45,
    marginTop: 5,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
