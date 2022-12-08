import React from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { color } from '../../core/common/styleVariables';

const Popup = ({
  title,
  content,
  show,
  confirm,
  cancel,
  continueAction,
  resource,
}) => {
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={show}
      onRequestClose={cancel}
      style={{ backgroundColor: 'red' }}
    >
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: color.bgOpacity,
          paddingHorizontal: 48,
        }}
      >
        <View style={{ backgroundColor: color.whitePrim, borderRadius: 12 }}>
          <View style={{ padding: 20 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                textAlign: 'center',
                marginBottom: 4,
              }}
            >
              {title}
            </Text>
            <Text style={{ fontSize: 16, textAlign: 'center' }}>{content}</Text>
          </View>
          <View>
            {confirm && (
              <TouchableOpacity
                style={{
                  borderTopWidth: 1,
                  borderTopColor: color.postSeparator,
                  paddingVertical: 12,
                }}
                activeOpacity={1}
                onPress={confirm}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: color.bluePrim,
                    textAlign: 'center',
                  }}
                >
                  {resource.confirm}
                </Text>
              </TouchableOpacity>
            )}
            {cancel && (
              <TouchableOpacity
                style={{
                  borderTopWidth: 1,
                  borderTopColor: color.postSeparator,
                  paddingVertical: 12,
                }}
                activeOpacity={1}
                onPress={cancel}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: color.redPrim,
                    textAlign: 'center',
                  }}
                >
                  {resource.cancel}
                </Text>
              </TouchableOpacity>
            )}
            {continueAction && (
              <TouchableOpacity
                style={{
                  borderTopWidth: 1,
                  borderTopColor: color.postSeparator,
                  paddingVertical: 12,
                }}
                activeOpacity={1}
                onPress={continueAction}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: color.bluePrim,
                    textAlign: 'center',
                    fontWeight: '600',
                  }}
                >
                  {resource.continue}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Popup;
