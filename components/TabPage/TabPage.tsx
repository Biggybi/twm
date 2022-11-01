import React, {useState} from 'react';
import {StyleSheet, View, FlatList, ListRenderItem} from 'react-native';

// import IEmployee, {EmployeeInfos} from './EmployeeInfos';
import SearchBox from '../SearchBox/SearchBox';

interface Props<T> {
  renderItem: ListRenderItem<T> | null | undefined;
  dataType: string;
  placeholderText: string;
  searchBoxEnable?: boolean;
}

export default function TabPage<T>({
  renderItem,
  dataType,
  placeholderText,
  searchBoxEnable = true,
}: Props<T>) {
  const [elements, setElements] = useState<T[]>([]);
  console.log('-> render tabpage');

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
