import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import Vaccination from './navigation/Vaccination';
import Tracker from './navigation/Tracker';
import BMI from './navigation/BMI';
import Dashboard from './Screens/Dashboard/Dashboard';
import ImageUpload from './navigation/ImageUpload';
 import login from './Screens/Login/index'
import Analysis from './navigation/Analysis'

const AppNavigator = createStackNavigator(
  {

    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        headerShown: true,
      },
    },

    Vaccination: {
      screen: Vaccination,
      navigationOptions: {
        headerShown: false,
      },
    },

    Tracker: {
      screen: Tracker,
      navigationOptions: {
        headerShown: false,
      },
    },

    BMI: {
      screen: BMI,
      navigationOptions: {
        headerShown: false,
      },
    },

     ImageUpload: {
      screen: ImageUpload,
      navigationOptions: {
        headerShown: false,
      },
    },

    Analysis: {
      screen: Analysis,
      navigationOptions: {
        headerShown: false,
      },
    },

    login:{
      screen:login,
      navigationOptions:{
        headerShown: false,
      }
    }
  },
  {
    initialRouteName: 'login',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
