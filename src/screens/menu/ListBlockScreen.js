import React, { useEffect } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, IconButton, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { color } from '../../core/common/styleVariables';
import menuResource from '../../resources/menuResource';
import {
  friendSelector,
  getListBlock,
} from '../../store/reducers/friend.reducer';

const ListBlockScreen = ({ navigation }) => {
  const { listBlock } = useSelector(friendSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListBlock());
  }, []);

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
          {menuResource.block}
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
      <ScrollView style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
        {listBlock &&
          listBlock.length > 0 &&
          listBlock.map((item, index) => {
            return (
              <TouchableOpacity
                style={{
                  borderBottomColor: color.other.separator,
                  borderBottomWidth: 1,
                  flexDirection: 'row',
                  paddingBottom: 12,
                  alignItems: 'center',
                }}
                key={index}
                activeOpacity={1}
              >
                <Image
                  source={{ uri: item.receiver.avatar.fileLink }}
                  style={{ width: 32, height: 32 }}
                />
                <Text style={{ fontSize: 16, flex: 1, marginLeft: 12 }}>
                  {item.receiver.username}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default ListBlockScreen;
