import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Avatar, Button, Divider, IconButton, Text } from 'react-native-paper';
import logo from '../../../assets/images/facebook-logo.png';
import { color } from '../../core/common/styleVariables';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../store/reducers/auth.reducer';
import { postsResource } from '../../resources';
import {
  getListPost,
  postsSelector,
  setSelectedPost,
} from '../../store/reducers/posts.reducer';
import { SinglePost } from '../../components';

const HomeScreen = ({ navigation }) => {
  const { user, userToken } = useSelector(authSelector);
  const { lstPost } = useSelector(postsSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListPost(userToken));
  }, [dispatch]);

  // Lấy độ rộng mà hình
  const [screenWidth, setScreenWidth] = useState(0);
  useEffect(() => {
    setScreenWidth(Dimensions.get('window').width - 24);
  }, []);

  const imageClick = (post) => {
    dispatch(setSelectedPost(post));
    navigation.navigate('SinglePostScreen');
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
              onPress={{}}
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
              onPress={() => navigation.navigate('PostDetailScreen')}
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
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
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
