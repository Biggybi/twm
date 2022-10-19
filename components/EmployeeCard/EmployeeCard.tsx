import React from 'react';

import {StyleSheet, Text, View, Image} from 'react-native';

export default interface IEmployee {
  key: number;
  firstname: string;
  lastname: string;
  roles?: string;
  teams?: string;
}

export function EmployeeCard(props: {employee: IEmployee}) {
  const employee = props.employee
  return (
    <View style={styles.Card}>
      {/* <View>
        <Image
          source={
            employee.Poster !== 'N/A'
              ? employee.Poster
              : 'https://via.placeholder.com/400'
          }
          alt={employee.title}
        />
      </View> */}
      <View style={styles.CardLeft}>
        <View style={styles.CardTitle}>
          <Text>
            {employee.firstname} {employee.lastname} {employee.roles}
          </Text>
        </View>

        <View style={styles.CardLeftBody}>
          <View style={styles.CardIconBox}>
            <Image
              style={styles.CardIcon}
              source={require('../../assets/user-icon_default.png')}
            />
          </View>
          <View style={styles.CardInfos}>
            <Text style={styles.CardInfo}>{employee.roles}</Text>
            <Text style={styles.CardInfo}>{employee.teams}</Text>
            <Text style={styles.CardID}>key = {employee.key}</Text>
          </View>
        </View>
      </View>
      <View style={styles.CardActionsList}>
        <View style={styles.CardAction}>
          <Text>Edit</Text>
        </View>
        <View style={styles.CardAction}>
          <Text>Focus</Text>
        </View>
        <View style={styles.CardAction}>
          <Text>Select</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Card: {
    height: 140,
    padding: 10,
    margin: 10,
    borderRadius: 20,
    backgroundColor: '#CED0CE',
    flexDirection: 'row',
  },

  CardLeftBody: {
    backgroundColor: '#CED0CE',
    flex: 3,
    flexDirection: 'row',
  },

  CardLeft: {
    backgroundColor: '#CED0CE',
    flex: 4,
  },


  CardTitle: {
  },

  CardIconBox: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 6,
    alignItems: 'center',
  },

  CardIcon: {
    justifyContent: 'center',
    marginTop: 6,
    height: 70,
    width: 70,
    alignItems: 'center',
  },

  CardInfos: {
    flex: 2,
    justifyContent: 'center',
  },

  CardActionsList: {
    left: 10,
    height: '100%',
    alignSelf: 'flex-end',
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

  CardInfo: {
    color: 'black',
  },

  CardID: {
    color: 'black',
  },

  CardYear: {
    color: 'black',
  },
});
