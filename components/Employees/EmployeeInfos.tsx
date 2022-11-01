import React from 'react';

import {StyleSheet, Text, View} from 'react-native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../tools/colors';

export default interface IEmployee {
  key: number;
  firstname: string;
  lastname: string;
  roles: string;
  teams: string;
}

export function EmployeeInfos(props: {employee: IEmployee}) {
  const employee = props.employee;
  return (
    <View style={styles.CardLeft}>
      <View>
        <Text style={styles.CardTitleText}>
          {employee.firstname} {employee.lastname} - {employee.roles}
        </Text>
      </View>
      <View style={styles.CardLeftBody}>
        <View style={styles.CardIconBox}>
          <MaterialCommunityIcons
            // name="account-circle"
            name="linux"
            size={80}
            color={Colors.foreground.dark}
          />
        </View>
        <View style={styles.CardInfos}>
          <Text style={styles.CardIDText}>Roles: {employee.roles}</Text>
          <Text style={styles.CardInfoText}>Teams: {employee.teams}</Text>
          <Text style={styles.CardIDText}>key: {employee.key}</Text>
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
    // backgroundColor: Colors.foreground.light,
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

  CardInfoText: {
    color: Colors.foreground.dark,
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
