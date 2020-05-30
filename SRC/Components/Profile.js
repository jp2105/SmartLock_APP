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
import Icon from 'react-native-vector-icons/FontAwesome';
const sw = Dimensions.get('window').width;
const sh = Dimensions.get('window').height;
Icon.loadFont();
const Profile = props => {
  const [currentUser, setCurrentUse] = useState();
  useEffect(() => {
    AsyncStorage.getItem('user').then(res => setCurrentUse(JSON.parse(res)));
  });
  return (
    <View style={styles.mainView}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>Smart Lock</Text>
      </View>
      <View style={styles.bodyView}>
        <Text style={styles.bodyText}>Profile</Text>
      </View>
      <View style={{marginHorizontal: sw * 0.09}}>
        <Text style={{fontSize: 25}}>
          Name: {currentUser && currentUser.name}
        </Text>
        <Text style={{fontSize: 25}}>
          Phone: {currentUser && currentUser.phone}
        </Text>
        <Text style={{fontSize: 12, color: 'red'}}>
          (To manage Profile go to our website.)
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'column-reverse',
          marginVertical: sh * 0.05,
        }}>
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.removeItem('user').then(() => {
              props.navigation.navigate('login');
            });
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgb(25, 118, 210)',
              padding: 15,
              borderRadius: sw * 0.25,
              marginHorizontal: 30,
            }}>
            <Text style={{color: 'white', fontSize: 20}}>Logout</Text>
          </View>
        </TouchableOpacity>
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
});
export default Profile;
