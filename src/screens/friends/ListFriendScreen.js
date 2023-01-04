import React, { useEffect, useRef, useState } from 'react';
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
import { friendResource } from '../../resources';
import { authSelector } from '../../store/reducers/auth.reducer';
import {
  friendSelector,
  getListFriend,
  getListFriendBySearch,
} from '../../store/reducers/friend.reducer';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { BSkeleton } from '../../components';

const ListFriendScreen = ({ navigation }) => {
  const [searchTxt, setSearchTxt] = useState('');
  const [inputTxt, setInputTxt] = useState('');
  const { userToken } = useSelector(authSelector);
  const { lstFriend, totalFriends, loadingFriend } =
    useSelector(friendSelector);
  const dispatch = useDispatch();

  /**
   * Lấy dữ liệu search
   */
  useEffect(() => {
    dispatch(
      getListFriendBySearch({ userToken: userToken, search: searchTxt })
    );
  }, [searchTxt]);

  /**
   * Lấy dữ liệu search
   */
  const timerId = useRef();
  useEffect(() => {
    timerId.current = setTimeout(() => {
      setSearchTxt(inputTxt);
    }, 1000);

    return () => {
      if (timerId.current) clearTimeout(timerId.current);
    };
  }, [inputTxt]);

  /**
   * Lấy danh sách bạn bè paging
   */
  const loadListFriend = () => {
    if (lstFriend.length < totalFriends) {
      dispatch(
        getListFriend({
          userToken: userToken,
          offset: lstFriend.length,
          searchTxt,
        })
      );
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
          paddingHorizontal: 16,
        }}
        activeOpacity={1}
      >
        <Image
          source={{ uri: friend.avatar.fileLink }}
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
      <View style={{ paddingHorizontal: 16 }}>
        <View style={{ paddingVertical: 8, flexDirection: 'row' }}>
          <BSkeleton style={{ height: 60, width: 60, borderRadius: 100 }} />
          <View style={{ marginLeft: 12, flex: 1, justifyContent: 'center' }}>
            <BSkeleton style={{ height: 20, borderRadius: 6 }} />
            <BSkeleton style={{ marginTop: 8, height: 20, borderRadius: 6 }} />
          </View>
        </View>
        <View style={{ paddingVertical: 8, flexDirection: 'row' }}>
          <BSkeleton style={{ height: 60, width: 60, borderRadius: 100 }} />
          <View style={{ marginLeft: 12, flex: 1, justifyContent: 'center' }}>
            <BSkeleton style={{ height: 20, borderRadius: 6 }} />
            <BSkeleton style={{ marginTop: 8, height: 20, borderRadius: 6 }} />
          </View>
        </View>
      </View>
    ) : null;
  };

  const headerFlatList = () => {
    return (
      <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
        {totalFriends > 0 && (
          <Text style={{ fontSize: 22, fontWeight: '600' }}>
            {totalFriends + friendResource.totalFriend}
          </Text>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: 64,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderBottomColor: color.other.separator,
          borderBottomWidth: 1,
          position: 'relative',
        }}
      >
        <IconButton
          icon='chevron-left'
          style={{
            margin: 0,
            backgroundColor: color.button.defaultBg,
            position: 'absolute',
            left: 16,
            width: 40,
            height: 40,
          }}
          size={32}
          iconColor={color.text.prim}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
            flex: 1,
            textAlign: 'center',
          }}
        >
          {friendResource.friend}
        </Text>
        <IconButton
          icon='magnify'
          style={{
            margin: 0,
            backgroundColor: color.button.defaultBg,
            position: 'absolute',
            right: 16,
          }}
          iconColor={color.text.prim}
          onPress={() => navigation.navigate('SearchScreen')}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: color.button.defaultBg,
          borderRadius: 100,
          marginHorizontal: 16,
          marginVertical: 8,
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
          value={inputTxt}
          onChangeText={setInputTxt}
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
      <FlatList
        data={lstFriend}
        renderItem={({ item }) => renderFriendData(item)}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={headerFlatList}
        ListFooterComponent={renderLoader}
        onEndReached={loadListFriend}
        onEndReachedThreshold={0}
      />
    </View>
  );
};

export default ListFriendScreen;
