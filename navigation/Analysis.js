import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import bslinput from '../Screens/Analysis/bslinput';
import bplinput from '../Screens/Analysis/bplinput';
import Graphs from '../Screens/Analysis/Graphs';
//import Result from '../Screens/BMI/Result';

const AppNavigator = createStackNavigator(
  {
    

    bslinput: {
      screen: bslinput,
      navigationOptions: {
        headerShown: false,
      },
    },

    bplinput: {
        screen: bplinput,
        navigationOptions: {
          headerShown: false,
        },
    },

    Graphs: {
        screen: Graphs,
        navigationOptions: {
          headerShown: false,
        },
    },

    // Result: {
    //   screen: Result,
    //   navigationOptions: {
    //     headerShown: false,
    //   },
    // },

  },
  {
    initialRouteName: 'Graphs',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;

