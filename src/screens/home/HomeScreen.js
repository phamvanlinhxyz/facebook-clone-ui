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
  setSelectedPost,
} from '../../store/reducers/posts.reducer';
import { Popup, PostMenu, SinglePost } from '../../components';
import { setEditmode } from '../../store/reducers/app.reducer';
import { enumEditMode } from '../../core/common/enum';
import postsService from '../../services/posts.service';

const HomeScreen = ({ navigation }) => {
  // Lấy dữ liệu từ store
  const { user, userToken } = useSelector(authSelector);
  const { lstPost, selectedPost } = useSelector(postsSelector);

  // Usestate
  const [isShowMenu, setIsShowMenu] = useState(false);

  // Show model confirm xóa
  const [isShowModal, setIsShowModal] = useState(false);

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

  /**
   * Sự kiện click vào ảnh
   * @param {*} post
   */
  const imageClick = (post) => {
    dispatch(setSelectedPost(post));
    navigation.navigate('SinglePostScreen');
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
              style={{ backgroundColor: color.iconButtonBg }}
              iconColor={color.textPrim}
            />
            <IconButton
              icon='facebook-messenger'
              onPress={{}}
              style={{ backgroundColor: color.iconButtonBg }}
              iconColor={color.textPrim}
            />
          </View>
        </View>
        <ScrollView style={{ flex: 1 }}>
          {/* Post bài mới */}
          <View
            style={{ marginHorizontal: 12, marginTop: 8, flexDirection: 'row' }}
          >
            <Avatar.Image size={40} source={user.avatar.fileLink} />
            <Button
              style={styles.postButton}
              textColor={color.textPrim}
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
      <Popup
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
