
import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { apiSearch } from '../../tools/apiGet';

export default function SearchBox(props: {
  data: string;
  setData: (data: any) => any;
}) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [pageTitle, setPageTitle] = useState(false);
  const [searchOK, setSearchOK] = useState(true);
  const [starting, setStarting] = useState(true);

  // search once when component loads
  useEffect(() => {
    if (!starting) return;
    setStarting(false);
    apiSearch('data', '', props.setData, setSearchOK);
  }, [searchOK]);

  return (
    // "app"
    <View style={styles.page}>

      {/* search bar */}
      <View style={searchOK ? styles.searchBar : styles.searchBarFailed}>
        <View style={styles.searchBox}>
          <Image
            style={styles.searchIcon}
            source={require('../../assets/search-icon.png')}
          />
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={searchTerm => {
              setSearchTerm(searchTerm);
              apiSearch(props.data, searchTerm, props.setData, setSearchOK);
            }}
            placeholder=" co-workers (filter by name or number)"
          />
          {!searchOK && (
            <View style={styles.searchBoxNotFound}>
              <Text>No match</Text>
            </View>
          )}
        </View>
        <View style={styles.clearSearchButtonZone}>
          <TouchableOpacity
            style={styles.clearSearchButton}
            onPress={() => {
              setSearchTerm('');
              apiSearch('data', '', props.setData, setSearchOK);
            }}>
            <Text style={styles.clearSearchButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'darkgrey',
    borderRadius: 20,
    // padding: 10,
    // height: '100%',
  },

  pageBackGround: {
    flex: 1,
    // flexDirection: 'column',
    backgroundColor: 'black',
    // borderRadius: 20,
    // padding: 10,
  },

  siteTitle: {
    // height: 0,
    // hidden: 1,
    // flex: 1,
    backgroundColor: '#555555',
  },

  datasList: {
    flex: 1,
    borderRadius: 20,
    // allow scrollbar offset
    paddingLeft: 30,
    paddingRight: 10,
  },

  searchBar: {
    // flex: 1,
    // flexDirection: 'row',
    height: 50,
    margin: 10,
    marginBottom: 0,
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 20,
    // backgroundColor: 'grey',
    borderColor: 'grey',
    // borderColor: 'teal',
    borderWidth: 2,
    // flexGrow: 1,
  },

  searchBarFailed: {
    // flex: 1,
    height: 50,
    margin: 10,
    marginBottom: 0,
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 20,
    // backgroundColor: 'orange',
    borderColor: 'darkorange',
    borderWidth: 2,
    // flexGrow: 1,
  },
  
  searchBox: {
    // flex: 7,
    // borderColor: '#c3c3c3',
    // borderWidth: 2,
    // borderRadius: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginRight: 10,
    paddingLeft: 10,
    // elevation: 8,
    // backgroundColor: 'pink',
  },

  searchIcon: {
    width: 20,
    height: 20,
    // marginRight: 10,
  },

  searchInput: {
    // backgroundColor: 'pink',
    // width: 20,
    width: '90%',
    // height: 20,
    paddingLeft: 10,
  },

  searchBoxNotFound: {
    // flex: 4,
    // flexGrow: 4,
    // backgroundColor : 'red',
    // position: 'absolute',
    right: 80,
    // borderColor: '#c3c3c3',
    // borderWidth: 2,
    // borderRadius: 20,
    // marginRight: 0,
    // paddingLeft: 0,
  },

  clearSearchButtonZone: {
    position: 'absolute',
    right: 0,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
    // flexGrow: 1,
    // backgroundColor: 'red',
    height: '100%',
    borderRadius: 20,
    fontSize: 19,
  },

  clearSearchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    textAlignVertical: 'auto',
    // fontStyle: 'bold',
    // backgroundColor: 'red',
    // backgroundColor: '#555555',
    // borderStyle: "solid",
    // borderWidth: 2,
    // borderColor: '#c3c3c3',
    // borderRadius: 10,
  },

  clearSearchButtonText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 19,
    // fontStyle: 'bold',
    // borderWidth: 2,
    // borderColor: '#c3c3c3',
    // borderRadius: 10,
  },
  
  
});
