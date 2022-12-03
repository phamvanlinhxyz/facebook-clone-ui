import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { color } from '../../core/common/styleVariables';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { Avatar, Divider, Text } from 'react-native-paper';
import { convertDateTimeByFormat } from '../../core/common/commonFunction';
import { postsResource } from '../../resources';

const SingleResult = ({ post, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <Divider style={{ height: 4, backgroundColor: color.postSeparator }} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          margin: 12,
        }}
      >
        <Avatar.Image size={40} source={post.author.avatar.fileLink} />
        <View style={{ marginLeft: 12 }}>
          <Text style={{ fontWeight: '600', fontSize: 16 }}>
            {post.author.username}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', marginHorizontal: 12 }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text
            style={{ fontSize: 16, marginRight: 12 }}
            numberOfLines={4}
            lineBreakMode='middle'
          >
            <Text
              style={{
                color: color.textSecond,
                marginRight: 4,
              }}
            >
              {convertDateTimeByFormat(
                post.createdAt,
                `DD [tháng] MM${
                  new Date(post.createdAt).getFullYear() ===
                  new Date().getFullYear()
                    ? ''
                    : ', YYYY'
                }`
              )}
            </Text>
            <MaterialIcons
              name='public'
              size={14}
              color={color.textSecond}
              style={{ marginRight: 4, paddingTop: 2 }}
            />
            {post.described}
          </Text>
        </View>
        {post.images.length > 0 && (
          <Image
            source={{ uri: post.images[0].fileLink }}
            style={{ height: 72, width: 72, borderRadius: 6 }}
          />
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 12,
          marginTop: 12,
        }}
      >
        <View style={{ marginBottom: 12 }}>
          {post.like.length > 0 && (
            <Text style={{ fontSize: 16, color: color.textSecond }}>
              <AntDesign
                name='like1'
                size={14}
                color={color.whitePrim}
                style={{
                  borderRadius: 50,
                  backgroundColor: color.bluePrim,
                  padding: 4,
                  marginRight: 4,
                }}
              />
              {post.like.length}
            </Text>
          )}
        </View>
        <Text
          style={{ color: color.textSecond, fontSize: 16, marginBottom: 12 }}
        >
          {post.countComments > 0
            ? post.countComments + postsResource.comments
            : ''}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SingleResult;
