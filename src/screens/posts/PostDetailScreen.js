import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, TouchableOpacity, View } from 'react-native';
import { Avatar, Text, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Header, PostImages, SingleComment, Skeleton } from '../../components';
import { convertTimeToAgo } from '../../core/common/commonFunction';
import { color } from '../../core/common/styleVariables';
import { postsResource } from '../../resources';
import {
  postsSelector,
  setImageSortOrder,
  updateSelectedPost,
} from '../../store/reducers/posts.reducer';
import { MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import commentService from '../../services/comment.service';

/**
 * Màn hình chi tiết bài viết: mô tả, ảnh, video, bình luận,...
 * @param {*} param0
 * @returns
 */
const PostDetailScreen = ({ navigation }) => {
  const { selectedPost } = useSelector(postsSelector);
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
  const [loadingCmt, setLoadingCmt] = useState(true);

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

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <Header
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
              width: screenWidth / 2,
              justifyContent: 'center',
              paddingVertical: 8,
            }}
            activeOpacity={1}
            onPress={{}}
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
              <Skeleton style={{ width: 40, height: 40, borderRadius: 20 }} />
              <Skeleton
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
            <TouchableOpacity activeOpacity={1} onPress={handleLoadMore}>
              <Text style={{ fontSize: 16 }}>{postsResource.seeMore}</Text>
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
