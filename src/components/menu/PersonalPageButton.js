import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { color } from '../../core/common/styleVariables';
import { FontAwesome5 } from '@expo/vector-icons';
import { enumFriendInfo, enumNotificationType } from '../../core/common/enum';
import { Text } from 'react-native-paper';
import friendService from '../../services/friend.service';
import { useDispatch, useSelector } from 'react-redux';
import { getSocket } from '../../core/common/commonFunction';
import { authSelector } from '../../store/reducers/auth.reducer';

const PersonalPageButton = ({ status, id }) => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const { user, userToken } = useSelector(authSelector);

  useEffect(() => {
    setSocket(getSocket());
  }, []);

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
        refId: user._id,
      });
    }
  };

  const meButton = null;
  const noneButton = (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        borderRadius: 4,
        backgroundColor: color.button.primBg,
        height: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1,
      }}
      onPress={() => handleSendRequest(id)}
    >
      <FontAwesome5 name='user-plus' size={16} color={color.text.white} />
      <Text
        style={{
          fontSize: 18,
          color: color.text.white,
          marginLeft: 8,
          fontWeight: '600',
        }}
      >
        Thêm bạn bè
      </Text>
    </TouchableOpacity>
  );

  const friendButton = (
    <>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          borderRadius: 4,
          backgroundColor: color.button.defaultBg,
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          flex: 1,
          marginRight: 4,
        }}
      >
        <FontAwesome5 name='user-check' size={16} color={color.text.prim} />
        <Text
          style={{
            fontSize: 18,
            color: color.text.prim,
            marginLeft: 8,
            fontWeight: '600',
          }}
        >
          Bạn bè
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          borderRadius: 4,
          backgroundColor: color.button.primBg,
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          flex: 1,
          marginLeft: 4,
        }}
      >
        <FontAwesome5
          name='facebook-messenger'
          size={16}
          color={color.text.white}
        />
        <Text
          style={{
            fontSize: 18,
            color: color.text.white,
            marginLeft: 8,
            fontWeight: '600',
          }}
        >
          Nhắn tin
        </Text>
      </TouchableOpacity>
    </>
  );

  const requestedButton = (
    <>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          borderRadius: 4,
          backgroundColor: color.button.primBg,
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          flex: 1,
          marginRight: 4,
        }}
      >
        <FontAwesome5 name='user-check' size={16} color={color.text.white} />
        <Text
          style={{
            fontSize: 18,
            color: color.text.white,
            marginLeft: 8,
            fontWeight: '600',
          }}
        >
          Trả lời
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          borderRadius: 4,
          backgroundColor: color.button.defaultBg,
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          flex: 1,
          marginLeft: 4,
        }}
      >
        <FontAwesome5
          name='facebook-messenger'
          size={16}
          color={color.text.prim}
        />
        <Text
          style={{
            fontSize: 18,
            color: color.text.prim,
            marginLeft: 8,
            fontWeight: '600',
          }}
        >
          Nhắn tin
        </Text>
      </TouchableOpacity>
    </>
  );

  const waitButton = (
    <>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          borderRadius: 4,
          backgroundColor: color.button.primBg,
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          flex: 1,
          marginRight: 4,
        }}
      >
        <FontAwesome5 name='user-alt' size={16} color={color.text.white} />
        <Text
          style={{
            fontSize: 18,
            color: color.text.white,
            marginLeft: 8,
            fontWeight: '600',
          }}
        >
          Hủy lời mời
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          borderRadius: 4,
          backgroundColor: color.button.defaultBg,
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          flex: 1,
          marginLeft: 4,
        }}
      >
        <FontAwesome5
          name='facebook-messenger'
          size={16}
          color={color.text.prim}
        />
        <Text
          style={{
            fontSize: 18,
            color: color.text.prim,
            marginLeft: 8,
            fontWeight: '600',
          }}
        >
          Nhắn tin
        </Text>
      </TouchableOpacity>
    </>
  );

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        marginTop: 12,
      }}
    >
      {status === enumFriendInfo.me && meButton}
      {status === enumFriendInfo.none && noneButton}
      {status === enumFriendInfo.friend && friendButton}
      {status === enumFriendInfo.requested && requestedButton}
    </View>
  );
};

export default PersonalPageButton;
