import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTabID} from '../../contexts/Tab/tabIDContext';
import {useKeyboardVisible} from '../../tools/keyboard_visible';
import IEmployee from '../Employees/EmployeeInfos';
import Employees from '../Employees/Employees';
import Rooms from '../Rooms/Rooms';
import Favorites from '../Favorites/Favorites';
import Navbar from '../Navbar/Navbar';
import Planning from '../Planning/Planning';
import {default as IRoom} from '../Rooms/RoomInfos';
import Settings from '../Settings/Settings';
import TabPage from './TabPage';

// pages components (corresponding to a tab)
const pages: JSX.Element[] = [
  <Planning />,
  <TabPage<IEmployee>
    dataType="employee"
    renderItem={() => <Employees />}
    // renderItem={employeedata => (
    //   <Card cardInfos={<EmployeeInfos employee={employeedata.item} />} />
    // )}
    placeholderText="employee (by name or -ID)"
    searchBoxEnable={true}
  />,
  <TabPage<IRoom>
    dataType="room"
    renderItem={() => <Rooms />}
    // renderItem={roomdata => (
    //   <Card cardInfos={<RoomInfos room={roomdata.item} />} />
    // )}
    placeholderText="room (by name or -ID)"
  />,
  <Favorites />,
  <Settings />,
];

export default function CurrentTabPage() {
  const tabID = useTabID();
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
