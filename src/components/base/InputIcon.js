import React from 'react';
import { View } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import { color } from '../../core/common/styleVariables';

const InputIcon = ({
  icon,
  value,
  onChange,
  placeholder,
  onSubmit,
  deleteBtn,
  rounded,
  secureTextEntry,
  style,
  wrapStyle,
}) => {
  return (
    <View
      style={{
        ...wrapStyle,
        flexDirection: 'row',
        backgroundColor: color.button.defaultBg,
        borderRadius: rounded ? 100 : 4,
        alignItems: 'center',
      }}
    >
      <IconButton
        icon={icon}
        style={{
          backgroundColor: color.transparent,
          margin: 0,
          position: 'absolute',
        }}
        iconColor={color.text.prim}
      />
      <TextInput
        value={value}
        onChangeText={onChange}
        underlineColorAndroid={color.transparent}
        activeUnderlineColor={color.transparent}
        underlineColor={color.transparent}
        placeholder={placeholder}
        style={{
          ...style,
          backgroundColor: color.transparent,
          flex: 1,
          marginLeft: 24,
        }}
        onSubmitEditing={onSubmit ? onSubmit : null}
        secureTextEntry={secureTextEntry}
        right={
          deleteBtn && value ? (
            <TextInput.Icon icon='close-circle' onPress={() => setText('')} />
          ) : null
        }
      />
    </View>
  );
};

export default InputIcon;
