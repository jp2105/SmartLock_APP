import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  AsyncStorage,
} from 'react-native';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
const sw = Dimensions.get('window').width;
const sh = Dimensions.get('window').height;
Icon.loadFont();
const Home = props => {
  const [currentStatus, setCurrentStatus] = useState();
  useEffect(() => {
    try {
      database()
        .ref('/')
        .on('value', snapshot => {
          setCurrentStatus(snapshot.val().servo);
        });
    } catch (e) {
      alert('something went wrong');
    }
  });

  const handleLock = status => {
    try {
      database()
        .ref('/')
        .set({
          servo: status,
        })
        .then(res => {
          AsyncStorage.getItem('user').then(res => {
            res = JSON.parse(res);
            var temp = {
              uid: res.uid,
              name: res.name,
              phone: res.phone,
              time: new Date(),
            };
            firestore()
              .collection('logs')
              .doc()
              .set(temp)
              .then(data => {})
              .catch(e => alert('something went wrong'));
          });
        })
        .catch(e => alert('something went wrong'));
    } catch (e) {
      alert('something went wrong');
    }
  };
  return (
    <View style={styles.mainView}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>Smart Lock</Text>
      </View>
      <View style={styles.bodyView}>
        <Text style={styles.bodyText}>Control Lock</Text>
      </View>
      <TouchableOpacity onPress={() => handleLock(true)}>
        <View
          style={[
            styles.button,
            {backgroundColor: currentStatus ? '#7C99D8' : 'rgb(25, 118, 210)'},
          ]}>
          <Text
            style={{fontSize: sw * 0.05, fontWeight: '400', color: 'white'}}>
            LOCK
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleLock(false)}>
        <View
          style={[
            styles.button,
            {backgroundColor: !currentStatus ? '#7C99D8' : 'rgb(25, 118, 210)'},
          ]}>
          <Text
            style={{fontSize: sw * 0.05, fontWeight: '400', color: 'white'}}>
            UNLOCK
          </Text>
        </View>
      </TouchableOpacity>
      <View style={{flex: 1}}>
        <View style={[styles.profile]}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('profile')}>
            <Icon
              name={'user-circle-o'}
              color={'rgb(25, 118, 210)'}
              size={sw * 0.12}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  headerView: {
    height: sh * 0.2,
    width: sw,
    backgroundColor: 'rgb(25, 118, 210)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: sw * 0.15,
    fontWeight: '400',
    color: 'white',
  },
  bodyView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyText: {
    marginVertical: sh * 0.03,
    fontSize: sw * 0.09,
  },
  textinputView: {
    flexDirection: 'row',
    marginVertical: sh * 0.01,
    marginHorizontal: sw * 0.05,
  },
  icon: {},
  textInput: {
    fontSize: sh * 0.03,
    marginLeft: sw * 0.03,
    width: sw * 0.7,
  },
  button: {
    height: sh * 0.07,
    backgroundColor: 'rgb(25, 118, 210)',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: sw * 0.3,
    marginVertical: sh * 0.02,
    borderRadius: sh * 0.25,
  },
  profile: {position: 'absolute', bottom: sw * 0.09, left: sw * 0.09},
});
export default Home;
