import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, TouchableOpacity, View } from 'react-native';
import { Avatar, Text, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {
  BHeader,
  PostImages,
  SingleComment,
  BSkeleton,
} from '../../components';
import { convertTimeToAgo, getSocket } from '../../core/common/commonFunction';
import { color } from '../../core/common/styleVariables';
import { postsResource } from '../../resources';
import {
  postsSelector,
  setImageSortOrder,
  updateSelectedPost,
} from '../../store/reducers/posts.reducer';
import { MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import commentService from '../../services/comment.service';
import { authSelector } from '../../store/reducers/auth.reducer';
import { enumNotificationType } from '../../core/common/enum';
import likeService from '../../services/like.service';

/**
 * Màn hình chi tiết bài viết: mô tả, ảnh, video, bình luận,...
 * @param {*} param0
 * @returns
 */
const PostDetailScreen = ({ navigation }) => {
  const { selectedPost } = useSelector(postsSelector);
  const { userToken, user } = useSelector(authSelector);
  const [readAll, setReadAll] = useState(selectedPost.described.length < 150);
  const videoRef = useRef(null);
  const dispatch = useDispatch();

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
    if (post.images.length === 1) {
      dispatch(setImageSortOrder(0));
      navigation.navigate('PostImageDetailScreen');
    } else {
      navigation.navigate('SinglePostScreen');
    }
  };

  //#region Comment

  const [cmtOffset, setCmtOffset] = useState(0); // Vị trí lấy paging cmt
  const [lstComment, setLstComment] = useState([]); // Danh sách cmt
  const [commentContent, setCommentContent] = useState(''); // Nội dung comment
  const [loadingCmt, setLoadingCmt] = useState(true); // Load comment

  const commentInputRef = useRef(null);

  // Lấy comment
  const getComments = async () => {
    setLoadingCmt(true);
    const res = await commentService.list(selectedPost._id, cmtOffset);
    if (res.success) {
      setLstComment((prev) => [...prev, ...res.data.data]);
    }
    setLoadingCmt(false);
  };

  // Thêm comment
  const postComment = async () => {
    const res = await commentService.create(
      {
        content: commentContent,
        commentAnswered: null,
      },
      selectedPost._id
    );

    if (res.success) {
      setLstComment((prev) => [res.data.data, ...prev]);
      dispatch(updateSelectedPost(res.data.post));
      // Bắn sóc két cho chủ bài viết
      if (user._id !== selectedPost.author._id) {
        pushNotificationAfterComment();
      }
    }
  };

  // Sự kiện khi ấn lấy thêm comment
  const handleLoadMore = () => {
    setCmtOffset(lstComment.length);
  };

  // Khi thay đổi offset thì lấy comment
  useEffect(() => {
    getComments();
  }, [cmtOffset]);

  //#endregion

  //#region Socket

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!socket) {
      setSocket(getSocket());
    }
  }, []);

  const pushNotificationAfterComment = () => {
    socket.emit('pushNotification', {
      token: userToken,
      receiverId: selectedPost.author._id,
      type: enumNotificationType.comment,
      refId: selectedPost._id,
    });
  };

  //#endregion

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
    <View style={{ flex: 1, position: 'relative' }}>
      <BHeader
        leftBtn={[{ icon: 'chevron-left', onPress: () => navigation.goBack() }]}
        title={postsResource.postOf + selectedPost.author.username}
      />
      <ScrollView style={{ flex: 1, marginBottom: 56 }}>
        {/* Post Author */}
        <View
          style={{ flexDirection: 'row', alignItems: 'center', margin: 12 }}
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
          <View style={{ flex: 1 }}></View>
        </View>
        {/* Nội dung bài đăng */}
        {selectedPost.described.trim() !== '' && (
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
              ? selectedPost.described
              : selectedPost.described.toString().slice(0, 150) + '...'}
          </Text>
        )}
        {/* Hiển thị ảnh */}
        {selectedPost.images.length > 0 && (
          <PostImages
            images={selectedPost.images}
            width={screenWidth}
            imageClick={imageClick}
            post={selectedPost}
          />
        )}
        {/* Hiển thị video */}
        {selectedPost.videos && (
          <Video
            ref={videoRef}
            source={{
              uri: selectedPost.videos.fileLink,
            }}
            style={{ borderRadius: 6, marginHorizontal: 12 }}
            videoStyle={{
              position: 'relative',
              height: screenWidth * 0.5625,
            }}
            useNativeControls
            resizeMode='contain'
            isLooping
          />
        )}
        {/* Like, Bình luận */}
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: color.other.separator,
            borderBottomWidth: 1,
            borderBottomColor: color.other.separator,
            marginHorizontal: 12,
            marginTop: 8,
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: screenWidth / 2,
              justifyContent: 'center',
              paddingVertical: 8,
            }}
            activeOpacity={1}
            onPress={() => actionLikePost(selectedPost)}
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
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: screenWidth / 2,
              justifyContent: 'center',
              paddingVertical: 8,
            }}
            activeOpacity={1}
            onPress={() => {
              commentInputRef.current.focus();
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
          </TouchableOpacity>
        </View>
        {/* Bình luận */}
        <View style={{ padding: 12 }}>
          {lstComment && lstComment.length > 0
            ? lstComment.map((cmt, i) => {
                return <SingleComment cmt={cmt} key={i} />;
              })
            : null}
          {/* Sekeleton */}
          {loadingCmt ? (
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <BSkeleton style={{ width: 40, height: 40, borderRadius: 20 }} />
              <BSkeleton
                style={{
                  height: 52,
                  flex: 1,
                  marginLeft: 8,
                  borderRadius: 12,
                }}
              />
            </View>
          ) : null}
          {/* Load thêm bình luận */}
          {!loadingCmt && lstComment.length < selectedPost.countComments ? (
            <TouchableOpacity
              activeOpacity={1}
              onPress={handleLoadMore}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: color.text.gray,
                }}
              >
                {postsResource.seeMore}
              </Text>
              <Text style={{ fontSize: 16, color: color.text.gray }}>
                {lstComment.length}/{selectedPost.countComments}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          paddingHorizontal: 16,
          paddingVertical: 8,
          width: '100%',
          bottom: 0,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: color.button.defaultBg,
            alignItems: 'center',
            borderRadius: 100,
          }}
        >
          <TextInput
            underlineColorAndroid={color.transparent}
            activeUnderlineColor={color.transparent}
            underlineColor={color.transparent}
            style={{
              height: 40,
              backgroundColor: color.transparent,
              flex: 1,
            }}
            placeholder={postsResource.writeComment}
            value={commentContent}
            onChangeText={setCommentContent}
            ref={commentInputRef}
          />
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              if (commentContent.trim() !== '') {
                postComment();
                setCommentContent('');
              }
            }}
          >
            <Ionicons
              name='md-paper-plane'
              size={24}
              color={color.text.gray}
              style={{ paddingVertical: 6, paddingRight: 12 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PostDetailScreen;
