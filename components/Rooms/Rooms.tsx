import React, {useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

import {Card} from '../Card/Cards';
import SearchBox from '../SearchBox/SearchBox';
import RoomInfos, { IRoom } from './RoomInfos';

export default function Rooms() {
  const [rooms, setRooms] = useState<IRoom[]>([]);

  return (
    <View style={styles.list}>
      <FlatList
        data={rooms}
        ListHeaderComponent={
          <SearchBox
            dataType={'room'}
            setData={setRooms}
            placeholder={'Rooms (name or -ID)'}
          />
        }
        stickyHeaderIndices={[0]}
        renderItem={roomdata => (
          <Card
            cardInfos={<RoomInfos room={roomdata.item} />}
            showActionButtons={true}
          />
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
