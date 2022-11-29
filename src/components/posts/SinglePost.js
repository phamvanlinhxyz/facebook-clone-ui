import { Video } from 'expo-av';
import React, { useRef } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Avatar, Divider, Text } from 'react-native-paper';
import { convertTimeToAgo } from '../../core/common/commonFunction';
import { color } from '../../core/common/styleVariables';
import PostImages from './PostImages';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { postsResource } from '../../resources';

const SinglePost = ({ post, width, imageClick }) => {
  const videoRef = useRef(null);
  return (
    <View>
      <Divider style={{ height: 2, backgroundColor: color.postSeparator }} />
      {/* Post Author */}
      <View style={{ flexDirection: 'row', alignItems: 'center', margin: 12 }}>
        <Avatar.Image size={40} source={post.author.avatar.fileLink} />
        <View style={{ marginLeft: 12 }}>
          <Text style={{ fontWeight: '600', fontSize: 16 }}>
            {post.author.username}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: color.textSecond, marginRight: 4 }}>
              {convertTimeToAgo(post.createdAt)}
            </Text>
            <MaterialIcons name='public' size={14} color={color.textSecond} />
          </View>
        </View>
      </View>
      {/* Nội dung bài đăng */}
      {post.described.trim() !== '' && (
        <Text
          style={{
            color: color.textPrim,
            marginHorizontal: 12,
            marginBottom: 8,
            fontSize: 16,
          }}
        >
          {post.described}
        </Text>
      )}
      {/* Hiển thị ảnh */}
      {post.images.length > 0 && (
        <PostImages
          images={post.images}
          width={width}
          imageClick={imageClick}
          post={post}
        />
      )}
      {/* Hiển thị video */}
      {post.videos && (
        <Video
          ref={videoRef}
          source={{
            uri: post.videos.fileLink,
          }}
          style={{ borderRadius: 6, marginHorizontal: 12 }}
          videoStyle={{
            position: 'relative',
            height: width * 0.5625,
          }}
          useNativeControls
          resizeMode='contain'
          isLooping
        />
      )}
      {/* Số lượng like, bình luân */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 12,
          marginTop: 12,
        }}
      >
        <View>
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
        <Text style={{ color: color.textSecond, fontSize: 16 }}>
          {post.countComments > 0
            ? post.countComments + postsResource.comments
            : ''}
        </Text>
      </View>
      {/* Like, Bình luận */}
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: color.loginSeparator,
          marginHorizontal: 12,
          marginTop: 8,
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: width / 2,
            justifyContent: 'center',
            paddingVertical: 8,
          }}
        >
          <AntDesign name='like2' size={24} color={color.textPrim} />
          <Text style={{ marginLeft: 4, marginTop: 4, fontSize: 16 }}>
            {postsResource.like}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: width / 2,
            justifyContent: 'center',
            paddingVertical: 8,
          }}
        >
          <Ionicons
            name='ios-chatbubble-outline'
            size={24}
            color={color.textPrim}
          />
          <Text style={{ marginLeft: 4, marginTop: 4, fontSize: 16 }}>
            {postsResource.comment}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SinglePost;
