import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, ActivityIndicator, View, Image} from 'react-native';
import {FireBaseStorage} from './firebase';
import auth from '@react-native-firebase/auth';


const viewReport = ({navigation}) => {
  const reportName = navigation.getParam('name', 'No-image');
  const [imageURI, setImageURI] = useState(null);
  const [isloading, setLoading] = useState(true);

  useEffect(() => {
    let imageRef = FireBaseStorage.ref(auth().currentUser.email+'/'+ reportName);
    imageRef
      .getDownloadURL()
      .then((url) => {
        //from url you can fetched the uploaded image easily
        setImageURI(url);
        setLoading(false);
      })
      .catch((e) => console.log('getting downloadURL of image error => ', e));
  }, [reportName]);

  return (
    <View style={styles.container}>
      {isloading ? (
        <ActivityIndicator size="large" color="#0000ff"/>
      ) : (
        <Image style={styles.image} source={{uri: imageURI}} />
      )}
    </View>
  );
};

export default viewReport;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
      },
  image: {
    //flex:1;
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
});
