import React from 'react';

import {StyleSheet, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../tools/colors';

type IProps = {
  cardInfos: JSX.Element;
  showActionButtons?: boolean;
};

export function Card({cardInfos, showActionButtons = true}: IProps) {
  return (
    <View style={[styles.Card]}>
      <View
        style={[
          styles.CardLeft,
          showActionButtons ? {paddingRight: 10} : null,
        ]}>
        {cardInfos}
      </View>
      {showActionButtons ? (
        <View style={styles.CardActions}>
          <TouchableOpacity style={styles.CardAction}>
            <MaterialCommunityIcons
              name="crop-free"
              size={25}
              color={Colors.blue.light}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.CardAction}>
            <MaterialCommunityIcons
              name="star-outline"
              size={25}
              color={Colors.yellow.light}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.CardAction}>
            <MaterialCommunityIcons
              // name="radiobox-marked"
              name="radiobox-blank"
              size={25}
              color={Colors.green.light}
            />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  Card: {
    height: 180,
    padding: 10,
    paddingRight: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 20,
    backgroundColor: Colors.foreground.dark,
    flexDirection: 'row',
  },

  CardLeft: {
    paddingTop: 5,
    paddingLeft: 5,
    backgroundColor: Colors.background.dark,
    borderRadius: 10,
    flex: 9,
  },

  CardIconBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});
