import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {useUserIDUpdate} from '../../contexts/User/userContext';
import {Colors} from '../../tools/colors';
import {Users} from '../../tools/users';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toggleUserID = useUserIDUpdate() as unknown as (s: string) => string;
  const tryLogin = (): boolean => {
    let ret = Users.get(email)?.password == password;
    console.log('tryLogin:', Users.get(email)?.password, email, password, ret);
    return ret;
  };
  const refInputPassword = useRef<TextInput>(null);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/systema-logo.png')}
      />
      <View>
        <Text style={styles.subtitle}>Tele Work</Text>
        <Text style={styles.subtitle}>Management</Text>
      </View>
      <View style={styles.infos}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholderTextColor={Colors.gray.light}
            autoFocus={true}
            keyboardType="email-address"
            returnKeyType="next"
            placeholder="  Email"
            onChangeText={text => setEmail(text)}
            onSubmitEditing={() => refInputPassword.current?.focus()}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholderTextColor={Colors.gray.light}
            secureTextEntry
            placeholder="  Password"
            onChangeText={text => setPassword(text)}
            ref={refInputPassword}
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotPassText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => (tryLogin() ? toggleUserID(email) : null)}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.adminBtn}
          onPress={() => toggleUserID('admin')}>
          <Text style={styles.loginText}>Admin</Text>
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.dark,
    alignItems: 'center',
  },
  logo: {
    width: Dimensions.get('window').width,
    height: 170,
    resizeMode: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: Colors.foreground.light,
  },
  subtitle: {
    alignContent: 'stretch',
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.gray.light,
  },
  infos: {
    marginTop: 20,
    width: '80%',
  },
  inputView: {
    backgroundColor: Colors.gray.dark,
    borderRadius: 20,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  inputText: {
    color: Colors.background.dark,
  },
  forgotPass: {
    color: Colors.background.dark,
    backgroundColor: Colors.red.dark,
    height: 20,
  },
  forgotPassText: {
    // marginTop: -10,
    fontSize: 14,
    color: Colors.gray.light,
  },
  loginBtn: {
    height: 50,
    backgroundColor: Colors.blue.light,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  adminBtn: {
    height: 50,
    backgroundColor: Colors.red.light,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  loginText: {
    color: Colors.background.dark,
  },
});
