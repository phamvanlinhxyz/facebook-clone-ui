import React, { useEffect, useState } from 'react';
import { Dimensions, Image, View } from 'react-native';
import { Appbar, Avatar, Button, Divider, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { postsResource } from '../../resources';
import {
  setSelectedPost,
  postsSelector,
} from '../../store/reducers/posts.reducer';
import { MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import { color } from '../../core/common/styleVariables';
import { convertTimeToAgo } from '../../core/common/commonFunction';

const SinglePostScreen = ({ navigation }) => {
  const { selectedPost } = useSelector(postsSelector);

  // Lấy độ rộng mà hình
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(Dimensions.get('window').width - 24);
  }, []);

  return (
    <View>
      <Appbar>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content
          style={{ flex: 1 }}
          title={postsResource.postOf + selectedPost.author.username}
        />
      </Appbar>
      <Divider style={{ height: 2 }} />
      {/* Post Author */}
      <View style={{ flexDirection: 'row', alignItems: 'center', margin: 12 }}>
        <Avatar.Image size={40} source={selectedPost.author.avatar.fileLink} />
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
        >
          {selectedPost.described}
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
            <Text style={{ fontSize: 16, color: color.text.gray }}>
              <AntDesign
                name='like1'
                size={14}
                color={color.text.white}
                style={{
                  borderRadius: 50,
                  backgroundColor: color.main.prim,
                  padding: 4,
                  marginRight: 4,
                }}
              />
              {selectedPost.like.length}
            </Text>
          )}
        </View>
        <Text style={{ color: color.text.gray, fontSize: 16 }}>
          {selectedPost.countComments > 0
            ? selectedPost.countComments + postsResource.comments
            : ''}
        </Text>
      </View>
      {/* Like, Bình luận */}
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: color.other.separator,
          marginHorizontal: 12,
          marginTop: 8,
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: width / 2,
            justifyContent: 'center',
            paddingVertical: 8,
          }}
        >
          <AntDesign name='like2' size={24} color={color.text.prim} />
          <Text style={{ marginLeft: 4, marginTop: 4, fontSize: 16 }}>
            {postsResource.like}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: width / 2,
            justifyContent: 'center',
            paddingVertical: 8,
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
        </View>
      </View>
      <Divider style={{ height: 2 }} />
      {selectedPost.images.map((image, i) => {
        return (
          <Image
            source={image.fileLink}
            style={{
              height: '100%',
              width: '100%',
              marginBottom: 12,
            }}
            key={i}
          />
        );
      })}
    </View>
  );
};

export default SinglePostScreen;
