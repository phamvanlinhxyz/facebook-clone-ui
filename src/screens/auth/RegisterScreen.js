import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import {
  YourName,
  StartRegiter,
  Birthday,
  Gender,
  LoginInfo,
} from '../../components';
import { color } from '../../core/common/styleVariables';
import { setAuthToken } from '../../helpers';
import { authResource } from '../../resources';
import authService from '../../services/auth.service';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../store/reducers/auth.reducer';
import { connectSocket } from '../../core/common/commonFunction';

const RegisterScreen = ({ navigation }) => {
  const enumRegisterCpn = {
    start: 0,
    yourName: 1,
    birthday: 2,
    gender: 3,
    user: 4,
    register: 5,
  };

  /**
   * useState
   */
  const [component, setComponent] = useState(enumRegisterCpn.start);
  const [user, setUser] = useState({
    phonenumber: '',
    password: '',
    firstName: '',
    lastName: '',
    birthday: new Date('05/11/2001'),
    gender: null,
  });
  const [resErr, setResErr] = useState(null);
  const dispatch = useDispatch();

  /**
   * Xử lý đăng ký người dùng mới
   * @param {*} loginInfo
   */
  const registerUser = async (loginInfo) => {
    const newUser = { ...user, ...loginInfo };
    const res = await authService.register(newUser);
    if (!res.success) {
      setResErr(res.message);
    } else {
      setAuthToken(res.data.token);
      dispatch(setUserInfo(res.data));
      connectSocket(res.data.token);
    }
    setUser(newUser);
  };

  return (
    <View style={styles.container}>
      {/* Hiển thị */}
      <View style={styles.registerContent}>
        {component === enumRegisterCpn.start && (
          <StartRegiter
            styles={styles}
            start={() => {
              setComponent(enumRegisterCpn.yourName);
            }}
          />
        )}
        {component === enumRegisterCpn.yourName && (
          <YourName
            styles={styles}
            user={user}
            next={(newInfo) => {
              setUser({ ...user, ...newInfo });
              setComponent(enumRegisterCpn.birthday);
            }}
            prev={(newInfo) => {
              setUser({ ...user, ...newInfo });
              setComponent(enumRegisterCpn.start);
            }}
          />
        )}
        {component === enumRegisterCpn.birthday && (
          <Birthday
            styles={styles}
            user={user}
            next={(newInfo) => {
              setUser({ ...user, ...newInfo });
              setComponent(enumRegisterCpn.gender);
            }}
            prev={(newInfo) => {
              setUser({ ...user, ...newInfo });
              setComponent(enumRegisterCpn.yourName);
            }}
          />
        )}
        {component === enumRegisterCpn.gender && (
          <Gender
            styles={styles}
            user={user}
            next={(newInfo) => {
              setUser({ ...user, ...newInfo });
              setComponent(enumRegisterCpn.user);
            }}
            prev={(newInfo) => {
              setUser({ ...user, ...newInfo });
              setComponent(enumRegisterCpn.birthday);
            }}
          />
        )}
        {component === enumRegisterCpn.user && (
          <LoginInfo
            styles={styles}
            user={user}
            resError={resErr}
            next={(newInfo) => {
              registerUser(newInfo);
            }}
            prev={(newInfo) => {
              setUser({ ...user, ...newInfo });
              setComponent(enumRegisterCpn.gender);
            }}
            clearResErr={() => {
              setResErr(null);
            }}
          />
        )}
      </View>
      {/* Footer */}
      <View style={styles.registerFooter}>
        <Text
          style={styles.footerText}
          onPress={() => {
            setComponent(enumRegisterCpn.start);
            navigation.navigate('LoginScreen');
          }}
        >
          {authResource.hadAccount}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  registerContent: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '92%',
    marginVertical: 32,
  },
  registerFooter: {
    height: 48,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: color.other.separator,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    color: color.text.second,
  },
  textHeader: {
    fontWeight: '600',
    marginBottom: 24,
  },
  textContent: {
    color: color.text.gray,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
  },
  returnButton: {
    borderRadius: 4,
    backgroundColor: color.button.secondBg,
    width: '100%',
    justifyContent: 'center',
    marginBottom: 12,
  },
  loginButton: {
    borderRadius: 4,
    backgroundColor: color.button.primBg,
    width: '100%',
    justifyContent: 'center',
    marginBottom: 12,
  },
  buttonLabel: {
    fontSize: 18,
    height: 24,
    marginVertical: 10,
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
  },
  registerInput: {
    marginBottom: 4,
    backgroundColor: color.input.background,
    width: '48%',
  },
  nameInput: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
  },
  birthdayButton: {
    width: '100%',
    borderRadius: 4,
    marginBottom: 12,
    backgroundColor: color.input.background,
    borderColor: color.transparent,
  },
  birthdayLabel: {
    color: color.text.prim,
    fontSize: 16,
    height: 28,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  genderRadioGroup: {
    width: '100%',
  },
  genderRadioItem: {
    borderBottomColor: color.other.separator,
    borderBottomWidth: 1,
  },
  genderLabel: {
    fontSize: 16,
  },
  loginInput: {
    width: '100%',
    marginBottom: 4,
    backgroundColor: color.input.background,
  },
  errorText: {
    fontSize: 16,
    color: color.main.error,
    marginBottom: 12,
  },
});

export default RegisterScreen;
