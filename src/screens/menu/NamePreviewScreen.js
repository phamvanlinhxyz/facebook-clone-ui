import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, RadioButton, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../components';
import { color } from '../../core/common/styleVariables';
import menuResource from '../../resources/menuResource';
import authService from '../../services/auth.service';
import {
  authSelector,
  saveTempName,
  updateUserInfo,
} from '../../store/reducers/auth.reducer';

const NamePreviewScreen = ({ navigation }) => {
  const { user, firstName, middleName, lastName } = useSelector(authSelector);
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(
      firstName +
        ' ' +
        (middleName.trim() !== '' ? middleName + ' ' : '') +
        lastName
    );
  }, [firstName, middleName, lastName]);

  /**
   * Xử lý sự kiện đóng trang
   */
  const handleClose = () => {
    dispatch(
      saveTempName({
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
      })
    );
    navigation.navigate('UserInfoScreen');
  };

  /**
   * Xử lý sự kiện save tên mới
   */
  const handleSave = async () => {
    const res = await authService.edit({
      username,
      firstName,
      middleName,
      lastName,
    });
    if (res.success) {
      dispatch(updateUserInfo(res.data));
      navigation.navigate('MenuScreen');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        leftBtn={[
          {
            icon: 'chevron-left',
            onPress: handleClose,
          },
        ]}
        title={menuResource.name}
      />

      <Text
        style={{
          fontSize: 20,
          fontWeight: '600',
          borderBottomColor: color.other.separator,
          borderBottomWidth: 1,
          paddingVertical: 12,
          paddingHorizontal: 16,
        }}
      >
        {menuResource.name}
      </Text>
      <View style={{ paddingVertical: 12, paddingHorizontal: 16 }}>
        <RadioButton.Group
          onValueChange={(newVal) => setUsername(newVal)}
          value={username}
        >
          {middleName.trim() !== '' ? (
            <RadioButton.Item
              value={firstName + ' ' + middleName + ' ' + lastName}
              color={color.button.primBg}
              label={firstName + ' ' + middleName + ' ' + lastName}
            />
          ) : null}
          <RadioButton.Item
            value={firstName + ' ' + lastName}
            color={color.button.primBg}
            label={firstName + ' ' + lastName}
          />
          <RadioButton.Item
            value={lastName + ' ' + firstName}
            color={color.button.primBg}
            label={lastName + ' ' + firstName}
          />
          {middleName.trim() !== '' ? (
            <RadioButton.Item
              value={lastName + ' ' + middleName + ' ' + firstName}
              color={color.button.primBg}
              label={lastName + ' ' + middleName + ' ' + firstName}
            />
          ) : null}
        </RadioButton.Group>
        <Button
          style={styles.previewBtn}
          labelStyle={styles.buttonLabel}
          textColor={color.text.white}
          contentStyle={{ height: 44 }}
          onPress={handleSave}
        >
          {menuResource.save}
        </Button>
        <Button
          style={styles.returnButton}
          labelStyle={styles.buttonLabel}
          textColor={color.text.prim}
          contentStyle={{ height: 44 }}
          onPress={handleClose}
        >
          {menuResource.cancel}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nameInput: {
    width: '100%',
    marginBottom: 4,
    backgroundColor: color.input.background,
  },
  previewBtn: {
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

export default NamePreviewScreen;
