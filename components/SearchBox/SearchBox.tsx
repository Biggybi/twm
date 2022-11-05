import React, {useEffect, useState} from 'react';
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
import useDebounce from '../../hooks/useDebounce';

const styleIconLarge = {
  size: 30,
};

const styleIconSmall = {
  size: 25,
};

interface Item {
  Data: JSX.Element[];
}

export default function SearchBox(props: {
  dataType: string;
  setData: Function;
  placeholder: string;
}) {
  // user input + debounce
  const [inputTerm, setInputTerm] = useState<string>('');
  const debouncedInputTerm = useDebounce(inputTerm, 200);

  // fetch data hook
  const {data, error, status} = useFetch<Item>(
    props.dataType,
    debouncedInputTerm,
  );

  // current color
  const color = useColor();

  useEffect(() => {
    // update result list
    if (hasData) props.setData(data?.Data);
    return () => {
      searchKO = true;
    };
  }, [debouncedInputTerm]);

  // ko: no data or error
  let searchKO: boolean = Boolean(
    error ||
      ((status == 'error' || data?.Data.length == 0) && status != 'loading'),
  );

  // some data was fetched
  let hasData = Boolean(status == 'fetched' && data?.Data.length);

  return (
    <View
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
        value={inputTerm}
        onChangeText={inputTerm => setInputTerm(inputTerm)}
        placeholder={props.placeholder}
        placeholderTextColor={Colors.background.light}
      />
      {/* status icon */}
      {(searchKO && (
        // search error icon
        <MaterialCommunityIcons
          name="error"
          {...styleIconSmall}
          color={Colors.red.dark}
        />
      )) ||
        (status == 'loading' && (
          // loading indicator (rotating)
          <ActivityIndicator
            color={Colors.blue.dark}
            style={styles.searchIcon}
          />
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
        onPress={() => setInputTerm('')}>
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
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 10,
    height: 50,
    borderRadius: 25,
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
    width: 25,
    height: 25,
    padding: 10,
    color: Colors.blue.dark,
    // backgroundColor: 'red',
  },

  searchInputWrap: {
    flex: 6,
    flexDirection: 'row',
  },

  searchInput: {
    // color: Colors.red.dark,
    fontSize: 16,
    // marginBottom: -3,
    alignContent: 'center',
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
