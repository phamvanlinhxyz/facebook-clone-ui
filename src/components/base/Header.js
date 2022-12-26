import React from 'react';
import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { color } from '../../core/common/styleVariables';

const Header = ({ leftBtn, rightBtn, title }) => {
  return (
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
      {/* Các button bên trái */}
      {leftBtn && leftBtn.length > 0 ? (
        <View style={{ position: 'absolute', left: 16, flexDirection: 'row' }}>
          {leftBtn.map((btn, i) => {
            return (
              <IconButton
                icon={btn.icon}
                style={{
                  margin: 0,
                  backgroundColor: color.button.defaultBg,
                  width: 40,
                  height: 40,
                  marginRight: 12,
                }}
                size={32}
                iconColor={color.text.prim}
                onPress={btn.onPress}
                key={i}
              />
            );
          })}
        </View>
      ) : null}
      {/* Tiêu đề screen */}
      <Text
        style={{
          fontSize: 20,
          flex: 1,
          fontWeight: '600',
          textAlign: 'center',
        }}
      >
        {title}
      </Text>
      {/* Các button bên phải */}
      {rightBtn && rightBtn.length > 0 ? (
        <View style={{ position: 'absolute', right: 16, flexDirection: 'row' }}>
          {leftBtn.map((btn, i) => {
            return (
              <IconButton
                icon={btn.icon}
                style={{
                  margin: 0,
                  backgroundColor: color.button.defaultBg,
                  width: 40,
                  height: 40,
                  marginLeft: 12,
                }}
                size={32}
                iconColor={color.text.prim}
                onPress={btn.onPress}
                key={i}
              />
            );
          })}
        </View>
      ) : null}
    </View>
  );
};

export default Header;
