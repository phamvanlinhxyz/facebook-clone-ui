import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, IconButton, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { SingleRequest, SingleSuggest } from '../../components';
import { getSocket } from '../../core/common/commonFunction';
import constant from '../../core/common/constant';
import { enumNotificationType } from '../../core/common/enum';
import { color } from '../../core/common/styleVariables';
import { friendResource } from '../../resources';
import friendService from '../../services/friend.service';
import { authSelector } from '../../store/reducers/auth.reducer';
import {
  friendSelector,
  getListRequest,
  getListSuggest,
  replyRequest,
  sendRequest,
} from '../../store/reducers/friend.reducer';

const FriendScreen = ({ navigation }) => {
  const { userToken } = useSelector(authSelector);
  const { lstRequest, totalRequests, lstSuggest, totalSuggests } =
    useSelector(friendSelector);
  const dispatch = useDispatch();

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!socket) {
      setSocket(getSocket());
    }
  }, []);

  /**
   * Lấy danh sách lời mời
   */
  useEffect(() => {
    setTimeout(() => {
      dispatch(getListRequest({ userToken, offset: lstRequest.length }));
      dispatch(getListSuggest({ userToken, offset: 0 }));
    }, 200);
  }, []);

  /**
   * Trả lời yêu cầu kết bạn
   * @param {*} sender
   * @param {*} isAccept
   */
  const handleReplyRequest = async (sender, isAccept) => {
    const res = await friendService.replyRequest(sender, isAccept);

    if (res.success) {
      dispatch(replyRequest(sender));
      if (isAccept) {
        socket.emit('pushNotification', {
          token: userToken,
          receiverId: sender,
          type: enumNotificationType.acceptRequest,
        });
      }
    }
  };

  /**
   * Gửi lời mời kết bạn
   * @param {*} receiverId
   */
  const handleSendRequest = async (receiverId) => {
    const res = await friendService.sendRequest(receiverId);
    if (res.success) {
      dispatch(sendRequest(receiverId));
      socket.emit('pushNotification', {
        token: userToken,
        receiverId: receiverId,
        type: enumNotificationType.requestFriend,
      });
    }
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
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            padding: 12,
            flexDirection: 'row',
            borderBottomColor: color.other.separator,
            borderBottomWidth: 1,
          }}
        >
          {totalSuggests > constant.LOAD_LIMIT && (
            <Button
              style={{
                backgroundColor: color.button.defaultBg,
                marginRight: 8,
              }}
              labelStyle={{ color: color.text.prim, fontSize: 16 }}
              contentStyle={{ justifyContent: 'flex-start' }}
              onPress={{}}
            >
              {friendResource.suggest}
            </Button>
          )}
          {totalRequests > constant.LOAD_LIMIT && (
            <Button
              style={{
                backgroundColor: color.button.defaultBg,
                marginRight: 8,
              }}
              labelStyle={{ color: color.text.prim, fontSize: 16 }}
              contentStyle={{ justifyContent: 'flex-start' }}
              onPress={{}}
            >
              {friendResource.friendRequest}
            </Button>
          )}
          <Button
            style={{ backgroundColor: color.button.defaultBg }}
            labelStyle={{ color: color.text.prim, fontSize: 16 }}
            contentStyle={{ justifyContent: 'flex-start' }}
            onPress={() => navigation.navigate('ListFriendScreen')}
          >
            {friendResource.friend}
          </Button>
        </View>
        {lstRequest && lstRequest.length > 0 && (
          <View style={{ padding: 12 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontSize: 22, fontWeight: '600' }}>
                {friendResource.friendRequest}
              </Text>
              {totalRequests > constant.LOAD_LIMIT && (
                <Text style={{ fontSize: 16, color: color.text.second }}>
                  {friendResource.seeAll}
                </Text>
              )}
            </View>
            {lstRequest.slice(0, 10).map((req, i) => {
              return (
                <SingleRequest req={req} reply={handleReplyRequest} key={i} />
              );
            })}
            {totalRequests > constant.LOAD_LIMIT && (
              <Button
                style={{
                  borderRadius: 6,
                  backgroundColor: color.button.defaultBg,
                  marginTop: 12,
                }}
                textColor={color.text.prim}
                labelStyle={{ fontSize: 16 }}
                onPress={{}}
              >
                {friendResource.seeAll}
              </Button>
            )}
          </View>
        )}
        {lstSuggest && lstSuggest.length > 0 && (
          <View style={{ padding: 12 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontSize: 22, fontWeight: '600' }}>
                {friendResource.suggest}
              </Text>
              {totalSuggests > constant.LOAD_LIMIT && (
                <Text style={{ fontSize: 16, color: color.text.second }}>
                  {friendResource.seeAll}
                </Text>
              )}
            </View>
            {lstSuggest.slice(0, 10).map((suggest, i) => {
              return (
                <SingleSuggest
                  suggest={suggest}
                  action={{ handleSendRequest }}
                  key={i}
                />
              );
            })}
            {totalSuggests > constant.LOAD_LIMIT && (
              <Button
                style={{
                  borderRadius: 6,
                  backgroundColor: color.button.defaultBg,
                  marginTop: 12,
                }}
                textColor={color.text.prim}
                labelStyle={{ fontSize: 16 }}
                onPress={{}}
              >
                {friendResource.seeAll}
              </Button>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default FriendScreen;
