import React, { useState } from 'react';
import { Button, Text, TextInput } from 'react-native-paper';
import {
  validatePass,
  validatePhonenumber,
} from '../../core/common/commonFunction';
import { color } from '../../core/common/styleVariables';
import { authResource } from '../../resources';

const LoginInfo = (props) => {
  const { styles, next, prev, user, resError, clearResErr } = props;

  // Số điện thoại
  const [phonenumber, setPhonenumber] = useState(user.phonenumber);
  // Mật khẩu
  const [password, setPassword] = useState(user.password);
  // Ẩn mật khẩu
  const [secure, setSecure] = useState(true);
  const [error, setError] = useState({
    phonenumber: null,
    password: null,
  });

  return (
    <>
      <Text variant='titleLarge' style={styles.textHeader}>
        {authResource.loginInfoTitle}
      </Text>
      <TextInput
        style={styles.loginInput}
        onChangeText={(newVal) => {
          setPhonenumber(newVal);
          if (resError) {
            clearResErr();
          }
          setError({
            ...error,
            phonenumber: validatePhonenumber(newVal),
          });
        }}
        value={phonenumber}
        mode='outlined'
        placeholder={authResource.phonenumber}
        outlineColor={color.transparent}
        activeOutlineColor={color.transparent}
        placeholderTextColor={color.input.placeholder}
        error={error.phonenumber}
      />
      <TextInput
        style={styles.loginInput}
        onChangeText={(newVal) => {
          setPassword(newVal);
          if (resError) {
            clearResErr();
          }
          setError({ ...error, password: validatePass(newVal) });
        }}
        value={password}
        mode='outlined'
        placeholder={authResource.password}
        outlineColor={color.transparent}
        activeOutlineColor={color.transparent}
        placeholderTextColor={color.input.placeholder}
        secureTextEntry={secure}
        error={error.password}
        right={
          password ? (
            <TextInput.Icon icon='eye' onPress={() => setSecure(!secure)} />
          ) : null
        }
      />
      {resError && (
        <Text
          style={[
            styles.errorText,
            { marginTop: 4, marginBottom: 0, textAlign: 'left' },
          ]}
        >
          {resError}
        </Text>
      )}
      {(error.password || error.phonenumber) && (
        <Text style={[styles.errorText, { marginTop: 4, marginBottom: 0 }]}>
          {error.phonenumber ? error.phonenumber : error.password}
        </Text>
      )}
      {phonenumber && password && (
        <Button
          style={[styles.loginButton, { marginTop: 12, marginBottom: 0 }]}
          labelStyle={styles.buttonLabel}
          textColor={color.text.white}
          onPress={() => next({ phonenumber, password })}
        >
          {authResource.register}
        </Button>
      )}
      <Button
        style={[styles.returnButton, { marginTop: 12, marginBottom: 0 }]}
        labelStyle={styles.buttonLabel}
        textColor={color.text.second}
        onPress={() => prev({ phonenumber, password })}
      >
        {authResource.return}
      </Button>
    </>
  );
};

export default LoginInfo;
