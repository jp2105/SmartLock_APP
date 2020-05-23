import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TextInput
} from 'react-native';

const sw = Dimensions.get('window').width;
const sh = Dimensions.get('window').height;

const Login: () => React$Node = () => {
    return (
        <View style={styles.mainView}>
            <View style={styles.headerView}>
                <Text style={styles.headerText}>
                    Smart Lock
                </Text>
            </View>
            <View style={styles.bodyView}>
                <Text style={styles.bodyText}>
                    Sign in
                </Text>
                <TextInput placeholder={'Email'}/>
                <TextInput placeholder={'Password'}/>
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
        justifyContent: 'center'
    },
    headerText: {
        fontSize: sw * 0.15,
        fontWeight: "400",
        color: 'white'
    },
    bodyView:{
        alignItems: "center",
        justifyContent: "center"
    },
    bodyText:{
        marginVertical:sh*0.03,
        fontSize: sw*0.09
    }
})
export default Login;
