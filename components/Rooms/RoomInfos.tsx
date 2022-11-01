import React from 'react';

import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../tools/colors';

export default interface IRoom {
  key: number;
  seats: number;
  free_seats: string;
  taken_seats: string;
}

export default function RoomInfos(props: {room: IRoom}) {
  const room = props.room;
  return (
    <View style={styles.CardLeft}>
      <View>
        <Text style={styles.CardTitleText}>
          {room.seats} {room.free_seats} - {room.taken_seats}
        </Text>
      </View>
      <View style={styles.CardLeftBody}>
        <View style={styles.CardIconBox}>
          <MaterialCommunityIcons
            name="account-circle"
            size={80}
            color={Colors.foreground.dark}></MaterialCommunityIcons>
        </View>
        <View style={styles.CardInfos}>
          <Text style={styles.CardIDText}>Roles: {room.taken_seats}</Text>
          <Text style={styles.CardIDText}>key: {room.key}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  CardLeftBody: {
    flex: 3,
    flexDirection: 'row',
  },

  CardLeft: {
    paddingTop: 5,
    paddingLeft: 5,
    backgroundColor: Colors.background.dark,
    borderRadius: 10,
    flex: 9,
  },

  CardTitleText: {
    paddingLeft: 5,
    color: Colors.foreground.dark,
  },

  CardIconBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  CardIcon: {
    justifyContent: 'center',
    height: 70,
    width: 70,
    alignItems: 'center',
  },

  CardInfos: {
    flex: 3,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 30,
  },

  CardActions: {
    borderRadius: 20,
    flex: 1,
  },

  CardAction: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '25%',
    borderRadius: 20,
  },

  CardIDText: {
    color: Colors.foreground.dark,
  },

  CardYear: {
    color: Colors.foreground.dark,
  },
});
