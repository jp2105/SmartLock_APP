import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import Navigation from './SRC/Navigation/index';
const App = () => {
  console.disableYellowBox = true;
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <Navigation />
      </SafeAreaView>
    </>
  );
};

export default App;
