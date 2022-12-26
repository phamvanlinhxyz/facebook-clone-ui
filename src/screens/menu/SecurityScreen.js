import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import menuResource from '../../resources/menuResource';
import { Header } from '../../components';
import { color } from '../../core/common/styleVariables';
import { Octicons } from '@expo/vector-icons';

const SecurityScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <Header
        leftBtn={[{ icon: 'chevron-left', onPress: () => navigation.goBack() }]}
        title={menuResource.securityNLogin}
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
          {menuResource.login}
        </Text>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            flexDirection: 'row',
            marginVertical: 12,
          }}
          onPress={() => navigation.navigate('ChangePasswordScreen')}
        >
          <Octicons name='key' size={32} color={color.text.gray} />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: '600' }}>
              {menuResource.changePass}
            </Text>
            <Text style={{ color: color.text.gray }}>
              {menuResource.changePassDesc}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SecurityScreen;
