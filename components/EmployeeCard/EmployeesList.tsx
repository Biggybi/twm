
import React, {useState} from 'react';

import IEmployee, {Employee} from '../EmployeeCard/EmployeeCard';
// import SearchIcon from './search.svg';

import {
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
import SearchBox from '../SearchBox/SearchBox';

export default function EmployeeList() {
  const [employees, setEmployees] = useState<IEmployee[]>([]);

  return (
    <View style={styles.wrapper}>
      <SearchBox data={'employee'} setData={setEmployees}></SearchBox>
      <View style={styles.employeesList}>
        <FlatList
          data={employees}
          renderItem={employee => {
            return <Employee {...employee.item} />;
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'darkgrey',
    borderRadius: 20,
  },

  employeesList: {
    flex: 1,
    borderRadius: 20,
    // allow scrollbar offset
    paddingLeft: 30,
    paddingRight: 10,
  },

});

