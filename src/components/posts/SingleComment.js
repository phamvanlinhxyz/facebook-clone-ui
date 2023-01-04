import React from 'react';
import { Image, View } from 'react-native';
import { Text } from 'react-native-paper';
import { convertTimeToAgo } from '../../core/common/commonFunction';
import { color } from '../../core/common/styleVariables';

/**
 * Comment
 * @param {*} cmt
 * @returns
 */
const SingleComment = ({ cmt }) => {
  return (
    <View style={{ flexDirection: 'row', marginBottom: 8 }}>
      <Image
        source={{ uri: cmt.user.avatar.fileLink }}
        style={{ width: 40, height: 40, borderRadius: 20 }}
      />
      <View style={{ marginLeft: 8 }}>
        <View
          style={{
            paddingVertical: 8,
            paddingHorizontal: 12,
            backgroundColor: color.other.secondBg,
            borderRadius: 12,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '600' }}>
            {cmt.user.username}
          </Text>
          <Text style={{ fontSize: 16 }}>{cmt.content}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 4,
            paddingHorizontal: 12,
          }}
        >
          <Text style={{ color: color.text.gray, fontSize: 16 }}>
            {convertTimeToAgo(cmt.createdAt)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SingleComment;
