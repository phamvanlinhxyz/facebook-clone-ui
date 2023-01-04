import { Video } from 'expo-av';
import React, { useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Avatar, Divider, Text } from 'react-native-paper';
import {
  convertNumber,
  convertTimeToAgo,
} from '../../core/common/commonFunction';
import { color } from '../../core/common/styleVariables';
import PostImages from './PostImages';
import { AntDesign, Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
import { postsResource } from '../../resources';
import { useSelector } from 'react-redux';
import { authSelector } from '../../store/reducers/auth.reducer';

const SinglePost = ({
  post,
  width,
  imageClick,
  toggleMenu,
  showPostDetail,
}) => {
  const videoRef = useRef(null);
  const { user } = useSelector(authSelector);
  const [readAll, setReadAll] = useState(post.described.length < 150);

  return (
    <View>
      <Divider style={{ height: 2, backgroundColor: color.other.separator }} />
      {/* Post Author */}
      <View style={{ flexDirection: 'row', alignItems: 'center', margin: 12 }}>
        <Avatar.Image size={40} source={{ uri: post.author.avatar.fileLink }} />
        <View style={{ marginLeft: 12 }}>
          <Text style={{ fontWeight: '600', fontSize: 16 }}>
            {post.author.username}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: color.text.gray, marginRight: 4 }}>
              {convertTimeToAgo(post.createdAt)}
            </Text>
            <MaterialIcons name='public' size={14} color={color.text.gray} />
          </View>
        </View>
        <TouchableOpacity
          style={{ flex: 1, height: '100%' }}
          activeOpacity={1}
          onPress={() => showPostDetail(post)}
        ></TouchableOpacity>
        {user._id === post.author._id && (
          <Entypo
            name='dots-three-horizontal'
            size={24}
            color={color.text.gray}
            onPress={() => toggleMenu(post)}
          />
        )}
      </View>
      {/* Nội dung bài đăng */}
      {post.described.trim() !== '' && (
        <Text
          style={{
            color: color.text.prim,
            marginHorizontal: 12,
            marginBottom: 8,
            fontSize: 16,
          }}
          onPress={() => {
            if (post.described.length > 150) {
              setReadAll((prev) => !prev);
            }
          }}
        >
          {readAll
            ? post.described
            : post.described.toString().slice(0, 150) + '...'}
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
            <Text style={{ fontSize: 16, color: color.text.gray }}>
              <AntDesign
                name='like1'
                size={14}
                color={color.text.white}
                style={{
                  borderRadius: 50,
                  backgroundColor: color.button.primBg,
                  padding: 4,
                  marginRight: 4,
                }}
              />
              {convertNumber(post.like.length)}
            </Text>
          )}
        </View>
        {post.countComments > 0 ? (
          <Text
            style={{ color: color.text.gray, fontSize: 16 }}
            onPress={() => showPostDetail(post)}
          >
            {convertNumber(post.countComments) + postsResource.comments}
          </Text>
        ) : null}
      </View>
      {/* Like, Bình luận */}
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: color.other.separator,
          marginHorizontal: 12,
          marginTop: 8,
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: width / 2,
            justifyContent: 'center',
            paddingVertical: 8,
          }}
          activeOpacity={1}
        >
          <AntDesign name='like2' size={24} color={color.text.prim} />
          <Text style={{ marginLeft: 4, marginTop: 4, fontSize: 16 }}>
            {postsResource.like}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: width / 2,
            justifyContent: 'center',
            paddingVertical: 8,
          }}
          activeOpacity={1}
          onPress={() => showPostDetail(post)}
        >
          <Ionicons
            name='ios-chatbubble-outline'
            size={24}
            color={color.text.prim}
          />
          <Text style={{ marginLeft: 4, marginTop: 4, fontSize: 16 }}>
            {postsResource.comment}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SinglePost;
