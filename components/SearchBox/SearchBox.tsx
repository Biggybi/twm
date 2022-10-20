import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import useFetch from '../../hooks/useFetch';

// var starting = true;
export default function SearchBox(props: {
  dataType: string;
  setData: Function;
}) {
  const [pattern, setPattern] = useState<string>('');

  interface Item {
    // our api retunrs `Data[]`
    Data: [ItemContent];
  }

  interface ItemContent {
    // our api retunrs `Data[]`
    firstname: string;
    lastname: string;
    key: string;
  }
  
  const {data, error, state} = useFetch<Item>(props.dataType, pattern);
  const searchOK: boolean = Boolean(
    (state != 'error' && data?.Data.length) || state == 'loading',
  );

  useEffect(() => {
    // update result list
    if (state == 'fetched' && data?.Data.length) props.setData(data?.Data);
  }, [data, error, state])
    

  return (
    <View style={searchOK ? styles.searchBar : styles.searchBarFailed}>
      <View style={styles.searchBox}>
        <View style={styles.searchIconWrap}>
          <Image
            style={styles.searchIcon}
            source={require('../../assets/search-icon.png')}
          />
        </View>
        <View style={styles.searchInputWrap}>
          <TextInput
            style={styles.searchInput}
            value={pattern}
            onChangeText={pattern => setPattern(pattern)}
            placeholder=" co-workers (by name or ID)"
          />
          <View style={styles.searchBoxHint}>
            {/* <Text>
              {(state == 'loading' && 'Loading...') ||
                (!searchOK && 'No match')}
            </Text> */}
            <Image
              style={styles.searchIcon}
              source={
                (state == 'loading' && require('../../assets/icons/spinner.png')) ||
                (!searchOK && require('../../assets/icons/error.png'))
              }
            />
          </View>
        </View>
        <View style={styles.clearSearchButtonZone}>
          <TouchableOpacity
            style={styles.clearSearchButton}
            onPress={() => setPattern('')}>
            <Text style={styles.clearSearchButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    height: 50,
    margin: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 20,
    borderColor: 'grey',
    borderWidth: 2,
  },

  searchBarFailed: {
    height: 50,
    margin: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 20,
    borderColor: 'darkorange',
    borderWidth: 2,
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  searchIconWrap: {
    flex: 0.7,
    alignContent: 'center',
    alignItems: 'center',
  },

  searchIcon: {
    width: 20,
    height: 20,
  },

  searchInputWrap: {
    flex: 6,
    flexDirection: 'row',
  },

  searchInput: {
    flex: 10,
  },

  searchBoxHint: {
    flex: 3.5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  clearSearchButtonZone: {
    flex: 0.5,
  },

  clearSearchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    textAlignVertical: 'auto',
  },

  clearSearchButtonText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 19,
  },
});
