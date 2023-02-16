import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { color } from '../../core/common/styleVariables';
import menuResource from '../../resources/menuResource';
import { authSelector, logout } from '../../store/reducers/auth.reducer';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { clearPost } from '../../store/reducers/posts.reducer';
import {
  clearFriend,
  setUserSelected,
} from '../../store/reducers/friend.reducer';
import { clearNotification } from '../../store/reducers/notification.reducer';
import { clearSearch } from '../../store/reducers/search.reducer';

const MenuScreen = ({ navigation }) => {
  const { user } = useSelector(authSelector);
  const dispatch = useDispatch();

  const [isShowPrivateSetting, setIsShowPrivateSetting] = useState(false);
  const [isShowSuportSetting, setIsShowSuportSetting] = useState(false);

  /**
   * Xử lý đăng xuất
   */
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearPost());
    dispatch(clearFriend());
    dispatch(clearNotification());
    dispatch(clearSearch());
  };

  return (
    <View style={{ flex: 1, backgroundColor: color.other.secondBg }}>
      <View
        style={{
          height: 64,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}
      >
        <Text style={{ fontSize: 28, flex: 1, fontWeight: '600' }}>
          {menuResource.menu}
        </Text>
        <IconButton
          icon='magnify'
          style={{ margin: 0, backgroundColor: color.button.defaultBg }}
          iconColor={color.text.prim}
          onPress={() => navigation.navigate('SearchScreen')}
        />
      </View>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            ...styles.touchable,
            marginHorizontal: 16,
          }}
          onPress={() => {
            dispatch(setUserSelected(user._id));
            navigation.navigate('PersonalPageScreen');
          }}
        >
          <Image
            source={{ uri: user.avatar.fileLink }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
          <Text style={{ fontSize: 18, marginLeft: 12 }}>{user.username}</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}></View>
        <View style={{ marginTop: 12 }}>
          <View style={styles.setting}>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                position: 'relative',
              }}
              onPress={() => {
                setIsShowSuportSetting((prev) => !prev);
              }}
            >
              <View style={styles.iconBg}>
                <AntDesign name='questioncircleo' size={24} color='black' />
              </View>
              <Text style={{ fontSize: 20, fontWeight: '600', marginLeft: 12 }}>
                {menuResource.suport}
              </Text>
              <MaterialIcons
                name={
                  isShowSuportSetting
                    ? 'keyboard-arrow-up'
                    : 'keyboard-arrow-down'
                }
                size={24}
                color='black'
                style={{ position: 'absolute', right: 0 }}
              />
            </TouchableOpacity>
            {isShowSuportSetting && (
              <TouchableOpacity
                activeOpacity={1}
                style={styles.touchable}
                onPress={() => navigation.navigate('PolicyScreen')}
              >
                <View style={styles.iconBg}>
                  <AntDesign name='book' size={24} color='black' />
                </View>
                <Text style={{ fontSize: 16, marginLeft: 12 }}>
                  {menuResource.policy}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.setting}>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                position: 'relative',
              }}
              onPress={() => {
                setIsShowPrivateSetting((prev) => !prev);
              }}
            >
              <View style={styles.iconBg}>
                <AntDesign name='setting' size={24} color='black' />
              </View>
              <Text style={{ fontSize: 20, fontWeight: '600', marginLeft: 12 }}>
                {menuResource.settingPrivate}
              </Text>
              <MaterialIcons
                name={
                  isShowPrivateSetting
                    ? 'keyboard-arrow-up'
                    : 'keyboard-arrow-down'
                }
                size={24}
                color='black'
                style={{ position: 'absolute', right: 0 }}
              />
            </TouchableOpacity>
            {isShowPrivateSetting && (
              <TouchableOpacity
                activeOpacity={1}
                style={styles.touchable}
                onPress={() => navigation.navigate('SettingScreen')}
              >
                <View style={styles.iconBg}>
                  <AntDesign name='user' size={24} color='black' />
                </View>
                <Text style={{ fontSize: 16, marginLeft: 12 }}>
                  {menuResource.setting}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.setting}>
            <TouchableOpacity
              activeOpacity={1}
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={handleLogout}
            >
              <View style={styles.iconBg}>
                <Ionicons name='log-out-outline' size={24} color='black' />
              </View>
              <Text style={{ fontSize: 20, fontWeight: '600', marginLeft: 12 }}>
                {menuResource.logout}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  touchable: {
    backgroundColor: color.other.primBg,
    padding: 12,
    borderRadius: 8,
    shadowColor: color.shadow.shadow1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 12,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBg: {
    backgroundColor: color.button.defaultBg,
    padding: 8,
    borderRadius: 20,
    width: 40,
    height: 40,
  },
  setting: {
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: color.other.separator,
    paddingVertical: 8,
  },
});

export default MenuScreen;
