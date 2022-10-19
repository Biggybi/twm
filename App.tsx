/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Teams from './components/Teams/Teams';
import Employees from './components/EmployeeCard/Employees';
import Navbar from './components/Navbar/Navbar';
// import Swiper from 'react-native-swiper';
import { useKeyboardVisible } from './hooks/keyboard_visible';

import {
  StyleSheet,
  View,
} from 'react-native';
import Planning from './components/Planning/Planning';

export default function App() {
console.log('========================')
  // keep track of current tab (by ID)
  const [tabID, setTabID] = useState<number>(3);

  useEffect(() => {
    console.log('App tabID =', tabID);
}, [tabID]);
  
  // bind to navBarItems
  const Pages = [
    <Home />,
    <Planning />,
    <Teams />,
    <Employees />,
    <Login />,
  ];

  // that's the application
  return (
    <View style={styles.pageWrap}>
      <View style={styles.body}>
        <View style={styles.currentPage}>{Pages[tabID]}</View>
        {!useKeyboardVisible() && (
          <View style={styles.navBar}>
            <Navbar callback={setTabID} tabid={tabID} />
          </View>
        )}
      </View>
    </View>
  );
}

// styles for components
const styles = StyleSheet.create({
  pageWrap: {
    flex: 1,
    backgroundColor: 'black',
  },

  body: {
    flex: 1,
    backgroundColor: 'darkgrey',
  },

  currentPage: {
    flex: 15,
  },

  navBar: {
    // flex: 1,
    // height:80,
    // alignContent: 'space-around',
    // backgroundColor: 'blue',
    marginVertical: 5,
    
  },
});
