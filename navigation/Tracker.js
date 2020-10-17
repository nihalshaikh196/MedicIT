import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import CoronaTracker from '../Screens/Tracker/CoronaTracker';
import State from '../Screens/Tracker/State';

const AppNavigator = createStackNavigator(
  {
    CoronaTracker: {
      screen: CoronaTracker,
      navigationOptions: {
        headerShown: false,
      },
    },

    State: {
      screen: State,
      navigationOptions: {
        headerShown: true,
      },
    },

  },
  {
    initialRouteName: 'CoronaTracker',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;

