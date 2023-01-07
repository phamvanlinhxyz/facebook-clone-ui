import React, { useEffect, useState } from 'react';
import { Dimensions, Image, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {
  convertNumber,
  convertTimeToAgo,
  getSocket,
} from '../../core/common/commonFunction';
import { color } from '../../core/common/styleVariables';
import {
  postsSelector,
  setImageSortOrder,
  updateSelectedPost,
} from '../../store/reducers/posts.reducer';
import { MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import { postsResource } from '../../resources';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GestureRecognizer from 'react-native-swipe-gestures';
import likeService from '../../services/like.service';
import { authSelector } from '../../store/reducers/auth.reducer';
import { enumNotificationType } from '../../core/common/enum';

/**
 * Trang chi tiết từng ảnh của bài post
 * @returns
 */
const PostImageDetailScreen = ({ navigation }) => {
  const { selectedPost, imageSortOrder } = useSelector(postsSelector);
  const { user, userToken } = useSelector(authSelector);

  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const [readAll, setReadAll] = useState(selectedPost.described.length < 135);
  const [showInfo, setShowInfo] = useState(true);
  const [socket, setSocket] = useState(null);

  // Khi render ra screen thì lấy width và height
  useEffect(() => {
    let screen = Dimensions.get('window');
    setScreenWidth(screen.width);
    setScreenHeight(screen.height);
  }, []);

  useEffect(() => {
    setSocket(getSocket());
  }, [getSocket()]);

  const dispatch = useDispatch();

  /**
   * Sự kiện vuốt sang phải
   */
  const handleSwipeRight = () => {
    if (imageSortOrder > 0) {
      dispatch(setImageSortOrder(imageSortOrder - 1));
    }
  };

  /**
   * Sự kiện vuốt sang trái
   */
  const handleSwipeLeft = () => {
    if (imageSortOrder < selectedPost.images.length - 1) {
      dispatch(setImageSortOrder(imageSortOrder + 1));
    }
  };

  /**
   * Like/unlike bài viết
   * @param {*} postId
   */
  const actionLikePost = async (post) => {
    const res = await likeService.action(post._id);

    if (res.success) {
      dispatch(updateSelectedPost(res.data.data));

      if (res.data.data.isLike && post.author._id !== user._id) {
        socket.emit('pushNotification', {
          token: userToken,
          receiverId: post.author._id,
          type: enumNotificationType.like,
          refId: post._id,
        });
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{ flex: 1, backgroundColor: color.other.imageBg }}
        activeOpacity={1}
        onPress={() => {}}
      >
        <GestureRecognizer
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
          config={{
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80,
          }}
          style={{
            flex: 1,
          }}
        >
          <Image
            source={{ uri: selectedPost.images[imageSortOrder].fileLink }}
            style={{ height: screenHeight, width: screenWidth }}
            resizeMode='contain'
          />
        </GestureRecognizer>
      </TouchableOpacity>
      {/* Header gồm nút x và stt ảnh */}
      {showInfo && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            zIndex: 2,
            paddingVertical: 12,
            paddingHorizontal: 16,
            width: screenWidth,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <IconButton
            icon='close'
            style={{
              backgroundColor: color.button.defaultBg,
              width: 28,
              height: 28,
              margin: 0,
            }}
            size={24}
            onPress={() => navigation.goBack()}
          />
          {selectedPost.images.length > 1 ? (
            <Text style={{ color: color.text.gray, fontSize: 20 }}>
              {imageSortOrder + 1}/{selectedPost.images.length}
            </Text>
          ) : null}
        </View>
      )}
      {/* Hiển thị mô tả và người đăng bài */}
      {showInfo && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: screenWidth,
            paddingHorizontal: 16,
            paddingTop: 12,
            zIndex: 2,
            backgroundColor: color.other.opacityBg,
          }}
        >
          <Text
            style={{
              fontWeight: '600',
              fontSize: 16,
              color: color.text.white,
              marginBottom: 4,
            }}
          >
            {selectedPost.author.username}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <Text style={{ color: color.text.gray, marginRight: 4 }}>
              {convertTimeToAgo(selectedPost.createdAt)}
            </Text>
            <MaterialIcons name='public' size={14} color={color.text.gray} />
          </View>
          {/* Nội dung bài đăng */}
          {selectedPost.described.trim() !== '' && (
            <Text
              style={{
                color: color.text.white,
                marginBottom: 8,
                fontSize: 16,
              }}
              onPress={() => {
                if (selectedPost.described.length > 135) {
                  setReadAll((prev) => !prev);
                }
              }}
            >
              {readAll
                ? selectedPost.described
                : selectedPost.described.toString().slice(0, 135) + '...'}
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
                <Text style={{ fontSize: 16, color: color.text.white }}>
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
                  {convertNumber(selectedPost.like.length)}
                </Text>
              )}
            </View>
            <Text style={{ color: color.text.white, fontSize: 16 }}>
              {selectedPost.countComments > 0
                ? convertNumber(selectedPost.countComments) +
                  postsResource.comments
                : ''}
            </Text>
          </View>
          {/* Like, Bình luận */}
          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: color.other.separator,
              marginTop: 8,
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: screenWidth / 2 - 16,
                justifyContent: 'center',
                paddingVertical: 8,
              }}
              activeOpacity={1}
              onPress={() => actionLikePost(selectedPost)}
            >
              <AntDesign
                name={!selectedPost.isLike ? 'like2' : 'like1'}
                size={24}
                color={
                  !selectedPost.isLike ? color.text.white : color.text.second
                }
              />
              <Text
                style={{
                  marginLeft: 4,
                  marginTop: 4,
                  fontSize: 16,
                  color: !selectedPost.isLike
                    ? color.text.white
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
                width: screenWidth / 2 - 16,
                justifyContent: 'center',
                paddingVertical: 8,
              }}
            >
              <Ionicons
                name='ios-chatbubble-outline'
                size={24}
                color={color.text.white}
              />
              <Text
                style={{
                  marginLeft: 4,
                  marginTop: 4,
                  fontSize: 16,
                  color: color.text.white,
                }}
              >
                {postsResource.comment}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default PostImageDetailScreen;
