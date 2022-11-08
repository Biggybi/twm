import React, {useState} from 'react';
import {StyleSheet, View, FlatList, ListRenderItem} from 'react-native';
import { Card } from '../Card/Cards';
import { EmployeeInfos } from '../Employees/EmployeeInfos';

// import IEmployee, {EmployeeInfos} from './EmployeeInfos';
import SearchBox from '../SearchBox/SearchBox';

interface Props<T> {
  // renderItem: ListRenderItem<T> | null | undefined;
  // renderItem: Function;
  renderItem: any;
  dataType: string;
  placeholderText: string;
  searchBoxEnable?: boolean;
}

export default function TabPage<T>({
  dataType,
  renderItem,
  placeholderText,
  searchBoxEnable = true,
}: Props<T>) {
  const [elements, setElements] = useState<T[]>([]);
  console.log('-> render tabpage');

  console.log('elements: ', elements)
  // console.log('renderitem', renderItem)
  return (
    <View style={styles.list}>
      <FlatList
        data={elements}
        ListHeaderComponent={
          searchBoxEnable ? (
            <SearchBox
              dataType={dataType}
              setData={setElements}
              placeholder={placeholderText}
            />
          ) : null
        }
        stickyHeaderIndices={[0]}
        // renderItem={(data: T) => (
        //   <Card cardInfos={<EmployeeInfos employee={data} />} />
        // )}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 10,
  },
});
