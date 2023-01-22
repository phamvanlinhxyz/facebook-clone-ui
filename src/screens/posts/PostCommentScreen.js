import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, TouchableOpacity, View } from 'react-native';
import { postsResource } from '../../resources';
import { BHeader, BSkeleton, SingleComment } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import {
  postsSelector,
  updateSelectedPost,
} from '../../store/reducers/posts.reducer';
import commentService from '../../services/comment.service';
import { Text, TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { color } from '../../core/common/styleVariables';
import { getSocket } from '../../core/common/commonFunction';
import { authSelector } from '../../store/reducers/auth.reducer';
import { enumNotificationType } from '../../core/common/enum';

/**
 * Màn hình comment bài viết
 * @param {*} param0
 * @returns
 */
const PostCommentScreen = ({ navigation }) => {
  // Dispath
  const dispatch = useDispatch();

  // Selector
  const { selectedPost } = useSelector(postsSelector);
  const { userToken, user } = useSelector(authSelector);

  // Vị trí lấy paging comment
  const [offset, setOffset] = useState(0);
  // Danh sách comment
  const [lstComment, setLstComment] = useState([]);
  // Trạng thái load comment
  const [loadingComment, setLoadingComment] = useState(true);
  // Nội dung comment
  const [commentContent, setCommentContent] = useState(''); // Nội dung comment

  // Bắt sự thay đổi của offset để lấy thêm comment
  useEffect(() => {
    getComments();
  }, [offset]);

  // Lấy comment
  const getComments = async () => {
    setLoadingComment(true);
    const res = await commentService.list(selectedPost._id, offset);
    if (res.success) {
      setLstComment((prev) => [...prev, ...res.data.data]);
    }
    setLoadingComment(false);
  };

  // Lấy thêm bình luận
  const handleLoadMore = () => {
    setOffset(lstComment.length);
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

  // Chiều cao màn hình
  const [scrHeigt, setScrHeight] = useState(0);
  useEffect(() => {
    setScrHeight(Dimensions.get('window').height);
  }, []);

  return (
    <View style={{ height: scrHeigt }}>
      <BHeader
        title={postsResource.comment}
        rightBtn={[
          { text: postsResource.done, onPress: () => navigation.goBack() },
        ]}
      />
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: 16,
          paddingTop: 12,
          marginBottom: 56,
        }}
      >
        {/* Danh sách comment */}
        {lstComment && lstComment.length > 0
          ? lstComment.map((cmt, i) => {
              return <SingleComment cmt={cmt} key={i} />;
            })
          : null}
        {/* Sekeleton */}
        {loadingComment ? (
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
        {/* Load thêm bl */}
        {!loadingComment && lstComment.length < selectedPost.countComments ? (
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

export default PostCommentScreen;
