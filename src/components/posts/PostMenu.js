import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';
import { color } from '../../core/common/styleVariables';
import { postsResource } from '../../resources';

const PostMenu = ({ toggleMenu, editPost, deletePost }) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: color.other.opacityBg,
        zIndex: 4,
      }}
    >
      <TouchableOpacity
        style={{ flex: 1, zIndex: 5 }}
        onPress={() => toggleMenu(null)}
      />
      <View
        style={{
          zIndex: 6,
          backgroundColor: color.other.primBg,
          position: 'absolute',
          padding: 12,
          width: '100%',
          borderTopStartRadius: 8,
          borderTopEndRadius: 8,
          bottom: 0,
        }}
      >
        <Button
          style={{ borderRadius: 6 }}
          textColor={color.text.prim}
          contentStyle={{ justifyContent: 'flex-start' }}
          labelStyle={{ fontSize: 16 }}
          icon='pencil'
          onPress={editPost}
        >
          {postsResource.editPost}
        </Button>
        <Button
          style={{ borderRadius: 6 }}
          textColor={color.text.prim}
          contentStyle={{ justifyContent: 'flex-start' }}
          labelStyle={{ fontSize: 16 }}
          icon='delete'
          onPress={deletePost}
        >
          {postsResource.deletePost}
        </Button>
      </View>
    </View>
  );
};

export default PostMenu;
