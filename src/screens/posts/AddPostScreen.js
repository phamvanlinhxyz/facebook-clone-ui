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
import { enumFileType } from '../../core/common/enum';
import postsService from '../../services/posts.service';
import loadingImg from '../../../assets/images/loading.gif';
import { insertNewPost } from '../../store/reducers/posts.reducer';

const AddPostScreen = ({ navigation }) => {
  // Hooks
  const { user } = useSelector(authSelector);
  const videoRef = useRef(null);

  // Lấy độ rộng mà hình
  const [screenWidth, setScreenWidth] = useState(0);
  useEffect(() => {
    setScreenWidth(Dimensions.get('window').width - 24);
  }, []);

  // Set số lượng, list ảnh, video
  const limitImage = 4;
  const [totalImage, setTotalImage] = useState(0);
  const [lstImage, setLstImage] = useState([]);
  const [video, setVideo] = useState(null);

  // Nội dung bài viết
  const [described, setDescribed] = useState('');

  // Trạng thái loading
  const [loading, setLoading] = useState(false);

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
      setVideo(result.assets[0].uri);
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
        setLstImage((prev) => [...prev, ...result.assets.map((i) => i.uri)]);
      }
    }
  };

  /**
   * Xử lý gỡ ảnh đã chọn
   */
  const removeImage = (index) => {
    setLstImage((prev) => {
      return prev.filter((img, i) => i !== index);
    });
    setTotalImage((prev) => prev - 1);
  };

  /**
   * Xử lý thêm bài đăng
   */
  const handleCreatePost = async () => {
    setLoading(true);
    let postBody = {
      described: described.trim(),
      images: [],
      video: null,
    };
    // Upload ảnh lên firebase
    if (lstImage.length > 0) {
      for (let image of lstImage) {
        const uploadImage = await uploadFileToFirebase(
          image,
          enumFileType.image
        );
        if (uploadImage) {
          postBody.images.push(uploadImage);
        }
      }
    }
    // Upload video lên firebase
    if (video) {
      const uploadVideo = await uploadFileToFirebase(video, enumFileType.video);
      if (uploadVideo) {
        postBody.video = uploadVideo;
      }
    }

    // Đăng bài
    const res = await postsService.create(postBody);
    setLoading(false);
    // Nếu thành công thì thêm vào list
    if (res.success) {
      dispatch(insertNewPost(res.data.data));
    }
    // Về trang chủ
    navigation.navigate('HomeScreen');
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
            navigation.goBack();
          }}
        />
        <Appbar.Content style={{ flex: 1 }} title={postsResource.createPost} />
        <Button
          style={styles.postButton}
          textColor={color.textPrim}
          onPress={handleCreatePost}
        >
          {postsResource.post}
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
            <MaterialIcons name='public' size={16} color={color.textPrim} />
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
          outlineColor={color.inputBg}
          activeOutlineColor={color.inputBg}
          value={described}
          onChangeText={setDescribed}
        />
        {/* Ảnh nếu có */}
        {lstImage.length > 0 && (
          <View style={{ flexDirection: 'row', marginTop: 12 }}>
            {lstImage.map((img, index) => {
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
                    onPress={() => removeImage(index)}
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
        {video && (
          <View style={{ position: 'relative', marginTop: 12 }}>
            {/* Icon gỡ video */}
            <IconButton
              icon='close'
              style={[styles.iconRemove, { top: -8, right: -8 }]}
              size={18}
              onPress={() => setVideo(null)}
            />
            <Video
              ref={videoRef}
              source={{
                uri: video,
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
          textColor={color.textPrim}
          contentStyle={{ justifyContent: 'flex-start' }}
          labelStyle={{ fontSize: 16 }}
          onPress={pickImage}
          disabled={totalImage >= limitImage || video}
          icon='image'
        >
          {postsResource.image}
        </Button>
        <Button
          style={styles.postFooterButton}
          textColor={color.textPrim}
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
          textColor={color.textPrim}
          contentStyle={{ justifyContent: 'flex-start' }}
          labelStyle={{ fontSize: 16 }}
          icon='emoticon'
        >
          {postsResource.emo}
        </Button>
      </View>
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
    display: 'flex',
    marginLeft: 4,
  },
  postContent: {
    backgroundColor: color.inputBg,
    borderWidth: 0,
    borderRadius: 8,
  },
  postButtonGroup: {
    position: 'absolute',
    padding: 12,
    backgroundColor: color.inputBg,
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
    backgroundColor: color.iconButtonBg,
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
    backgroundColor: color.bgOpacity,
  },
});

export default AddPostScreen;
