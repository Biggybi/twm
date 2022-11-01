import React, {useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

import IEmployee, {EmployeeInfos} from './EmployeeInfos';
import SearchBox from '../SearchBox/SearchBox';
import { Card } from '../Card/Cards';

export default function Employees() {
  const [employees, setEmployees] = useState<IEmployee[]>([]);

  return (
    <View style={styles.list}>
      <FlatList
        data={employees}
        ListHeaderComponent={
          <SearchBox
            dataType={'employee'}
            setData={setEmployees}
            placeholder={'employees (by name or -ID)'}
          />
        }
        stickyHeaderIndices={[0]}
        renderItem={employeedata => (
          <Card cardInfos={<EmployeeInfos employee={employeedata.item} />} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 10,
  },
});
