/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {ReactDOM, useEffect, useState} from 'react';
import SearchBox from './components/SearchBox/SearchBox';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import { useKeyboardVisible } from './hooks/keyboard_visible';

import {
  StyleSheet,
  View,
} from 'react-native';

export default function App() {
  useEffect(() => {
    console.log('App tabID =', tabID);
  });

  const [tabID, setTabID] = useState<number>(0);
  // return <Login />
  // return <Home />
  const tabsComponents = [
    <Home></Home>,
    <Login></Login>,
    <Login></Login>,
    <SearchBox></SearchBox>,
    <SearchBox></SearchBox>,
  ];
  return (
    <View style={styles.pageWrap}>
      <View style={styles.page}>
        <View style={styles.pageContent}>{tabsComponents[tabID]}</View>
        {!useKeyboardVisible() && (
          <View style={styles.navbar}>
            <Navbar callback={setTabID} />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageWrap: {
    flex: 1,
    backgroundColor: 'black',
  },

  page: {
    flex: 1,
    backgroundColor: 'darkgrey',
    borderRadius: 20
  },

  pageContent: {
    flex: 1,
  },

  navbar: {
    // display: 'flex',
    // height: 40,
  },
});
