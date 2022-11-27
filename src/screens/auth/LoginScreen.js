import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import facebookLogo from '../../../assets/images/facebook-logo.png';
import {
  validatePass,
  validatePhonenumber,
} from '../../core/common/commonFunction';
import { color } from '../../core/common/styleVariables';
import { setAuthToken } from '../../helpers';
import { authResource } from '../../resources';
import authService from '../../services/auth.service';
import { setUserInfo } from '../../store/reducers/auth.reducer';

const LoginScreen = ({ navigation }) => {
  // Số điện thoại
  const [phonenumber, setPhonenumber] = useState('');
  // Mật khẩu
  const [password, setPassword] = useState('');
  // Ẩn mật khẩu
  const [secure, setSecure] = useState(true);
  // Error
  const [error, setError] = useState({
    phonenumber: false,
    password: false,
  });
  // Error messgase
  const [errorMsg, setErrorMsg] = useState('');

  const dispatch = useDispatch();

  /**
   * Xử lý đăng nhập
   * Created by: phamvanlinhxyz - 15.11.2022
   */
  const handleLogin = async () => {
    if (validatePhonenumber(phonenumber)) {
      setError({ ...error, phonenumber: true });
      setErrorMsg(validatePhonenumber(phonenumber));
    } else if (validatePass(password)) {
      setError({ ...error, password: true });
      setErrorMsg(validatePass(password));
    } else {
      const res = await authService.login({ phonenumber, password });
      if (!res.success) {
        setErrorMsg(res.message);
      } else {
        setAuthToken(res.data.token);
        dispatch(setUserInfo(res.data));
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image style={styles.loginLogo} source={facebookLogo} />
      {/* Thông tin đăng nhập */}
      <TextInput
        style={styles.loginInput}
        onChangeText={(newVal) => {
          setError({
            phonenumber: false,
            password: false,
          });
          setErrorMsg('');
          setPhonenumber(newVal);
        }}
        value={phonenumber}
        mode='outlined'
        placeholder={authResource.phonenumber}
        outlineColor={color.inputOutline}
        activeOutlineColor={color.inputOutlineActive}
        placeholderTextColor={color.inputPlaceholder}
        error={error.phonenumber}
      />
      <TextInput
        style={styles.loginInput}
        onChangeText={(newVal) => {
          setError({
            phonenumber: false,
            password: false,
          });
          setErrorMsg('');
          setPassword(newVal);
        }}
        value={password}
        mode='outlined'
        placeholder={authResource.password}
        outlineColor={color.inputOutline}
        activeOutlineColor={color.inputOutlineActive}
        placeholderTextColor={color.inputPlaceholder}
        secureTextEntry={secure}
        error={error.password}
        right={
          password ? (
            <TextInput.Icon icon='eye' onPress={() => setSecure(!secure)} />
          ) : null
        }
      />
      {errorMsg ? (
        <Text
          style={[
            styles.errorText,
            { marginTop: 4, marginBottom: 0, textAlign: 'left' },
          ]}
        >
          {errorMsg}
        </Text>
      ) : null}
      {/* Button đăng nhập */}
      <Button
        style={styles.loginButton}
        labelStyle={styles.buttonLabel}
        textColor={color.whitePrim}
        onPress={handleLogin}
      >
        {authResource.login}
      </Button>
      {/* Quên mật khẩu */}
      <Text style={styles.forgotPassword}>{authResource.forgotPassword}</Text>
      {/* Hoặc */}
      <View style={styles.orWrap}>
        <View style={styles.orLeft} />
        <Text style={styles.orLabel}>{authResource.or}</Text>
        <View style={styles.orRight} />
      </View>
      {/* Tạo tài khoản mới */}
      <Button
        style={styles.createNewAcc}
        labelStyle={styles.createNewAccLabel}
        textColor={color.whitePrim}
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        {authResource.createNewAcc}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    fontSize: 16,
    color: color.errorColor,
    marginBottom: 12,
  },
  container: {
    display: 'flex',
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  loginLogo: {
    marginTop: 32,
    width: 160,
    height: 60,
  },
  loginInput: {
    width: '92%',
    marginBottom: 4,
    backgroundColor: color.inputBg,
  },
  loginButton: {
    borderRadius: 4,
    backgroundColor: color.bluePrim,
    marginTop: 8,
    width: '92%',
    height: 44,
    justifyContent: 'center',
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  forgotPassword: {
    color: color.blueSecond,
    marginTop: 12,
    fontWeight: '600',
    fontSize: 16,
  },
  orWrap: {
    display: 'flex',
    flexDirection: 'row',
    width: '92%',
    alignItems: 'center',
    marginVertical: 20,
  },
  orLeft: {
    backgroundColor: color.loginSeparator,
    height: 1,
    marginRight: 15,
    flex: 1,
  },
  orRight: {
    backgroundColor: color.loginSeparator,
    height: 1,
    marginLeft: 15,
    flex: 1,
  },
  orLabel: {
    color: color.loginTextGrey,
    position: 'relative',
  },
  createNewAcc: {
    backgroundColor: color.greenPrim,
    fontWeight: '600',
    height: 40,
    justifyContent: 'center',
    borderRadius: 4,
    paddingHorizontal: 16,
  },
  createNewAccLabel: {
    fontWeight: '600',
    fontSize: 14,
  },
});

export default LoginScreen;
