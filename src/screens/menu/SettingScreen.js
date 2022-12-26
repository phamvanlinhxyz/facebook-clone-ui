import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Divider, IconButton, Text } from 'react-native-paper';
import { color } from '../../core/common/styleVariables';
import menuResource from '../../resources/menuResource';
import { AntDesign, Ionicons } from '@expo/vector-icons';

const SettingScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: 64,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 8,
          paddingVertical: 8,
          position: 'relative',
          borderBottomColor: color.other.separator,
          borderBottomWidth: 1,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            flex: 1,
            fontWeight: '600',
            textAlign: 'center',
          }}
        >
          {menuResource.setting}
        </Text>
        <IconButton
          icon='chevron-left'
          style={{
            margin: 0,
            backgroundColor: color.button.defaultBg,
            position: 'absolute',
            left: 16,
            width: 40,
            height: 40,
          }}
          size={32}
          iconColor={color.text.prim}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={{ flex: 1, paddingVertical: 12 }}>
        <View style={{ paddingHorizontal: 16 }}>
          <Text style={{ fontSize: 20, fontWeight: '600' }}>
            {menuResource.privacy}
          </Text>
          <Text style={{ color: color.text.gray }}>
            {menuResource.privacyDesc}
          </Text>
          <TouchableOpacity
            activeOpacity={1}
            style={{ flexDirection: 'row', marginVertical: 12 }}
            onPress={() => navigation.navigate('ListBlockScreen')}
          >
            <AntDesign name='deleteuser' size={32} color={color.text.gray} />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: '600' }}>
                {menuResource.block}
              </Text>
              <Text style={{ color: color.text.gray }}>
                {menuResource.blockDesc}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Divider
          style={{
            height: 4,
            backgroundColor: color.other.separator,
            marginBottom: 12,
          }}
        />
        <View style={{ paddingHorizontal: 16 }}>
          <Text style={{ fontSize: 20, fontWeight: '600' }}>
            {menuResource.account}
          </Text>
          <Text style={{ color: color.text.gray }}>
            {menuResource.accountDesc}
          </Text>
          <TouchableOpacity
            activeOpacity={1}
            style={{ flexDirection: 'row', marginVertical: 12 }}
            onPress={() => navigation.navigate('UserInfoScreen')}
          >
            <Ionicons
              name='person-circle-outline'
              size={32}
              color={color.text.gray}
            />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: '600' }}>
                {menuResource.accountInfo}
              </Text>
              <Text style={{ color: color.text.gray }}>
                {menuResource.accountInfoDesc}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Divider
          style={{
            height: 4,
            backgroundColor: color.other.separator,
            marginBottom: 12,
          }}
        />
        <View style={{ paddingHorizontal: 16 }}>
          <Text style={{ fontSize: 20, fontWeight: '600' }}>
            {menuResource.security}
          </Text>
          <Text style={{ color: color.text.gray }}>
            {menuResource.securityDesc}
          </Text>
          <TouchableOpacity
            activeOpacity={1}
            style={{ flexDirection: 'row', marginVertical: 12 }}
            onPress={() => navigation.navigate('SecurityScreen')}
          >
            <Ionicons name='shield-outline' size={32} color={color.text.gray} />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: '600' }}>
                {menuResource.securityNLogin}
              </Text>
              <Text style={{ color: color.text.gray }}>
                {menuResource.securityDesc}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SettingScreen;
