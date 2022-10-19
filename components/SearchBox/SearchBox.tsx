import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import apiSearch from '../../tools/apiGet';
import useFetch from '../../hooks/useFetch';

// // search once when component loads
// useEffect(() => {
//   // console.log('SearchBox useEffect before if: starting = ', starting);
//   // if (!starting) return;
//   // setStarting(false);
//   // setSearchTerm(pattern);
//   // setUnsubscribed(false);
//   apiSearch(
//     props.data,
//     pattern,
//     props.setData,
//     setSearchOK,
//     // unsubscribed,
//     // setUnsubscribed,
//   );
//   // return () => {
//   //   setUnsubscribed(true);
//   // };
// }, [pattern])

// var starting = true;
export default function SearchBox(props: {
  dataType: string;
  // setData: (dataType: any) => any;
  setData: Function;
}) {
  const [pattern, setSearchTerm] = useState<string>('');
  // const [searchOK, setSearchOK] = useState(true);
  console.log('datatype =', props.dataType, 'pattern = ', pattern);
  // const [unsubscribed, setUnsubscribed] = useState(false);
  // const abortController = new AbortController;
  // var abort = abortController.abort();
  // console.log("abort = ", abort);
  // const controller = new AbortController;

  // const url = `http://jsonplaceholder.typicode.com/posts`
  interface ItemContent {
    firstname: string;
    lastname: string;
    key: string;
  }
  interface Item {
    Data: [ItemContent];
  }

  const {data, error, state} = useFetch<Item>(props.dataType, pattern);
  console.log('employee data =', data);
  console.log('state =', state);
  const searchOK: boolean = Boolean(
    (state != 'error' && data?.Data.length) || state == 'loading',
  );
  useEffect(() => {
    if (state != 'loading') props.setData(data?.Data);
  }), [data, error, state];
  console.log('error =', error);
  // console.log("Data[] =", data.Data)
  console.log('searchOK', searchOK);

  // if (error) return <Text>There is an error.</Text>;
  // if (!data) return <Text>Loading...</Text>;

  // props.setData
  // if (error || !data) {
  //   setSearchOK(false);
  //   return;
  // }
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
            onChangeText={pattern => setSearchTerm(pattern)}
            placeholder=" co-workers (by name or ID)"
          />
            <View style={styles.searchBoxHint}>
              <Text>{!searchOK && ('No match')}</Text>
            </View>
        </View>
        <View style={styles.clearSearchButtonZone}>
          <TouchableOpacity
            style={styles.clearSearchButton}
            onPress={() => setSearchTerm('')}>
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
    // backgroundColor: 'yellow'
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
    // backgroundColor: 'red',
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
