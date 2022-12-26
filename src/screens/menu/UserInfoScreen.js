import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Header } from '../../components';
import menuResource from '../../resources/menuResource';
import { AntDesign } from '@expo/vector-icons';
import { color } from '../../core/common/styleVariables';
import { useSelector } from 'react-redux';
import { authSelector } from '../../store/reducers/auth.reducer';

const UserInfoScreen = ({ navigation }) => {
  const { user } = useSelector(authSelector);

  return (
    <View style={{ flex: 1 }}>
      <Header
        leftBtn={[{ icon: 'chevron-left', onPress: () => navigation.goBack() }]}
        title={menuResource.accountInfo}
      />
      <View
        style={{
          paddingHorizontal: 16,
          marginVertical: 12,
          borderBottomColor: color.other.separator,
          borderBottomWidth: 1,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: '600' }}>
          {menuResource.general}
        </Text>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            flexDirection: 'row',
            marginVertical: 12,
          }}
          onPress={() => navigation.navigate('NameSettingScreen')}
        >
          <AntDesign name='idcard' size={32} color={color.text.gray} />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: '600' }}>
              {menuResource.name}
            </Text>
            <Text style={{ color: color.text.gray }}>{user.username}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserInfoScreen;
