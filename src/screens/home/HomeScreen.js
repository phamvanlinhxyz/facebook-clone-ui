import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Avatar, Button, IconButton, Text } from 'react-native-paper';
import logo from '../../../assets/images/facebook-logo.png';
import { color } from '../../core/common/styleVariables';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../store/reducers/auth.reducer';
import { postsResource } from '../../resources';
import {
  deletePost,
  getListPost,
  postsSelector,
  setImageSortOrder,
  setSelectedPost,
  updateSelectedPost,
} from '../../store/reducers/posts.reducer';
import { BPopup, PostMenu, SinglePost } from '../../components';
import { setEditmode } from '../../store/reducers/app.reducer';
import { enumEditMode, enumNotificationType } from '../../core/common/enum';
import postsService from '../../services/posts.service';
import likeService from '../../services/like.service';
import { getSocket } from '../../core/common/commonFunction';

const HomeScreen = ({ navigation }) => {
  // Lấy dữ liệu từ store
  const { user, userToken } = useSelector(authSelector);
  const { lstPost, selectedPost } = useSelector(postsSelector);

  // Usestate
  const [isShowMenu, setIsShowMenu] = useState(false);

  // Show model confirm xóa
  const [isShowModal, setIsShowModal] = useState(false);

  // Socket
  const [socket, setSocket] = useState(null);

  // Dispatch
  const dispatch = useDispatch();

  // Lấy danh sách bài đăng
  useEffect(() => {
    dispatch(getListPost(userToken));
  }, [dispatch]);

  // Lấy độ rộng mà hình
  const [screenWidth, setScreenWidth] = useState(0);
  useEffect(() => {
    setScreenWidth(Dimensions.get('window').width - 24);
  }, []);

  useEffect(() => {
    setSocket(getSocket());
  }, [getSocket()]);

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
   * Chọn sửa bài viết từ menu
   */
  const editPostClick = () => {
    setIsShowMenu(false);
    navigation.navigate('EditPostScreen');
  };

  /**
   * Chọn chuyển bài viết vào thùng rác
   */
  const deletePostClick = async () => {
    setIsShowMenu(false);
    const res = await postsService.deletePost(selectedPost._id);
    if (res.success) {
      dispatch(deletePost(res.data.data));
    }
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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {/* Appbar */}
        <View
          style={{
            height: 64,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 12,
          }}
        >
          <Image source={logo} style={{ height: 60, width: 120 }} />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <IconButton
              icon='magnify'
              onPress={() => navigation.navigate('SearchScreen')}
              style={{ backgroundColor: color.button.defaultBg }}
              iconColor={color.text.prim}
            />
            <IconButton
              icon='facebook-messenger'
              onPress={{}}
              style={{ backgroundColor: color.button.defaultBg }}
              iconColor={color.text.prim}
            />
          </View>
        </View>
        <ScrollView style={{ flex: 1 }}>
          {/* Post bài mới */}
          <View
            style={{ marginHorizontal: 12, marginTop: 8, flexDirection: 'row' }}
          >
            <Avatar.Image size={40} source={{ uri: user.avatar.fileLink }} />
            <Button
              style={styles.postButton}
              textColor={color.text.prim}
              contentStyle={{ justifyContent: 'flex-start' }}
              labelStyle={{ fontSize: 16 }}
              onPress={() => navigation.navigate('AddPostScreen')}
            >
              {postsResource.postPlaceholder}
            </Button>
          </View>
          {/* List post */}
          <View style={{ marginTop: 12 }}>
            {lstPost.map((post, i) => {
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
        </ScrollView>
      </View>
      {isShowMenu && (
        <PostMenu
          toggleMenu={toggleMenu}
          editPost={editPostClick}
          deletePost={() => {
            setIsShowMenu(false);
            setIsShowModal(true);
          }}
        />
      )}
      <BPopup
        show={isShowModal}
        title={postsResource.confirmDeleteTitle}
        content={postsResource.confirmDeleteContent}
        confirm={() => {
          deletePostClick();
          setIsShowModal(false);
        }}
        cancel={() => {
          setIsShowModal(false);
        }}
        resource={{
          confirm: postsResource.confirmDeleteConfirm,
          cancel: postsResource.confirmDeleteCancel,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  postButton: {
    width: '100%',
    borderRadius: 6,
    flex: 1,
    marginLeft: 8,
  },
});

export default HomeScreen;
