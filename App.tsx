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
import EmployeeList from './components/EmployeeCard/EmployeesList';
import Navbar from './components/Navbar/Navbar';
import { useKeyboardVisible } from './hooks/keyboard_visible';

import {
  StyleSheet,
  View,
} from 'react-native';
import Planning from './components/Planning/Planning';

export default function App() {
  useEffect(() => {
    console.log('App tabID =', tabID);
  });

// keep track of current tab (by ID)
  const [tabID, setTabID] = useState<number>(0);

  // return <Login />
  // return <Home />

  // bind to navBarItems
  const tabsComponents:JSX.Element[] = [
    <Home></Home>,
    <Planning></Planning>,
    <Teams></Teams>,
    <EmployeeList></EmployeeList>,
    <Login></Login>,
  ];
  
  // that's the application
  return (
    <View style={styles.pageWrap}>
      <View style={styles.body}>
        <View style={styles.page}>{tabsComponents[tabID]}</View>
        {!useKeyboardVisible() && (
          <View>
            <Navbar callback={setTabID} />
          </View>
        )}
      </View>
    </View>
  );
}

// styles for components
const styles = StyleSheet.create({
  // the top level wrapper (for e.g. custom global border radius color)
  pageWrap: { flex: 1, backgroundColor: 'black', },

  // the body (with header/footer)
  body: {flex: 1, backgroundColor: 'darkgrey', borderRadius: 20},

  // the 'page' that is displayed in the body, according to the Navigation Bar
  page: {flex: 1},
});
