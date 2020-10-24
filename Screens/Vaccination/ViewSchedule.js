import React,{useEffect,useState} from 'react';
import {
  TouchableOpacity,
  Alert,
  View,
  StyleSheet,
  Text,
  FlatList,
} from 'react-native';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const ViewSchedule = ({navigation}) => {

  const [ScheduleList, setScheduleList] = useState([]);

  const Name = navigation.getParam('name','Nihal');

  useEffect(() => {

    
    database()
        .ref('/Vaccination/'+auth().currentUser.uid+'/'+Name)
        .once('value')
        .then(snapshot => {
        for(id in snapshot.val()){
          setScheduleList(snapshot.val()[id]);
        }
        });
  }, []);


      const FlatListItemSeparator = () => {
        return (
          <View
            style={{
              height: 5,
              width: '100%',
              backgroundColor: '#fff',
            }}
          />
        );
      };


     

  const ItemView = ({item}) => {
    return (
      <TouchableOpacity
        style={[styles.box]}
        onPress={() =>
          navigation.navigate('detailInfo', {name: item.vaccineName})
        }>
        <Text style={[styles.heading]}> {`${item.vaccineName}`} </Text>
        <Text style={[styles.date]}>
          {' '}
          <Text style={{color: '#52FFFF'}}>Sceduled Date: </Text>
          {item.date} / {item.month} / {item.year}{' '}
        </Text>
      </TouchableOpacity>
    );
  };


    return (
        <View style={styles.container}>
        <View>
          <Text style={styles.Text}> {Name} </Text>
        </View>

        <View style={{flex:1}}>
          <FlatList
            data={ScheduleList}
            ItemSeparatorComponent={FlatListItemSeparator}
            renderItem={({item}) => ItemView({item})}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
    </View>
    )
}

export default ViewSchedule;

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: 20,
        marginLeft: 50,
        width: 200,
        height: 120,
        borderRadius: 30,
        backgroundColor: '#FF8913',
      },
    
      FlatListItemStyle: {
        padding: 10,
        fontSize: 20,
        height: 50,
      },
    
      container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        width: '100%',
        height: '100%',
      },
    
      Text: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        alignContent: 'center',
        textAlign: 'center',
        backgroundColor: '#1354b9',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 35,
        width: '80%',
        height: 50,
        borderRadius: 10,
      },
    
      icon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#ee6e73',
        position: 'absolute',
        bottom: 10,
        right: 10,
      },
    
      box: {
        flex: 1,
        backgroundColor: '#99C5FF',
        height: 120,
        borderRadius: 10,
        elevation: 5,
      },
      heading: {
        textAlign: 'left',
        fontSize: 30,
        paddingVertical: 6,
        fontWeight: '600',
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        fontWeight: 'bold',
        color: '#fff',
      },
      date: {
        color: '#323232',
        textAlign: 'left',
        fontSize: 23,
        marginLeft: 20,
        fontWeight: 'bold',
        paddingVertical: 3,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
      },
    
      name: {
        color: '#52FFFF',
        textAlign: 'left',
        fontSize: 18,
        marginLeft: 23,
        fontWeight: 'bold',
        paddingVertical: 3,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
      },
})
