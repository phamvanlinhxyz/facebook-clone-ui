import React, { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../components';
import { color } from '../../core/common/styleVariables';
import menuResource from '../../resources/menuResource';
import { authSelector, saveTempName } from '../../store/reducers/auth.reducer';

const NameSettingScreen = ({ navigation }) => {
  const { user, firstName, middleName, lastName } = useSelector(authSelector);
  const dispatch = useDispatch();

  // Lưu các state tên tạm
  const [tempName, setTempName] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
  });

  useEffect(() => {
    setTempName({
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
    });
  }, [firstName, middleName, lastName]);

  /**
   * Chuyển sang trang preview
   */
  const showPreviewScreen = () => {
    // Set tên tạm thời trong state
    dispatch(saveTempName(tempName));
    // Chuyển trang
    navigation.navigate('NamePreviewScreen');
  };

  /**
   * Đóng trang
   */
  const handleClose = () => {
    setTempName({
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
    });
    dispatch(saveTempName(tempName));
    navigation.navigate('UserInfoScreen');
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        leftBtn={[{ icon: 'chevron-left', onPress: () => navigation.goBack() }]}
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
        <Text style={{ fontSize: 16 }}>{menuResource.firstName}</Text>
        <TextInput
          style={styles.nameInput}
          value={tempName.firstName}
          onChangeText={(val) => setTempName({ ...tempName, firstName: val })}
          mode='outlined'
          placeholder={menuResource.firstName}
          outlineColor={color.transparent}
          activeOutlineColor={color.transparent}
          placeholderTextColor={color.input.placeholder}
        />
        <Text style={{ fontSize: 16 }}>{menuResource.middleName}</Text>
        <TextInput
          style={styles.nameInput}
          value={tempName.middleName}
          onChangeText={(val) => setTempName({ ...tempName, middleName: val })}
          mode='outlined'
          placeholder={menuResource.middleName}
          outlineColor={color.transparent}
          activeOutlineColor={color.transparent}
          placeholderTextColor={color.input.placeholder}
        />
        <Text style={{ fontSize: 16 }}>{menuResource.name}</Text>
        <TextInput
          style={styles.nameInput}
          value={tempName.lastName}
          onChangeText={(val) => setTempName({ ...tempName, lastName: val })}
          mode='outlined'
          placeholder={menuResource.name}
          outlineColor={color.transparent}
          activeOutlineColor={color.transparent}
          placeholderTextColor={color.input.placeholder}
        />
        {tempName.firstName.trim() !== '' && tempName.lastName.trim() !== '' ? (
          <Button
            style={styles.previewBtn}
            labelStyle={styles.buttonLabel}
            textColor={color.text.white}
            contentStyle={{ height: 44 }}
            onPress={showPreviewScreen}
          >
            {menuResource.seeChange}
          </Button>
        ) : null}
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

export default NameSettingScreen;
