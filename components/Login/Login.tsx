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
  // trying to change password?
  const [resetMode, setResetMode] = useState(false);
  const toggleUserID = useUserIDUpdate() as unknown as (s: string) => string;
  const tryLogin = (): boolean => {
    let ret = Users.get(email)?.password == password;
    console.log('tryLogin:', Users.get(email)?.password, email, password, ret);
    return ret;
  };
  console.log(resetMode);
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
            // this works despite compiler warning!! (android only)
            cursorColor={Colors.green.dark}
            selectionColor={Colors.green.light}
            placeholder={'  Email'}
            placeholderTextColor={Colors.gray.light}
            autoFocus={true}
            keyboardType="email-address"
            returnKeyType="next"
            onChangeText={text => setEmail(text)}
            onSubmitEditing={() => refInputPassword.current?.focus()}
          />
        </View>
        {!resetMode ? (
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              // this works despite compiler warning!! (android only)
              cursorColor={Colors.green.dark}
              selectionColor={Colors.green.light}
              placeholder={'  Password'}
              placeholderTextColor={Colors.gray.light}
              secureTextEntry
              onChangeText={text => setPassword(text)}
              ref={refInputPassword}
            />
          </View>
        ) : (
          <View style={styles.inputViewHidden}></View>
        )}
        <TouchableOpacity onPress={() => setResetMode(!resetMode)}>
          <Text style={styles.resetPassText}>Reset password</Text>
        </TouchableOpacity>
        {!resetMode ? (
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => (tryLogin() ? toggleUserID(email) : null)}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.loginBtnReset}
            onPress={() => (tryLogin() ? toggleUserID(email) : null)}>
            <Text style={styles.loginText}>Reset Password</Text>
          </TouchableOpacity>
        )}
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
  inputViewHidden: {
    color: Colors.foreground.dark,
    borderRadius: 20,
    height: 50,
    marginBottom: 20,
    // justifyContent: 'center',
    paddingHorizontal: 20,
    color: Colors.foreground.light,
  },
  inputView: {
    backgroundColor: Colors.gray.dark,
    borderRadius: 20,
    height: 50,
    marginBottom: 20,
    // justifyContent: 'center',
    paddingHorizontal: 20,
  },
  inputText: {
    color: Colors.foreground.dark,
  },
  resetPass: {
    color: Colors.background.dark,
    backgroundColor: Colors.red.dark,
    height: 20,
  },
  resetPassText: {
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
  loginBtnReset: {
    height: 50,
    backgroundColor: Colors.yellow.light,
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
    marginTop: 80,
  },
  loginText: {
    color: Colors.background.dark,
  },
});
