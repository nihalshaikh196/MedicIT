import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  RefreshControl,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {FloatingAction} from 'react-native-floating-action';
import {FireBaseStorage} from './firebase';
import auth from '@react-native-firebase/auth';

//import Firebase from '@react-native-firebase/app';

const ImageUpload = ({navigation}) => {
  const [imageNames, setImageNames] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isrefresh, setRefresh] = useState(false);


  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefresh(!isrefresh);
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);


auth().currentUser.email

  useEffect(() => {
    const temp = [];
    FireBaseStorage.ref(auth().currentUser.email+'/')
      .listAll()
      .then(function (res) {
        res._items.forEach(function (itemName) {
          let name = itemName.path.split('/');
          temp.push(name[1].split('.')[0]);
        });
        setImageNames(temp);
      })
      .catch(function (error) {

        console.log(error);
        Alert.alert('There is an internal error!');
      });
  }, [isrefresh]);

  const deleteItem = (title) => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this report?',
      [
        {
          text: 'Cancel',
          onPress: () => Alert.alert('Report not deleted'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            let imageRef = FireBaseStorage.ref(auth().currentUser.email+'/'+ title);
            imageRef
              .delete()
              .then(() => {
                setRefresh(!isrefresh);
                setRefresh(!isrefresh);
                Alert.alert(`${title} has been deleted successfully.`);
              })
              .catch((e) => console.log('error on image deletion => ', e));
          },
        },
      ],
      {cancelable: false},
    );
  };

  const Item = ({title}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('viewReport', {name: title})}>
      <Text style={styles.title}>{title}</Text>
      <Icon
        size={30}
        name="delete"
        onPress={() => deleteItem(title)}
        color="#1354b9"
      />
    </TouchableOpacity>
  );

  const actions = [
    {
      text: 'Upload',
      icon: require('./upload.png'),
      name: 'upload',
      position: 1,
    },
  ];

  const renderItem = ({item}) => <Item title={item} />;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../img/bg.jpg')}
        style={styles.bgimage}>
        <Text style={styles.titleText}> Reports </Text>
        <FlatList
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{
            backgroundColor: 'white',
            flex: 1,
            padding: 10,
            marginTop: 20,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
          data={imageNames}
          renderItem={renderItem}
          keyExtractor={(item) => item}
        />

        <FloatingAction
          actions={actions}
          onPressItem={() =>
            navigation.navigate('uploadImage', {refresh: isrefresh})
          }
        />
      </ImageBackground>
    </View>
  );
};

export default ImageUpload;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  bgimage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    //transform: [{ rotate: "180deg" }],
  },
  titleText: {
    color: 'white',
    fontSize: 35,
    marginTop: '30%',
    fontWeight: 'bold',
    //fontFamily:'Cochin',
    //backgroundColor: '#1354b9',
  },
  image: {
    height: 300,
    width: '100%',
    resizeMode: 'contain',
    backgroundColor: 'red',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#99C5FF',
    padding: 15,
    borderRadius: 30,
    marginVertical: 5,
    //borderBottomWidth: 1,
    //borderBottomColor: '#6C8888',
  },
  title: {
    //color:'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
