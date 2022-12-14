import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import {
  Appbar,
  Avatar,
  Button,
  IconButton,
  Text,
  TextInput,
} from 'react-native-paper';
import { Video } from 'expo-av';
import { useDispatch, useSelector } from 'react-redux';
import { color } from '../../core/common/styleVariables';
import { postsResource } from '../../resources';
import { authSelector } from '../../store/reducers/auth.reducer';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { uploadFileToFirebase } from '../../core/common/commonFunction';
import { enumFileType, enumMediaStatus } from '../../core/common/enum';
import postsService from '../../services/posts.service';
import loadingImg from '../../../assets/images/loading.gif';
import { postsSelector, updatePost } from '../../store/reducers/posts.reducer';
import { Popup } from '../../components';

const EditPostScreen = ({ navigation }) => {
  // Hooks
  const { user } = useSelector(authSelector);
  const { selectedPost } = useSelector(postsSelector);
  const videoRef = useRef(null);

  // Lấy độ rộng mà hình
  const [screenWidth, setScreenWidth] = useState(0);
  useEffect(() => {
    setScreenWidth(Dimensions.get('window').width - 24);
  }, []);

  // Set số lượng, list ảnh
  const limitImage = 4;
  const [totalImage, setTotalImage] = useState(selectedPost.images.length);
  const [lstOldImage, setLstOldImage] = useState(selectedPost.images);
  const [lstNewImage, setLstNewImage] = useState([]);

  // Video
  const [oldVideo, setOldVideo] = useState(selectedPost.videos);
  const [newVideo, setNewVideo] = useState(null);

  // Ảnh, video bị xóa
  const [deletedDocument, setDeletedDocument] = useState([]);

  // Nội dung bài viết
  const [described, setDescribed] = useState(selectedPost.described);

  // Trạng thái loading
  const [loading, setLoading] = useState(false);

  // Show modal
  const [isShowModal, setIsShowModal] = useState(false);

  // Dispatch
  const dispatch = useDispatch();

  /**
   * Xử lý chọn video
   */
  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    });

    if (!result.canceled) {
      // Cho video cũ vào deleted
      if (oldVideo) {
        setDeletedDocument((prev) => [...prev, oldVideo]);
        setOldVideo(null);
      }
      // Gán video mới
      setNewVideo(result.assets[0].uri);
    }
  };

  /**
   * Xử lý chọn ảnh
   */
  const pickImage = async () => {
    // Chọn ảnh
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    // Nếu có chọn ảnh thì gán vào list
    if (!result.canceled) {
      if (result.assets.length > limitImage - totalImage) {
        // Check số lượng ảnh
        // ToastAndroid.show('Số lượng ảnh vượt quá 4. Vui lòng thử lại!');
      } else {
        // Set lại số lượng tổng ảnh
        setTotalImage((prev) => prev + result.assets.length);
        setLstNewImage((prev) => [...prev, ...result.assets.map((i) => i.uri)]);
      }
    }
  };

  /**
   * Xử lý gỡ ảnh đã chọn
   */
  const removeImage = (index, imageStatus, image) => {
    // Check xem ảnh cũ hay ảnh mới
    if (imageStatus === enumMediaStatus.old) {
      setDeletedDocument((prev) => [...prev, image]);
      setLstOldImage((prev) => {
        return prev.filter((img, i) => i !== index);
      });
    } else {
      setLstNewImage((prev) => {
        return prev.filter((img, i) => i !== index);
      });
    }
    // Trừ số ảnh đi 1
    setTotalImage((prev) => prev - 1);
  };

  const removeVideo = () => {
    if (oldVideo) {
      setDeletedDocument((prev) => [...prev, oldVideo]);
      setOldVideo(null);
    } else {
      setNewVideo(null);
    }
  };

  /**
   * Xử lý lưu
   */
  const handleSavePost = async () => {
    setLoading(true);
    let postBody = {
      described: described.trim(),
      oldImages: lstOldImage,
      newImages: [],
      oldVideo: oldVideo,
      newVideo: null,
      deletedDocument: deletedDocument,
      postId: selectedPost._id,
    };
    // Upload ảnh lên firebase
    if (lstNewImage.length > 0) {
      for (let image of lstNewImage) {
        const uploadImage = await uploadFileToFirebase(
          image,
          enumFileType.image
        );
        if (uploadImage) {
          postBody.newImages.push(uploadImage);
        }
      }
    }
    // Upload video lên firebase
    if (newVideo) {
      const uploadVideo = await uploadFileToFirebase(
        newVideo,
        enumFileType.video
      );
      if (uploadVideo) {
        postBody.newVideo = uploadVideo;
      }
    }

    // Đăng bài
    const res = await postsService.edit(postBody);
    // Nếu thành công thì thêm vào list
    if (res.success) {
      dispatch(updatePost(res.data.data));
    }
    setLoading(false);
    // Về trang chủ
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Loading khi ấn đăng */}
      {loading && (
        <View style={styles.loadingView}>
          <Image source={loadingImg} style={{ width: 64, height: 64 }} />
        </View>
      )}
      {/* Appbar */}
      <Appbar>
        <Appbar.BackAction
          onPress={() => {
            setIsShowModal(true);
          }}
        />
        <Appbar.Content style={{ flex: 1 }} title={postsResource.editPost} />
        <Button
          style={styles.postButton}
          textColor={color.text.prim}
          onPress={handleSavePost}
        >
          {postsResource.save}
        </Button>
      </Appbar>
      {/* Người đăng */}
      <View style={styles.postAuthor}>
        <Avatar.Image size={60} source={user.avatar.fileLink} />
        <View style={styles.authorName}>
          <Text variant='titleLarge' style={styles.username}>
            {user.username}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name='public' size={16} color={color.text.gray} />
            <Text style={styles.postSettingItem}>{postsResource.public}</Text>
          </View>
        </View>
      </View>
      {/* Phần nội dung bài đăng */}
      <View style={{ flex: 1, borderRadius: 8, marginHorizontal: 12 }}>
        {/* Nội dung text */}
        <TextInput
          multiline
          mode='outlined'
          numberOfLines={10}
          placeholder={postsResource.postPlaceholder}
          style={styles.postContent}
          outlineColor={color.transparent}
          activeOutlineColor={color.transparent}
          value={described}
          onChangeText={setDescribed}
        />
        {/* Ảnh nếu có */}
        {(lstOldImage.length > 0 || lstNewImage.length > 0) && (
          <View style={{ flexDirection: 'row', marginTop: 12 }}>
            {lstOldImage.map((img, index) => {
              return (
                <View
                  style={{
                    width: screenWidth / 4,
                    height: screenWidth / 4,
                    padding: 6,
                    position: 'relative',
                  }}
                  key={index}
                >
                  {/* Icon gỡ ảnh */}
                  <IconButton
                    icon='close'
                    style={styles.iconRemove}
                    size={18}
                    onPress={() => removeImage(index, enumMediaStatus.old, img)}
                  />
                  <Image
                    source={{ uri: img.fileLink }}
                    style={{ height: '100%', borderRadius: 6 }}
                  />
                </View>
              );
            })}
            {lstNewImage.map((img, index) => {
              return (
                <View
                  style={{
                    width: screenWidth / 4,
                    height: screenWidth / 4,
                    padding: 6,
                    position: 'relative',
                  }}
                  key={index}
                >
                  {/* Icon gỡ ảnh */}
                  <IconButton
                    icon='close'
                    style={styles.iconRemove}
                    size={18}
                    onPress={() => removeImage(index, enumMediaStatus, null)}
                  />
                  <Image
                    source={{ uri: img }}
                    style={{ height: '100%', borderRadius: 6 }}
                  />
                </View>
              );
            })}
          </View>
        )}
        {/* Video nếu có */}
        {(oldVideo || newVideo) && (
          <View style={{ position: 'relative', marginTop: 12 }}>
            {/* Icon gỡ video */}
            <IconButton
              icon='close'
              style={[styles.iconRemove, { top: -8, right: -8 }]}
              size={18}
              onPress={() => removeVideo()}
            />
            <Video
              ref={videoRef}
              source={{
                uri: oldVideo ? oldVideo.fileLink : newVideo,
              }}
              style={{ borderRadius: 8 }}
              videoStyle={{
                position: 'relative',
                height: screenWidth * 0.5625,
              }}
              useNativeControls
              resizeMode='contain'
              isLooping
            />
          </View>
        )}
      </View>
      {/* Các button thêm ảnh, video, cảm xúc */}
      <View style={styles.postButtonGroup}>
        <Button
          style={styles.postFooterButton}
          textColor={color.text.prim}
          contentStyle={{ justifyContent: 'flex-start' }}
          labelStyle={{ fontSize: 16 }}
          onPress={pickImage}
          disabled={totalImage >= limitImage || oldVideo || newVideo}
          icon='image'
        >
          {postsResource.image}
        </Button>
        <Button
          style={styles.postFooterButton}
          textColor={color.text.prim}
          contentStyle={{ justifyContent: 'flex-start' }}
          labelStyle={{ fontSize: 16 }}
          onPress={pickVideo}
          disabled={totalImage > 0}
          icon='video'
        >
          {postsResource.video}
        </Button>
        <Button
          style={styles.postFooterButton}
          textColor={color.text.prim}
          contentStyle={{ justifyContent: 'flex-start' }}
          labelStyle={{ fontSize: 16 }}
          icon='emoticon'
        >
          {postsResource.emo}
        </Button>
      </View>
      <Popup
        show={isShowModal}
        title={postsResource.confirmCancelEditTitle}
        content={postsResource.confirmCancelEditContent}
        cancel={() => {
          setIsShowModal(false);
          navigation.goBack();
        }}
        continueAction={() => {
          setIsShowModal(false);
        }}
        resource={{
          cancel: postsResource.confirmCancelEditCancel,
          continue: postsResource.continueEdit,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  postButton: {
    fontSize: 18,
    marginRight: 8,
    fontWeight: '500',
    position: 'relative',
    width: 'auto',
    borderRadius: 6,
  },
  postAuthor: {
    margin: 12,
    flexDirection: 'row',
  },
  authorName: {
    marginLeft: 12,
  },
  username: {
    marginVertical: 4,
    fontWeight: '600',
  },
  postSettingItem: {
    color: color.text.gray,
    display: 'flex',
    marginLeft: 4,
  },
  postContent: {
    backgroundColor: color.transparent,
    borderWidth: 0,
    borderRadius: 8,
  },
  postButtonGroup: {
    position: 'absolute',
    padding: 12,
    backgroundColor: color.transparent,
    width: '100%',
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    bottom: 0,
  },
  postFooterButton: {
    width: '100%',
    borderRadius: 6,
    height: 'auto',
  },
  iconRemove: {
    position: 'absolute',
    top: -4,
    right: -4,
    zIndex: 2,
    backgroundColor: color.button.defaultBg,
    width: 28,
    height: 28,
    margin: 0,
  },
  loadingView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
    backgroundColor: color.other.opacityBg,
  },
});

export default EditPostScreen;
