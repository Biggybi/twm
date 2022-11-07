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

const styleSearchIcons = {
  // search icon / clear search icon
  color: Colors.gray.light,
  size: 25,
};

interface Props {
  dataType: string;
  setData: Function;
  placeholder: string;
}

export default function SearchBox({dataType, setData, placeholder}: Props) {
  // user input + debounce
  const [inputTerm, setInputTerm] = useState<string>('');
  const debouncedInputTerm = useDebounce(inputTerm, 200);

  // fetch data hook
  const {data, error, status} = useFetch<{Data: JSX.Element[]}>(
    dataType,
    debouncedInputTerm,
  );

  // current color
  const color = useColor();

  useEffect(() => {
    // update result list
    if (hasData) setData(data?.Data);
    return () => {
      searchKO = true;
    };
  }, [debouncedInputTerm]);

  // ko: error or no result
  let searchKO: boolean = Boolean(
    error ||
      ((status == 'error' || data?.Data.length == 0) && status != 'loading'),
  );

  // some data was fetched
  let hasData = Boolean(status == 'fetched' && data?.Data.length);

  let searchStatusIcon: {[key: string]: JSX.Element} = {
    success: (
      <MaterialCommunityIcons
        name="check-circle"
        size={25}
        color={Colors.blue.dark}
      />
    ),
    loading: (
      <ActivityIndicator
        color={Colors.blue.dark}
        style={styles.loadingIndicator}
      />
    ),
    error: (
      <MaterialCommunityIcons name="error" size={25} color={Colors.red.dark} />
    ),
  };

  const getSearchStatusIcon = () =>
    (searchKO && searchStatusIcon['error']) ||
    (status == 'loading' && searchStatusIcon['loading']) ||
    searchStatusIcon['success'];

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
      <MaterialCommunityIcons name="search" {...styleSearchIcons} />
      {/* input */}
      <TextInput
        style={styles.searchInput}
        value={inputTerm}
        onChangeText={inputTerm => setInputTerm(inputTerm)}
        placeholder={placeholder}
        placeholderTextColor={Colors[color]?.dark}
      />
      {/* status icon */}
      {getSearchStatusIcon()}
      {/* clear text button */}
      <TouchableOpacity
        style={styles.clearSearchButton}
        // reset search on touch
        onPress={() => setInputTerm('')}>
        <MaterialCommunityIcons name="close" {...styleSearchIcons} />
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

  loadingIndicatorWrap: {
    flex: 0.7,
    alignContent: 'center',
    alignItems: 'center',
  },

  loadingIndicator: {
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
    color: Colors.foreground.dark,
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
