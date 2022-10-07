import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Image,
  TouchableNativeFeedback,
} from 'react-native';

export default interface IEmployee {
  id?: number;
  firstname?: string;
  lastname?: string;
  roles?: string;
  teams?: string;
}

export function Employee(employee: IEmployee) {
  // if (employee.id == 0) return null;
  if (!{...employee}) return null;
  console.log({...employee});
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
            {employee.firstname} {employee.lastname}
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
            <Text style={styles.CardID}>id = {employee.id}</Text>
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
    // padding: 30,
    height: 120,
    padding: 10,
    marginVertical: 10,
    // scrollbar offset compensation
    marginRight: 20,
    borderRadius: 20,
    // borderColor: 'teal',
    // borderWidth: 4,
    backgroundColor: '#CED0CE',
    // flex: 1,
    flexDirection: 'row',
  },

  CardLeftBody: {
    // padding: 30,
    // height: 120,
    // padding: 10,
    // marginVertical: 10,
    // scrollbar offset compensation
    // marginRight: 20,
    // borderRadius: 20,
    // borderColor: 'teal',
    // borderWidth: 4,
    backgroundColor: '#CED0CE',
    // backgroundColor: 'red',
    flex: 3,
    flexDirection: 'row',
  },

  CardLeft: {
    backgroundColor: '#CED0CE',
    flex: 4,
    // flexDirection: 'row',
  },

  // EmployeeNotFound: {
  //   // padding: 30,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   height: 60,
  //   marginVertical: 10,
  //   borderRadius: 20,
  //   backgroundColor: '#CED0CE',
  //   // flex: 1,
  //   // flexGrow: 1,
  //   borderColor: 'darkorange',
  //   borderWidth: 4,
  //   // color: 'red',
  // },

  CardTitle: {
    // top: 15,
    // height: 70,
    // width: 70,
    marginRight: 10,
  },

  CardIconBox: {
    flex: 1,
    // backgroundColor: 'red',
    justifyContent: 'center',
    marginTop: 6,
    // height: 70,
    // width: 70,
    // flex: 1,
    marginRight: 10,
    // width: '15%',
    alignItems: 'center',
  },

  CardIcon: {
    // backgroundColor: 'red',
    justifyContent: 'center',
    marginTop: 6,
    height: 70,
    width: 70,
    // flex: 1,
    marginRight: 10,
    // width: '15%',
    alignItems: 'center',
  },

  CardInfos: {
    // backgroundColor: 'green',
    // width: 170,
    flex: 2,
    justifyContent: 'center',
  },

  CardActionsList: {
    left: 10,
    height: '100%',
    alignSelf: 'flex-end',
    // width: 50,
    // backgroundColor: 'blue',
    borderRadius: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
    flex: 1,
  },

  CardAction: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '25%',
    borderRadius: 20,
    margin: 5,
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
