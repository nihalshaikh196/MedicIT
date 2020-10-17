import React, {Component} from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

export default class Vaccination extends Component {
  render() {
    return (
      <ScrollView>
        <View>
          <TouchableHighlight
            style={styles.buttonContainer}
            onPress={() =>
              this.props.navigation.navigate('ChildList')
            }>
            <Text style={styles.buttonText}> Vaccination Schedule </Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.buttonContainer}
            onPress={() => this.props.navigation.navigate('CoronaTracker')}>
            <Text style={styles.buttonText}> Corona Tracker </Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.buttonContainer}
            onPress={() => this.props.navigation.navigate('BMI')}>
            <Text style={styles.buttonText}> BMI calculator </Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.buttonContainer}
            onPress={() => this.props.navigation.navigate('ImageUpload')}>
            <Text style={styles.buttonText}> Documents </Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.buttonContainer}
            onPress={() => this.props.navigation.navigate('Analysis')}>
            <Text style={styles.buttonText}> Analysis </Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 70,
    marginLeft: 70,
    width: 220,
    height: 120,
    borderRadius: 30,
    backgroundColor: '#FF8',
  },

  buttonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
