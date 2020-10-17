import React, {useState} from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  Alert,
  ImageBackground,
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import {FireBaseStorage} from './firebase';
import auth from '@react-native-firebase/auth';

const uploadImage = ({navigation}) => {
  const [reportName, setName] = useState('');
  const [imageNmae, setIname] = useState('Select Report');
  const [imageURI, setImageURI] = useState(null);
  const [responses, setresponses] = useState(null);

  //const Temp = useContext(Context);

  const getFileLocalPath = (response) => {
    const {path, uri} = response;
    return Platform.OS === 'android' ? path : uri;
  };

  const createStorageReferenceToFile = (response) => {
    const {fileName} = response;
    return FireBaseStorage.ref(auth().currentUser.email+'/' + fileName);
  };

  const uploadFileToFireBase = (imagePickerResponse) => {
    const fileSource = getFileLocalPath(imagePickerResponse);
    const storageRef = createStorageReferenceToFile(imagePickerResponse);
    Alert.alert('Successfully Uploaded!!');
    return storageRef.putFile(fileSource);
  };

  const upload = (responseofImage) => {
    if (responseofImage == null) {
      Alert.alert('Please Select image of Report!!');
    } else if (reportName === '') {
      Alert.alert('Please Enter Report Name!!');
    } else {
      responseofImage.fileName = reportName;
      Promise.resolve(uploadFileToFireBase(responseofImage));
      navigation.navigate('ImagePicker');
    }
  };
  const imagePickerOptions = {
    noData: true,
  };

  const selectImage = () => {
    ImagePicker.showImagePicker(imagePickerOptions, (response) => {
      if (response.didCancel) {
        alert('No report selected!');
      } else if (response.error) {
        alert(response.error);
      } else {
        setImageURI({uri: response.uri});

        setIname(response.fileName);

        setresponses(response);

      }
    });

  
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../img/bg.jpg')}
        style={styles.image}>
        <Text style={styles.titleText}> Upload Report </Text>
        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
            marginTop: 20,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}>
          <View
            style={{
              borderLeftWidth: 20,
              marginLeft: '8%',
              marginTop: '30%',
              borderLeftColor: '#1354b9',
            }}>
            <Text style={styles.Text}>Report Name: </Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="Name"
                keyboardType="default"
                underlineColorAndroid="transparent"
                onChangeText={(reportName) => setName(reportName)}
              />
            </View>

            <View style={{height: 70, marginBottom: 40, marginTop: 20}}>
              <Text style={styles.Text}>Select Report: </Text>

              <TouchableHighlight
                style={styles.selectImage}
                onPress={selectImage}>
                <Text
                  style={{
                    color: '#1354b9',
                    fontWeight: 'bold',
                    fontSize: 20,
                    height: 30,
                  }}>
                  {imageNmae}
                </Text>
              </TouchableHighlight>
            </View>
          </View>
          <TouchableHighlight
            style={styles.buttonContainer}
            onPress={() => upload(responses)}>
            <Text style={{color: 'white', fontWeight: 'bold'}}> Upload </Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    </View>
  );
};
export default uploadImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: 'white',
    width: 360,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    //transform: [{ rotate: "180deg" }],
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40,
    marginLeft: '30%',
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
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },

  titleText: {
    color: 'white',
    fontSize: 35,
    marginTop: '25%',
    fontWeight: 'bold',
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

  selectImage: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
    marginLeft: 3,
    width: 270,
    borderRadius: 6,
    borderWidth: 1,
    backgroundColor: '#ecf0f1',
  },
});
