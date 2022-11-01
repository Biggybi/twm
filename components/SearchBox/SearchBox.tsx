import React, {useEffect, useState} from 'react';
import {ViewStyle} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';
// import

import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import useFetch from '../../hooks/useFetch';
import {Colors} from '../../tools/colors';
// import { colorContext } from '../../contexts/Color/colorContext';
import {useColor} from '../../contexts/Color/colorContext';
import {useTabID} from '../../contexts/Tab/tabIDContext';

const styleIconLarge = {
  size: 25,
};

const styleIconSmall = {
  size: 20,
};

export default function SearchBox(props: {
  dataType: string;
  setData: Function;
  placeholder: string;
}) {
  const tabid = useTabID();
  console.log(tabid);
  const [pattern, setPattern] = useState<string>('');
  const color = useColor();
  StyleSheet.create({colorStyle: color as ViewStyle});

  interface Item {
    Data: JSX.Element[];
  }

  // get data from useFetch hook
  const {data, error, status} = useFetch<Item>(props.dataType, pattern);

  let searchKO: boolean = Boolean(
    // ok if: not failed, data not empty, or loading
    error ||
      ((status == 'error' || data?.Data.length == 0) && status != 'loading'),
  );

  let searchOver = Boolean(status == 'fetched' && data?.Data.length);

  useEffect(() => {
    // update result list
    console.log('searchbox: useffect searchKO');

    if (searchOver) props.setData(data?.Data);
    return () => {
      searchKO = true;
    };
  }, [data]);

  return (
    <View
      // style={
      //   status == 'loading'
      //     ? [styles.searchBar, styles.searchBarLoading]
      //     : !searchOK
      //     ? [styles.searchBar, styles.searchBarFailed]
      //     : styles.searchBar}
      // style={[styles.searchBar, colorstyles]}>
      style={[
        styles.searchBar,
        {
          backgroundColor: Colors[color]?.light,
          borderColor: Colors[color]?.dark,
        },
      ]}>
      {/* search icon */}
      <MaterialCommunityIcons
        name="search"
        {...styleIconLarge}
        color={Colors.foreground.dark}
      />
      {/* input */}
      <TextInput
        style={styles.searchInput}
        value={pattern}
        onChangeText={pattern => setPattern(pattern)}
        placeholder={props.placeholder}
        placeholderTextColor={Colors.background.light}
      />
      {/* status icon */}
      {(searchKO && (
        // search error icon
        <MaterialCommunityIcons
          name="error"
          {...styleIconSmall}
          color={Colors.red.light}
        />
      )) ||
        (status == 'loading' && (
          // loading indicator (rotating)
          <ActivityIndicator style={styles.searchIcon} />
        )) || (
          // search success icon
          <MaterialCommunityIcons
            name="check-circle"
            {...styleIconSmall}
            color={Colors.blue.dark}
            // color={Colors[keyof ]}
          />
        )}
      {/* clear button */}
      <TouchableOpacity
        style={styles.clearSearchButton}
        // reset search on touch
        onPress={() => setPattern('')}>
        <MaterialCommunityIcons
          name="close"
          {...styleIconLarge}
          color={Colors.foreground.dark}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    paddingLeft: 20,
    // backgroundColor: Colors[ color ].light,
    // borderColor: Colors[ color ].dark,
    // borderColor: Colors.foreground.dark,
    // borderBottomWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 10,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
  },

  searchBarFailed: {
    borderColor: 'darkorange',
  },

  searchBarLoading: {
    borderColor: 'lightblue',
  },

  searchIconWrap: {
    flex: 0.7,
    alignContent: 'center',
    alignItems: 'center',
  },

  searchIcon: {
    // flex: 1,
    // marginHorizontal: 10,
    width: 21,
    height: 21,
    padding: 10,
    // backgroundColor: 'red',
  },

  searchInputWrap: {
    flex: 6,
    flexDirection: 'row',
  },

  searchInput: {
    // color: Colors.red.dark,
    marginBottom: -3,
    flex: 10,
  },

  statusHint: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  clearSearchButtonZone: {
    flex: 0.5,
  },

  clearSearchButton: {
    paddingRight: 20,
    // backgroundColor: 'red',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    // width: '100%',
    // textAlignVertical: 'auto',
  },
});
