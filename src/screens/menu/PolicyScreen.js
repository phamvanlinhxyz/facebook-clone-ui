import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { color } from '../../core/common/styleVariables';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import menuResource from '../../resources/menuResource';

const PolicyScreen = ({ navigation }) => {
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
          {menuResource.facebookPolicy}
        </Text>
        <MaterialIcons
          name='keyboard-arrow-left'
          size={32}
          color='black'
          style={{
            width: 40,
            height: 40,
            padding: 4,
            position: 'absolute',
          }}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: color.other.secondBg,
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}
      >
        <TouchableOpacity style={styles.touchable} activeOpacity={1}>
          <View style={styles.iconBg}>
            <MaterialCommunityIcons
              name='book-open-variant'
              size={24}
              color='black'
            />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: '600' }}>
              {menuResource.termsTitle}
            </Text>
            <Text style={{ color: color.text.gray }}>
              {menuResource.termsLabel}
            </Text>
          </View>
          <MaterialIcons
            name='keyboard-arrow-right'
            size={24}
            color={color.text.gray}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable} activeOpacity={1}>
          <View style={styles.iconBg}>
            <MaterialCommunityIcons
              name='book-lock-outline'
              size={24}
              color='black'
            />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: '600' }}>
              {menuResource.privacyTitle}
            </Text>
            <Text style={{ color: color.text.gray }}>
              {menuResource.privacyLabel}
            </Text>
          </View>
          <MaterialIcons
            name='keyboard-arrow-right'
            size={24}
            color={color.text.gray}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable} activeOpacity={1}>
          <View style={styles.iconBg}>
            <MaterialCommunityIcons
              name='police-badge-outline'
              size={24}
              color='black'
            />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: '600' }}>
              {menuResource.standardsTitle}
            </Text>
            <Text style={{ color: color.text.gray }}>
              {menuResource.standardsLabel}
            </Text>
          </View>
          <MaterialIcons
            name='keyboard-arrow-right'
            size={24}
            color={color.text.gray}
          />
        </TouchableOpacity>
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
});

export default PolicyScreen;
