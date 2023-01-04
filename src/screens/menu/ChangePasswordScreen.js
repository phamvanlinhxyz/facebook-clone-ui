import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { BHeader, BInputIcon } from '../../components';
import { validatePass } from '../../core/common/commonFunction';
import { color } from '../../core/common/styleVariables';
import menuResource from '../../resources/menuResource';
import authService from '../../services/auth.service';
import { setUserInfo } from '../../store/reducers/auth.reducer';

const ChangePasswordScreen = ({ navigation }) => {
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewpass] = useState('');
  const [cNewPass, setCNewPass] = useState('');
  const [error, setError] = useState('');

  /**
   * Bắt sự kiện khi nhập lại thì bỏ thông báo
   */
  useEffect(() => {
    if (error) {
      setError('');
    }
  }, [currentPass, newPass, cNewPass]);

  const dispatch = useDispatch();

  /**
   * Sự kiện đổi mật khẩu
   */
  const handleSubmit = async () => {
    if (!currentPass.trim() || !newPass.trim() || !cNewPass.trim()) {
      setError(menuResource.eNotPassword);
    } else if (newPass.trim() !== cNewPass.trim()) {
      setError(menuResource.ePasswordNotMatch);
    } else if (validatePass(newPass.trim())) {
      setError(validatePass(newPass.trim()));
    } else {
      const res = await authService.changePassword({
        currentPassword: currentPass,
        newPassword: newPass,
      });

      if (!res.success) {
        setError(res.message);
      } else {
        dispatch(setUserInfo(res.data));
        navigation.goBack();
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <BHeader
        leftBtn={[{ icon: 'chevron-left', onPress: () => navigation.goBack() }]}
        title={menuResource.changePass}
      />
      <View style={{ flex: 1, padding: 16 }}>
        <BInputIcon
          icon='shield-alert-outline'
          value={currentPass}
          onChange={setCurrentPass}
          placeholder={menuResource.currentPass}
          style={{ height: 48 }}
          wrapStyle={{ marginBottom: 12 }}
          secureTextEntry={true}
        />
        <BInputIcon
          icon='key-outline'
          value={newPass}
          onChange={setNewpass}
          placeholder={menuResource.newPass}
          style={{ height: 48 }}
          wrapStyle={{ marginBottom: 12 }}
          secureTextEntry={true}
        />
        <BInputIcon
          icon='key-outline'
          value={cNewPass}
          onChange={setCNewPass}
          placeholder={menuResource.cNewPass}
          style={{ height: 48 }}
          wrapStyle={{ marginBottom: 4 }}
          secureTextEntry={true}
        />
        {error ? (
          <Text
            style={{
              fontSize: 16,
              color: color.main.error,
              marginBottom: 12,
              marginTop: 12,
              marginBottom: 4,
              textAlign: 'left',
            }}
          >
            {error}
          </Text>
        ) : null}
        <Button
          style={styles.button}
          labelStyle={styles.buttonLabel}
          textColor={color.text.white}
          contentStyle={{ height: 44 }}
          onPress={handleSubmit}
        >
          {menuResource.savePass}
        </Button>
        <Button
          style={styles.returnButton}
          labelStyle={styles.buttonLabel}
          textColor={color.text.prim}
          onPress={() => navigation.goBack()}
          contentStyle={{ height: 44 }}
        >
          {menuResource.cancel}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    backgroundColor: color.button.primBg,
    marginTop: 8,
    width: '100%',
    justifyContent: 'center',
    marginBottom: 4,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  returnButton: {
    borderRadius: 4,
    marginTop: 8,
    backgroundColor: color.button.defaultBg,
    width: '100%',
    justifyContent: 'center',
  },
});

export default ChangePasswordScreen;
