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
import {FireBaseStorage} from '../ImageUpload/firebase';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';



const ChildList = ({navigation}) => {
  const [childName, setchildName] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isrefresh, setRefresh] = useState(true);


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

  useEffect(() => {
    let temp=[];
     database()
        .ref('/Vaccination/'+auth().currentUser.uid)
        .once('value')
        .then(snapshot => {
        for(id in snapshot.val()){
          temp.push(id);
        }
        setchildName(temp);
        temp=[];

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
            let Ref = database().ref('/Vaccination/'+auth().currentUser.uid+'/'+title);

            Ref
            .remove()
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
      onPress={() => navigation.navigate('ViewSchedule', {name: title})}>
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
      text: 'Add new child',
      icon: require('./add.png'),
      name: 'Add new child',
      position: 1,
    },
  ];

  const renderItem = ({item}) => <Item title={item} />;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../img/bg.jpg')}
        style={styles.bgimage}>
        <Text style={styles.titleText}> List of Children </Text>
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
          data={childName}
          renderItem={renderItem}
          keyExtractor={(item) => item}
        />

        <FloatingAction
          actions={actions}
          onPressItem={() =>
            navigation.navigate('childInfo')
          }
        />
      </ImageBackground>
    </View>
  );
};

export default ChildList;

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
