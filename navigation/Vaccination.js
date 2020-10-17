import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';


import ViewSchedule from '../Screens/Vaccination/ViewSchedule';
import ChildList from '../Screens/Vaccination/ChildList';
import childInfo from '../Screens/Vaccination/childInfo';
import detailInfo from '../Screens/Vaccination/detail_info';
import Box from '../Screens/Vaccination/Box';

const AppNavigator = createStackNavigator(
  {
   
    ChildList: {
      screen: ChildList,
      navigationOptions: {
        headerShown: false,
      },
    },

    ViewSchedule: {
      screen: ViewSchedule,
      navigationOptions: {
        headerShown: false,
      },
    },

    childInfo: {
      screen: childInfo,
      navigationOptions: {
        headerShown: false,
      },
    },

    detailInfo: {
      screen: detailInfo,
      navigationOptions: {
        headerShown: false,
      },
    },

    Box: {
      screen: Box,
      navigationOptions: {
        headerShown: false,
      },
    },

  },
  {
    initialRouteName: 'ChildList',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
