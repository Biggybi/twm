import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTabID} from '../../contexts/Tab/tabIDContext';
import {useKeyboardVisible} from '../../tools/keyboard_visible';
import {Card} from '../Card/Cards';
import IEmployee, {EmployeeInfos} from '../Employees/EmployeeInfos';
import Employees from '../Employees/Employees';
import Favorites from '../Favorites/Favorites';
import Navbar from '../Navbar/Navbar';
import Planning from '../Planning/Planning';
import RoomInfos, {IRoom} from '../Rooms/RoomInfos';
import Rooms from '../Rooms/Rooms';
import Settings from '../Settings/Settings';
import TabPage from './TabPage';

// pages components (corresponding to a tab)
const pages: JSX.Element[] = [
  <Planning />,
  <Employees/>,
  // <TabPage<IEmployee>
  //   dataType="employee"
  //   renderItem={() => <Employees />}
  //   placeholderText="employee (by name or -ID)"
  //   searchBoxEnable={true}
  // />,
  <Rooms />,
  // <TabPage<IRoom>
  //   dataType="room"
  //   renderItem={() => <RoomInfos room='' />}
  //   placeholderText="room (by name or -ID)"
  // />,
  <Favorites />,
  <Settings />,
];

export default function CurrentTabPage() {
  const tabID = useTabID();
  console.log('-> current tab page');
  return (
    <>
      <View style={styles.currentPage}>{pages[tabID]}</View>
      {!useKeyboardVisible() && (
        <View style={styles.navBar}>
          <Navbar />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  currentPage: {
    flex: 20,
  },

  navBar: {
    flex: 1,
  },
});
