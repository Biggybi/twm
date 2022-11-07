import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useUserIDUpdate} from '../../contexts/User/userContext';
import {Colors} from '../../tools/colors';
import {Users} from '../../tools/users';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // trying to change password?
  const [resetPasswordMode, setResetMode] = useState(false);
  // const toggleUserID = useUserIDUpdate() as unknown as (s: string) => string;
  const [loginFail, setLoginFail] = useState(false);
  const toggleUser = useUserIDUpdate();

  const tryLogin = (): boolean => {
    if (Users.get(email)?.password != password) {
      setLoginFail(true);
      return false;
    }
    setLoginFail(false);
    toggleUser(Users.get(email)!.id);
    return true;
  };

  const tryResetPassword = (): boolean => {
    console.log('to implement');
    return true;
  };

  const handleChangeText = (text: string, type: string): void => {
    if (type == 'password') setPassword(text);
    if (type == 'email') setEmail(text);
    setLoginFail(false);
  };

  const refPasswordInput = useRef<TextInput>(null);
  return (
    <View style={styles.wrapper}>
      {/* title */}
      <Image
        style={styles.logo}
        source={require('../../assets/systema-logo.png')}
      />
      <View>
        <Text style={styles.title}>TeleWork Management</Text>
      </View>
      {/* mainSection: inputs + buttons */}
      <View style={styles.mainSection}>
        {/* inputs */}
        <View style={styles.inputsSection}>
          {/* login */}
          <View
            style={
              !loginFail
                ? styles.inputBtn
                : {...styles.inputBtn, ...styles.inputBtnFail}
            }>
            <TextInput
              style={styles.inputText}
              selectionColor={Colors.red.light}
              placeholder={'  Email'}
              placeholderTextColor={Colors.gray.light}
              autoFocus={true}
              keyboardType="email-address"
              returnKeyType="next"
              onChangeText={text => handleChangeText(text, 'email')}
              onSubmitEditing={() => refPasswordInput.current?.focus()}
            />
          </View>
          {/* password */}
          {!resetPasswordMode ? (
            <View
              style={
                !loginFail
                  ? styles.inputBtn
                  : {...styles.inputBtn, ...styles.inputBtnFail}
              }>
              <TextInput
                style={styles.inputText}
                selectionColor={Colors.red.light}
                placeholder={'  Password'}
                placeholderTextColor={Colors.gray.light}
                secureTextEntry
                onChangeText={text => handleChangeText(text, 'password')}
                onSubmitEditing={() => tryLogin()}
                ref={refPasswordInput}
              />
            </View>
          ) : (
            //* password (hidden)
            <View style={styles.inputViewHidden}></View>
          )}
        </View>
        {/* buttonsSection */}
        <View style={styles.buttonsSection}>
          {/* Submit button */}
          {!resetPasswordMode ? (
            // normal: login / signup
            <>
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => tryLogin()}>
                <Text style={styles.btnText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{...styles.loginBtn, ...styles.loginBtnReset}}>
                <Text style={styles.btnText}>Signup</Text>
              </TouchableOpacity>
            </>
          ) : (
            // reset mode: login only
            <TouchableOpacity
              style={{
                ...styles.loginBtn,
                backgroundColor: Colors.red.dark,
              }}
              onPress={() => tryResetPassword()}>
              <Text style={styles.btnText}>Send Email</Text>
            </TouchableOpacity>
          )}
          {/* Reset password toggler */}
          {!resetPasswordMode ? (
            <TouchableOpacity
              style={styles.resetPass}
              onPress={() => setResetMode(true)}>
              <Text style={styles.resetPassText}>Reset Password</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.resetPass}
              onPress={() => setResetMode(false)}>
              <Text style={styles.resetPassText}>Login</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          // for testing purposes! don't put in prod!
          style={styles.adminBtn}
          onPress={() => toggleUser('test_user')}>
          <Text style={styles.btnText}>test_user direct login</Text>
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.background.dark,
    alignItems: 'center',
  },
  logo: {
    marginTop: 10,
    height: 180,
    resizeMode: 'contain',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.gray.light,
  },
  mainSection: {
    marginTop: 10,
    width: '80%',
  },
  inputsSection: {
    height: 120,
    marginVertical: 10,
  },
  buttonsSection: {
    height: 120,
    marginVertical: 10,
  },
  inputBtn: {
    backgroundColor: Colors.gray.dark,
    borderRadius: 20,
    height: 50,
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  inputBtnFail: {
    backgroundColor: Colors.yellow.light,
  },
  inputText: {
    fontSize: 16,
    color: Colors.foreground.dark,
  },
  inputViewHidden: {
    height: 50,
    marginVertical: 5,
  },
  loginBtn: {
    height: 50,
    backgroundColor: Colors.blue.light,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  loginBtnReset: {
    backgroundColor: Colors.magenta.light,
  },
  adminBtn: {
    bottom: 0,
    height: 50,
    backgroundColor: Colors.red.light,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  btnText: {
    fontSize: 16,
    color: Colors.background.dark,
  },
  resetPass: {
    position: 'absolute',
    bottom: -40,
    alignItems: 'center',
    paddingVertical: 10,
  },
  resetPassText: {
    fontSize: 14,
    color: Colors.gray.light,
  },
});
