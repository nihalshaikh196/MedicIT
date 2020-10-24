import React, {Component} from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import Background from '../Login/components/Background'

export default class Vaccination extends Component {
  render() {
    return (
      <ScrollView style={{borderTopWidth:20,borderBottomWidth:20,borderRadius:3,borderColor:'#1354b9'}}>
      <Background>
        <View style={styles.container}>

        <View style={{flex:1,flexDirection:"row"}}>
          <TouchableHighlight
            style={styles.buttonContainerLeft}
            onPress={() =>
              this.props.navigation.navigate('ChildList')
            }>
            <View>
            <Image source={require("../../img/vaccination.png")} style={styles.icon}/>
            <Text style={{color: 'white',fontSize: 20,fontWeight: 'bold', }}> Vaccination</Text>
            <Text style={{color: 'white',fontSize: 20,fontWeight: 'bold', }}> Schedule</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.buttonContainerRight}
            onPress={() => this.props.navigation.navigate('CoronaTracker')}>
            <View>
            <Image source={require("../../img/corona.png")} style={[styles.icon,{marginLeft:35}]}/>
            <Text style={styles.buttonText}> Corona Tracker </Text>
            </View>
          </TouchableHighlight>

        </View>

        <View style={{flex:1,flexDirection:"row"}}>
          <TouchableHighlight
            style={styles.buttonContainerLeft}
            onPress={() => this.props.navigation.navigate('BMI')}>
            <View>
            <Image source={require("../../img/bmi.png")} style={[styles.icon,{marginLeft:35}]}/>
            <Text style={styles.buttonText}> BMI Calculator </Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.buttonContainerRight}
            onPress={() => this.props.navigation.navigate('ImageUpload')}>
           <View>
            <Image source={require("../../img/file.png")} style={[styles.icon,{marginLeft:10}]}/>
            <Text style={styles.buttonText}> Reports </Text>
            </View>
          </TouchableHighlight>

        </View>
          <TouchableHighlight
            style={styles.buttonContainerCenter}
            onPress={() => this.props.navigation.navigate('Analysis')}>
            <View>
            <Image source={require("../../img/analysis.png")} style={[styles.icon,{marginLeft:10}]}/>
            <Text style={styles.buttonText}> Analysis </Text>
            </View>
          </TouchableHighlight>
        </View>
        </Background>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  buttonContainerLeft: {
    //flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50,
    width: 150,
    height: 150,
    borderRadius: 30,
    backgroundColor: '#1354b9',
  },
  icon:{
    resizeMode:"center",
    width:70,
    height:70,
    marginLeft:25
  },
  buttonContainerRight: {
    //flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50,
    marginLeft:20,
    width: 150,
    height: 150,
    borderRadius: 30,
    backgroundColor: '#1354b9',
  },

  buttonContainerCenter: {
    //flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50,
    marginLeft:80,
    width: 150,
    height: 150,
    borderRadius: 30,
    backgroundColor: '#1354b9',
  },

  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
