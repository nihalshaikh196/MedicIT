import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import BMI from '../Screens/BMI/BMI';
import Result from '../Screens/BMI/Result';

const AppNavigator = createStackNavigator(
  {
    

    BMI: {
      screen: BMI,
      navigationOptions: {
        headerShown: false,
      },
    },

    Result: {
      screen: Result,
      navigationOptions: {
        headerShown: false,
      },
    },

  },
  {
    initialRouteName: 'BMI',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;

