import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';


import ImagePicker from '../Screens/ImageUpload/ImagePicker';
import viewReport from '../Screens/ImageUpload/viewReport';
import uploadImage from '../Screens/ImageUpload/uploadImage'; 

const AppNavigator = createStackNavigator(
  {
    

    ImagePicker: {
      screen: ImagePicker,
      navigationOptions: {
        headerShown: false,
      },
    },



    uploadImage: {
      screen: uploadImage,
      navigationOptions: {
        headerShown: false,
      },
    }, 

    viewReport: {
      screen: viewReport,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'ImagePicker',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
