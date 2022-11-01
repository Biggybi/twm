import React from 'react';
import {Dimensions, FlatList, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useOrientation} from '../../hooks/useOrientation';

import {Colors} from '../../tools/colors';
import INavButton, {NavButton} from './NavButton';

type TNavBarList = Array<INavButton>;

let iconComponent = (name: string, color: string): JSX.Element => {
  return <MaterialCommunityIcons name={name} color={color} size={25} />;
};

// definition of navbar buttons
let navBarItems: TNavBarList = [
  {
    key: 0,
    name: 'planning',
    iconActive: iconComponent('calendar-today', Colors.magenta.dark),
    iconInactive: iconComponent('calendar-today', Colors.magenta.light),
    color: 'magenta',
  },
  {
    key: 1,
    name: 'groups',
    iconActive: iconComponent('account-multiple', Colors.green.dark),
    iconInactive: iconComponent('account-multiple', Colors.green.light),
    color: 'green',
  },
  {
    key: 2,
    name: 'rooms',
    iconActive: iconComponent('vector-square-open', Colors.blue.dark),
    iconInactive: iconComponent('vector-square-open', Colors.blue.light),
    color: 'blue',
  },
  {
    key: 3,
    name: 'favorites',
    iconActive: iconComponent('star', Colors.yellow.dark),
    iconInactive: iconComponent('star', Colors.yellow.light),
    color: 'yellow',
  },
  {
    key: 4,
    name: 'settings',
    iconActive: iconComponent('cog', Colors.red.dark),
    iconInactive: iconComponent('cog', Colors.red.light),
    color: 'red',
  },
];

// arguments: state for tab ID
export default function Navbar() {
  useOrientation();
  const itemWidth = Dimensions.get('window').width / navBarItems.length;
  console.log('itemwidth =', itemWidth);
  return (
    <FlatList
      style={styles.navBar}
      horizontal={true}
      indicatorStyle="white"
      data={navBarItems}
      renderItem={navBarItems => (
        <NavButton navButton={{...navBarItems.item}} width={itemWidth} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: Colors.background.light,
  },
});
