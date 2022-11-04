import {StyleSheet, Text, View} from 'react-native';

import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useUserIDUpdate} from '../../contexts/User/userContext';
import {Colors} from '../../tools/colors';

export default function Settings() {
  const toggleUser = useUserIDUpdate() as unknown as (s: string) => string;
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Extra</Text>
        <TouchableOpacity style={styles.buttons} onPress={() => toggleUser('')}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    width: '80%',
  },
  title: {
    height: 100,
    fontWeight: 'bold',
    fontSize: 30,
    textAlignVertical: 'center',
    color: Colors.foreground.dark,
  },
  subtitle: {
    height: 40,
    fontWeight: 'bold',
    fontSize: 20,
    textAlignVertical: 'center',
    color: Colors.foreground.dark,
  },
  buttons: {
    height: 50,
    backgroundColor: Colors.red.light,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  section: {
    marginVertical: 20,
  },
});
