import React, {createRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const sw = Dimensions.get('window').width;
const sh = Dimensions.get('window').height;
Icon.loadFont();
const Login = props => {
  const passwordRef = createRef();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState();
  const login = () => {
    setLoading(true);
    if (phone && password) {
      firestore()
        .collection('users')
        .where('phone', '==', phone)
        .where('password', '==', password)
        .get()
        .then(res => {
          if (res.docs.length == 0) {
            alert('phone or password is incorrect');
          }
          res.forEach(async doc => {
            try {
              await AsyncStorage.setItem('user', JSON.stringify(doc.data()));
              props.navigation.navigate('home');
            } catch (e) {
              console.log(e);
              alert('something went worng');
            }
          });
          setLoading(false);
        });
    } else {
      alert('Please enter Phone and Password');
      setLoading(false);
    }
  };
  AsyncStorage.getItem('user').then(res => {
    res && props.navigation.navigate('home');
  });

  return (
    <View style={styles.mainView}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>Smart Lock</Text>
      </View>

      <View style={styles.bodyView}>
        <Text style={styles.bodyText}>Sign in</Text>
      </View>
      <View style={styles.textinputView}>
        <Icon
          style={styles.icon}
          name={'phone'}
          size={sh * 0.04}
          color={'rgb(25, 118, 210)'}
        />
        <TextInput
            keyboardType={'number-pad'}
          style={styles.textInput}
          placeholder={'Phone'}
          returnKeyType={'next'}
          onChangeText={value => setPhone(value)}
          onSubmitEditing={() => {
            passwordRef.current.focus();
          }}
        />
      </View>

      <View style={styles.textinputView}>
        <Icon
          style={styles.icon}
          name={'lock-alert'}
          size={sh * 0.04}
          color={'rgb(25, 118, 210)'}
        />
        <TextInput
          ref={passwordRef}
          style={styles.textInput}
          placeholder={'Password'}
          onChangeText={value => setPassword(value)}
          returnKeyType={'done'}
          secureTextEntry={true}
          onSubmitEditing={() => {
            login();
          }}
        />
      </View>
      <TouchableOpacity onPress={login}>
        <View style={styles.button}>
          {!loading && (
            <Text
              style={{fontSize: sw * 0.09, fontWeight: '400', color: 'white'}}>
              Continue
            </Text>
          )}
          {loading && <ActivityIndicator size="large" color="#0000ff" />}
        </View>
      </TouchableOpacity>
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
    height: sh * 0.09,
    backgroundColor: 'rgb(25, 118, 210)',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: sw * 0.09,
    marginVertical: sh * 0.05,
    borderRadius: sh * 0.25,
  },
});
export default Login;
