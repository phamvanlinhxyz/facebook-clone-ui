import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { Avatar, Divider, IconButton, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { postsResource } from '../../resources';
import {
  postsSelector,
  setImageSortOrder,
  updateSelectedPost,
} from '../../store/reducers/posts.reducer';
import { MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import { color } from '../../core/common/styleVariables';
import { convertTimeToAgo } from '../../core/common/commonFunction';
import likeService from '../../services/like.service';

const SinglePostScreen = ({ navigation }) => {
  const { selectedPost } = useSelector(postsSelector);

  // Lấy độ rộng mà hình
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(Dimensions.get('window').width);
  }, []);

  const dispatch = useDispatch();

  /**
   * Like/unlike bài viết
   * @param {*} postId
   */
  const actionLikePost = async (postId) => {
    const res = await likeService.action(postId);

    if (res.success) {
      dispatch(updateSelectedPost(res.data.data));
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: 64,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderBottomColor: color.other.separator,
          borderBottomWidth: 1,
          position: 'relative',
        }}
      >
        <IconButton
          icon='chevron-left'
          style={{
            margin: 0,
            backgroundColor: color.button.defaultBg,
            width: 40,
            height: 40,
          }}
          size={32}
          iconColor={color.text.prim}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
            flex: 1,
            textAlign: 'center',
            marginLeft: 12,
          }}
        >
          {postsResource.postOf + selectedPost.author.username}
        </Text>
      </View>
      <ScrollView style={{ flex: 1 }}>
        {/* Post Author */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 12,
            marginHorizontal: 16,
          }}
        >
          <Avatar.Image
            size={40}
            source={{ uri: selectedPost.author.avatar.fileLink }}
          />
          <View style={{ marginLeft: 12 }}>
            <Text style={{ fontWeight: '600', fontSize: 16 }}>
              {selectedPost.author.username}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: color.text.gray, marginRight: 4 }}>
                {convertTimeToAgo(selectedPost.createdAt)}
              </Text>
              <MaterialIcons name='public' size={14} color={color.text.gray} />
            </View>
          </View>
        </View>
        {/* Nội dung bài đăng */}
        {selectedPost.described.trim() !== '' && (
          <Text
            style={{
              color: color.text.prim,
              marginHorizontal: 16,
              marginBottom: 8,
              fontSize: 16,
            }}
          >
            {selectedPost.described}
          </Text>
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
            {selectedPost.like.length > 0 && (
              <Text style={{ fontSize: 16, color: color.text.gray }}>
                <AntDesign
                  name='like1'
                  size={14}
                  color={color.text.white}
                  style={{
                    borderRadius: 50,
                    backgroundColor: color.main.prim,
                    padding: 4,
                    marginRight: 4,
                  }}
                />
                {selectedPost.like.length}
              </Text>
            )}
          </View>
          <Text style={{ color: color.text.gray, fontSize: 16 }}>
            {selectedPost.countComments > 0
              ? selectedPost.countComments + postsResource.comments
              : ''}
          </Text>
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
            onPress={() => actionLikePost(selectedPost._id)}
          >
            <AntDesign
              name={!selectedPost.isLike ? 'like2' : 'like1'}
              size={24}
              color={!selectedPost.isLike ? color.text.prim : color.text.second}
            />
            <Text
              style={{
                marginLeft: 4,
                marginTop: 4,
                fontSize: 16,
                color: !selectedPost.isLike
                  ? color.text.prim
                  : color.text.second,
              }}
            >
              {postsResource.like}
            </Text>
          </TouchableOpacity>
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
              color={color.text.prim}
            />
            <Text style={{ marginLeft: 4, marginTop: 4, fontSize: 16 }}>
              {postsResource.comment}
            </Text>
          </View>
        </View>
        <Divider style={{ height: 2 }} />
        {selectedPost.images.map((image, i) => {
          const [w, setW] = useState(0);
          const [h, setH] = useState(0);
          Image.getSize(image.fileLink, (width, height) => {
            setW(width);
            setH(height);
          });

          return (
            <TouchableOpacity
              activeOpacity={1}
              key={i}
              onPress={() => {
                dispatch(setImageSortOrder(i));
                navigation.navigate('PostImageDetailScreen');
              }}
              style={{
                marginBottom: 16,
              }}
            >
              <Image
                source={{ uri: image.fileLink }}
                style={{
                  width: width,
                  height: (width * h) / w,
                }}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default SinglePostScreen;
