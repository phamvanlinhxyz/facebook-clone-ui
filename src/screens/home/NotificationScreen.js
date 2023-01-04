import React, { useEffect, useState } from 'react';
import { FlatList, Image, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLstNotification,
  notificationSelector,
} from '../../store/reducers/notification.reducer';
import { color } from '../../core/common/styleVariables';
import { IconButton, Text } from 'react-native-paper';
import notificationResource from '../../resources/notificationResource';
import {
  buildNotificationContent,
  convertTimeToAgo,
  getNotificationIcon,
} from '../../core/common/commonFunction';
import { BSkeleton } from '../../components';
import constant from '../../core/common/constant';

const NotificationScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { lstNotification, isLoading, totalNotification } =
    useSelector(notificationSelector);
  const [offset, setOffset] = useState(
    lstNotification ? lstNotification.length : 0
  );

  /**
   * Gọi api load thêm khi offset thay đổi
   */
  useEffect(() => {
    dispatch(
      getLstNotification({ limit: constant.LOAD_LIMIT, offset: offset })
    );
  }, [offset]);

  /**
   * Cập nhật offset khi cuộn xuống cuối list
   */
  const loadMoreNotif = () => {
    if (lstNotification.length < totalNotification) {
      setOffset(lstNotification.length);
    }
  };

  /**
   * Hiển thị các dòng thông báo
   * @param {*} notif
   * @returns
   */
  const renderNotifData = (notif) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: notif.read
            ? color.transparent
            : color.button.secondBg,
        }}
      >
        <View style={{ position: 'relative' }}>
          <Image
            source={{ uri: notif.sender.avatar.fileLink }}
            style={{ width: 80, height: 80, borderRadius: 100 }}
          />
          <Image
            source={getNotificationIcon(notif.type)}
            resizeMode='cover'
            style={{
              height: 32,
              width: 32,
              position: 'absolute',
              bottom: -4,
              right: -4,
            }}
          />
        </View>
        <View style={{ marginLeft: 16, flex: 1, justifyContent: 'center' }}>
          <Text style={{ fontSize: 16 }}>
            <Text style={{ fontWeight: '600' }}>{notif.sender.username}</Text>
            <Text>{buildNotificationContent(notif.type)}</Text>
          </Text>
          <Text
            style={{
              color: notif.read ? color.text.gray : color.text.second,
            }}
          >
            {convertTimeToAgo(notif.createdAt)}
          </Text>
        </View>
      </View>
    );
  };

  /**
   * Hiển thị skeleton khi load thông báo
   * @returns
   */
  const renderLoader = () => {
    return isLoading ? (
      <>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 16,
            paddingVertical: 12,
          }}
        >
          <BSkeleton style={{ width: 80, height: 80, borderRadius: 40 }} />
          <View style={{ marginLeft: 16, flex: 1, justifyContent: 'center' }}>
            <BSkeleton style={{ height: 20, borderRadius: 6 }} />
            <BSkeleton style={{ marginTop: 8, height: 20, borderRadius: 6 }} />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 16,
            paddingVertical: 12,
          }}
        >
          <BSkeleton style={{ width: 80, height: 80, borderRadius: 40 }} />
          <View style={{ marginLeft: 16, flex: 1, justifyContent: 'center' }}>
            <BSkeleton style={{ height: 20, borderRadius: 6 }} />
            <BSkeleton style={{ marginTop: 8, height: 20, borderRadius: 6 }} />
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
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}
      >
        <Text style={{ fontSize: 28, flex: 1, fontWeight: '600' }}>
          {notificationResource.notification}
        </Text>
        <IconButton
          icon='magnify'
          style={{ margin: 0, backgroundColor: color.button.defaultBg }}
          iconColor={color.text.prim}
          onPress={() => navigation.navigate('SearchScreen')}
        />
      </View>
      <FlatList
        data={lstNotification}
        renderItem={({ item }) => renderNotifData(item)}
        keyExtractor={(item) => item._id}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreNotif}
        onEndReachedThreshold={0}
      />
    </View>
  );
};

export default NotificationScreen;
