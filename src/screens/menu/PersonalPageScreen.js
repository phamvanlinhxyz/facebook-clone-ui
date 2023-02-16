import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { BHeader, PersonalPageButton, SinglePost } from '../../components';
import { color } from '../../core/common/styleVariables';
import { authSelector } from '../../store/reducers/auth.reducer';
import {
  friendSelector,
  setUserSelected,
} from '../../store/reducers/friend.reducer';
import friendService from '../../services/friend.service';
import {
  setImageSortOrder,
  setSelectedPost,
  updateSelectedPost,
} from '../../store/reducers/posts.reducer';
import { setEditmode } from '../../store/reducers/app.reducer';
import likeService from '../../services/like.service';
import { getSocket } from '../../core/common/commonFunction';

const PersonalPageScreen = ({ navigation }) => {
  const { user } = useSelector(authSelector);
  const { userSelected } = useSelector(friendSelector);

  // Usestate
  const [isShowMenu, setIsShowMenu] = useState(false);

  // Lấy độ rộng mà hình
  const [screenWidth, setScreenWidth] = useState(0);
  useEffect(() => {
    setScreenWidth(Dimensions.get('window').width - 24);
  }, []);

  // Socket
  const [socket, setSocket] = useState(null);

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    getUserInfo();
  }, [userSelected]);

  useEffect(() => {
    setSocket(getSocket());
  }, [getSocket()]);

  const getUserInfo = async () => {
    const res = await friendService.getUserInfo(userSelected);
    setUserInfo(res.data);
  };

  const dispatch = useDispatch();

  /**
   * Sự kiện click vào ảnh
   * @param {*} post
   */
  const imageClick = (post) => {
    dispatch(setSelectedPost(post));
    if (post.images.length === 1) {
      dispatch(setImageSortOrder(0));
      navigation.navigate('PostImageDetailScreen');
    } else {
      navigation.navigate('SinglePostScreen');
    }
  };

  /**
   * Mở menu chọn sửa, xóa
   * @param {*} post
   */
  const toggleMenu = (post) => {
    // Set bài viết được chọn và editMode
    if (!isShowMenu) {
      dispatch(setEditmode(enumEditMode.edit));
      dispatch(setSelectedPost(post));
    }
    // Hiển thị menu
    setIsShowMenu((prev) => !prev);
  };

  /**
   * Show chi tiết bài viết: mô tả, ảnh, comment...
   */
  const showPostDetail = (post) => {
    dispatch(setSelectedPost(post));
    navigation.navigate('PostDetailScreen');
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
    <>
      {userInfo ? (
        <View style={{ flex: 1 }}>
          <BHeader
            leftBtn={[
              { icon: 'chevron-left', onPress: () => navigation.goBack() },
            ]}
            title={userInfo.info.username}
          />
          <ScrollView>
            <View style={{ position: 'relative' }}>
              <View
                style={{ height: 200, backgroundColor: color.other.secondBg }}
              >
                {userInfo.info.coverImage ? (
                  <Image
                    style={{ height: '100%' }}
                    source={{ uri: userInfo.info.fileLink }}
                  />
                ) : null}
              </View>
              <Image
                style={{
                  position: 'absolute',
                  bottom: -32,
                  height: 160,
                  width: 160,
                  left: 8,
                  borderRadius: 100,
                  borderColor: color.other.primBg,
                  borderWidth: 4,
                }}
                source={{ uri: userInfo.info.avatar.fileLink }}
              />
            </View>
            <View style={{ marginTop: 32, padding: 16 }}>
              <Text style={{ fontSize: 24, fontWeight: '600' }}>
                {userInfo.info.username}
              </Text>
              <PersonalPageButton
                status={userInfo.friendStatus}
                id={userSelected}
              />
            </View>
            <Divider
              style={{ height: 4, backgroundColor: color.other.separator }}
            />
            {/* Danh sách bạn bè */}
            {userInfo.lstFriend && userInfo.lstFriend.length > 0 ? (
              <View style={{ padding: 12 }}>
                <Text style={{ fontSize: 20, fontWeight: '600', padding: 4 }}>
                  Bạn bè
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}
                >
                  {userInfo.lstFriend.map((fr) => {
                    return (
                      <TouchableOpacity
                        key={fr._id}
                        style={{
                          width: screenWidth / 3,
                          padding: 4,
                        }}
                        activeOpacity={1}
                        onPress={() => {
                          dispatch(setUserSelected(fr._id));
                          navigation.navigate('PersonalPageScreen');
                        }}
                      >
                        <Image
                          source={{ uri: fr.avatar.fileLink }}
                          style={{
                            width: '100%',
                            height: screenWidth / 3 - 8,
                            borderRadius: 4,
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: '600',
                            paddingTop: 8,
                            paddingBottom: 12,
                            paddingHorizontal: 8,
                          }}
                        >
                          {fr.username}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ) : null}
            {userInfo.lstPost && userInfo.lstPost.length > 0 ? (
              <View>
                {userInfo.lstPost.map((post, i) => {
                  return (
                    <SinglePost
                      post={post}
                      key={i}
                      width={screenWidth}
                      imageClick={imageClick}
                      toggleMenu={toggleMenu}
                      showPostDetail={showPostDetail}
                      actionLikePost={actionLikePost}
                    />
                  );
                })}
              </View>
            ) : null}
          </ScrollView>
        </View>
      ) : null}
    </>
  );
};

export default PersonalPageScreen;
