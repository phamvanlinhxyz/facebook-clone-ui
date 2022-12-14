import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { IconButton, Text, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { color } from '../../core/common/styleVariables';
import { friendResource, searchResource } from '../../resources';
import { authSelector } from '../../store/reducers/auth.reducer';
import {
  friendSelector,
  getListFriend,
  getListFriendBySearch,
  setLoadingFriend,
} from '../../store/reducers/friend.reducer';
import { Entypo } from '@expo/vector-icons';
import { Skeleton } from '../../components';

const ListFriendScreen = ({ navigation }) => {
  const [searchTxt, setSearchTxt] = useState('');
  const { userToken } = useSelector(authSelector);
  const { lstFriend, totalFriends, loadingFriend } =
    useSelector(friendSelector);
  const dispatch = useDispatch();

  /**
   * Hàm tìm kiếm
   */
  useEffect(() => {
    dispatch(
      getListFriendBySearch({ userToken: userToken, search: searchTxt })
    );
  }, [searchTxt]);

  /**
   * Lấy danh sách bạn bè paging
   */
  const loadListFriend = () => {
    if (lstFriend.length < totalFriends) {
      setTimeout(() => {
        dispatch(
          getListFriend({
            userToken: userToken,
            offset: lstFriend.length,
            searchTxt,
          })
        );
      }, 200);
    }
  };

  /**
   * Render ra thông tin bạn bè
   * @param {*} friend
   * @returns
   */
  const renderFriendData = (friend) => {
    return (
      <TouchableOpacity
        style={{
          paddingVertical: 8,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        activeOpacity={1}
      >
        <Image
          source={friend.avatar.fileLink}
          style={{ width: 60, height: 60, borderRadius: 100 }}
        />
        <View style={{ marginLeft: 12, flex: 1, justifyContent: 'center' }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: '600' }}>
              {friend.username}
            </Text>
          </View>
          {friend.mutualFriends > 0 && (
            <Text
              style={{ fontSize: 16, color: color.textSecond, marginTop: 2 }}
            >
              {friend.mutualFriends + friendResource.mutualFriends}
            </Text>
          )}
        </View>
        <Entypo
          name='dots-three-horizontal'
          size={24}
          color={color.text.gray}
        />
      </TouchableOpacity>
    );
  };

  /**
   * Render skeleton
   * @returns
   */
  const renderLoader = () => {
    return loadingFriend ? (
      <>
        <View style={{ paddingVertical: 8, flexDirection: 'row' }}>
          <Skeleton style={{ height: 60, width: 60, borderRadius: 100 }} />
          <View style={{ marginLeft: 12, flex: 1, justifyContent: 'center' }}>
            <Skeleton style={{ height: 20, borderRadius: 6 }} />
            <Skeleton style={{ marginTop: 8, height: 20, borderRadius: 6 }} />
          </View>
        </View>
        <View style={{ paddingVertical: 8, flexDirection: 'row' }}>
          <Skeleton style={{ height: 60, width: 60, borderRadius: 100 }} />
          <View style={{ marginLeft: 12, flex: 1, justifyContent: 'center' }}>
            <Skeleton style={{ height: 20, borderRadius: 6 }} />
            <Skeleton style={{ marginTop: 8, height: 20, borderRadius: 6 }} />
          </View>
        </View>
      </>
    ) : null;
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: 64,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderBottomColor: color.other.separator,
          borderBottomWidth: 1,
        }}
      >
        <IconButton
          icon='arrow-left'
          style={{ margin: 0 }}
          iconColor={color.text.prim}
          onPress={() => navigation.goBack()}
        />
        <Text style={{ fontSize: 22, flex: 1, textAlign: 'center' }}>
          {friendResource.friend}
        </Text>
        <IconButton
          icon='magnify'
          style={{ margin: 0 }}
          iconColor={color.text.prim}
          onPress={{}}
        />
      </View>
      <ScrollView style={{ flex: 1, padding: 12 }}>
        {/* Ô search */}
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: color.button.defaultBg,
            borderRadius: 100,
          }}
        >
          <IconButton
            icon='magnify'
            style={{
              backgroundColor: color.transparent,
              margin: 0,
              position: 'absolute',
            }}
            iconColor={color.text.prim}
          />
          <TextInput
            value={searchTxt}
            onChangeText={setSearchTxt}
            placeholder={friendResource.searchFriend}
            underlineColorAndroid={color.transparent}
            activeUnderlineColor={color.transparent}
            underlineColor={color.transparent}
            style={{
              backgroundColor: color.transparent,
              height: 40,
              flex: 1,
              marginLeft: 20,
            }}
            onSubmitEditing={{}}
            right={
              searchTxt ? (
                <TextInput.Icon
                  icon='close-circle'
                  onPress={() => setSearchTxt('')}
                />
              ) : null
            }
          />
        </View>
        {totalFriends > 0 && (
          <Text style={{ fontSize: 22, fontWeight: '600', paddingTop: 12 }}>
            {totalFriends + friendResource.totalFriend}
          </Text>
        )}
        <FlatList
          data={lstFriend}
          renderItem={({ item }) => renderFriendData(item)}
          keyExtractor={(item) => item._id}
          ListFooterComponent={renderLoader}
          onEndReached={loadListFriend}
          onEndReachedThreshold={0}
        />
      </ScrollView>
    </View>
  );
};

export default ListFriendScreen;
