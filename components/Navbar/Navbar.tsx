import {useState, useEffect} from 'react';
// import React, {useEffect, useState, Component} from 'react';

// import {ReactDOM} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Image,
  TouchableNativeFeedback,
  Button,
  FlatList,
  ListRenderItemInfo,
  ListRenderItem,
  TouchableOpacity,
  DatePickerAndroid,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {type PropsWithChildren} from 'react';
import HTTP from 'react';

import INavButton, {NavButton } from './NavButton';

type TNavBarList = Array<INavButton>;

// definition of navbar items
let navBarItems: TNavBarList = [
  {
    id: 1,
    name: 'home',
    image: require('../../assets/icons/home.png'),
    style: {
      backgroundColor: 'red',
    },
  },
  {
    id: 2,
    name: 'planning',
    image: require('../../assets/icons/calendar.png'),
    style: {
      backgroundColor: 'pink',
    },
  },
  {
    id: 3,
    name: 'teams',
    image: require('../../assets/icons/users-alt.png'),
    style: {
      backgroundColor: 'blue',
    },
  },
  {
    id: 4,
    name: 'people',
    image: require('../../assets/icons/users.png'),
    style: {
      backgroundColor: 'purple',
    },
  },
  {
    id: 5,
    name: 'profile',
    image: require('../../assets/icons/settings.png'),
    style: {
      backgroundColor: 'orange',
    },
  },
];

export default function Navbar(props: {callback: (id: number) => void}) {

  function getTabID(id: number) {
    console.log(id);
  }
  return (
    <FlatList
      // horizontal={true}
      // onViewableItemsChanged={onViewableItemsChanged}
      columnWrapperStyle={styles.listColumnWrapper}
      numColumns={navBarItems.length}
      keyExtractor={navBarItems => navBarItems.id}
      data={navBarItems}
      renderItem={navBarItems => {
        // return <NavButton parentCallbak={getTabID} />;
        // return <NavButton navButton={navBarItems} callback="getTabID()" />;
        var item: INavButton = {...navBarItems.item};
        return <NavButton navButton={item} callback={props.callback} />;
        // return <NavButton navButton={item} callback={setTabID} />;
      }}
    />
  );
}

const styles = StyleSheet.create({
  listColumnWrapper: {
    height: 70,
    margin: 0,
    padding: 0,
  },
});
