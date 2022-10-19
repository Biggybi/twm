import React, {useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

import IEmployee, {EmployeeCard} from './EmployeeCard';
import SearchBox from '../SearchBox/SearchBox';

export default function Employees() {
  const [employees, setEmployees] = useState<IEmployee[]>([]);

  return (
    <View style={styles.wrapper}>
      <View>
        <SearchBox dataType={'employee'} setData={setEmployees}></SearchBox>
      </View>
      <View style={styles.list}>
        <FlatList
          data={employees}
          renderItem={employeedata => (
            <EmployeeCard employee={employeedata.item} />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  list: {
    flex: 1,
  },
});
