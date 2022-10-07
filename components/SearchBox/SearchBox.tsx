
import React, {useEffect, useState, Component} from 'react';

import IEmployee, {Employee} from '../EmployeeCard/EmployeeCard';
// import SearchIcon from './search.svg';
import {ReactDOM} from 'react';

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

class Urls {
  base: string;
  employee: string;
  employee_name: string;
  employee_id: string;
  constructor() {
    this.base = 'http://192.168.0.21:8090/twm/web/';
    this.employee = 'http://192.168.0.21:8090/twm/web/employee/';
    this.employee_name = 'http://192.168.0.21:8090/twm/web/employee/name/';
    this.employee_id = 'http://192.168.0.21:8090/twm/web/employee/id/';
  }
  get_url(pattern: string) {
    return (Number(pattern) ? this.employee_id : this.employee_name) + pattern;
  }
}

export default function SearchBox() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  // const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [pageTitle, setPageTitle] = useState(false);
  const [searchOK, setSearchOK] = useState(true);
  const [started, setStarted] = useState(false);

  // search once when component loads
  useEffect(() => {
    if (started) return;
    setStarted(true);
    searchEmployee('');
  });

  async function searchEmployee(pattern: string) {
    if (pattern == '') pattern = '*';
    const url = new Urls().get_url(pattern);
    try {
      const res = await fetch(url, {
        method: 'GET',
      });
      const data = await res.json();
      setSearchOK(data.ttEmployee.length != 0);
      if (!res.ok) {
        setEmployees([]);
        return {error: data.code};
      }
      return setEmployees(data.ttEmployee);
    } catch (err) {
      setSearchOK(false);
      return {error: err};
    }
  }

  // if (searchTerm == '') searchEmployee('*');

  return (
    // "app"
    <View style={styles.page}>
      {/* title bar */}
      {pageTitle && <Text style={styles.siteTitle}>Trxming</Text>}

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
              searchEmployee(searchTerm);
            }}
            // onResponderStart={searchTerm => {
            //   // setSearchTerm('*');
            //   searchEmployee('*');
            // }}
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
              searchEmployee('');
            }}>
            <Text style={styles.clearSearchButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <Image
        // alt="search"
        // onClick={() => searchEmployee(searchTerm)}
      /> */}

      <View style={styles.employeesList}>
        {searchOK && (
          <FlatList
            keyExtractor={employee => employee.id}
            data={employees}
            renderItem={employee => {
              return <Employee {...employee.item} />;
            }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    // flexDirection: 'column',
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

  employeesList: {
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
