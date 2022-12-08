import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLstNotification,
  notificationSelector,
} from '../../store/reducers/notification.reducer';
import constant from '../../core/common/constant';
import { color } from '../../core/common/styleVariables';
import { IconButton, Text } from 'react-native-paper';
import notificationResource from '../../resources/notificationResource';
import {
  convertTimeToAgo,
  getNotificationIcon,
} from '../../core/common/commonFunction';
import listIcon from '../../../assets/images/list-icon.png';

const NotificationScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { lstNotification } = useSelector(notificationSelector);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    dispatch(
      getLstNotification({ limit: constant.LOAD_LIMIT, offset: offset })
    );
  }, [offset]);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: 64,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderBottomColor: color.postSeparator,
          borderBottomWidth: 1,
        }}
      >
        <IconButton
          icon='arrow-left'
          style={{ margin: 0 }}
          iconColor={color.textPrim}
          onPress={() => navigation.goBack()}
        />
        <Text style={{ fontSize: 22, flex: 1, textAlign: 'center' }}>
          {notificationResource.notification}
        </Text>
        <IconButton
          icon='magnify'
          style={{ margin: 0 }}
          iconColor={color.textPrim}
          onPress={{}}
        />
      </View>
      <View style={{ flex: 1 }}>
        {lstNotification &&
          lstNotification.map((notif, i) => {
            return (
              <View
                key={i}
                style={{
                  flexDirection: 'row',
                  padding: 12,
                  backgroundColor: notif.read
                    ? color.transparent
                    : color.buttonSecondBg,
                }}
              >
                <View style={{ position: 'relative' }}>
                  <Image
                    source={notif.sender.avatar.fileLink}
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

                <View
                  style={{ marginLeft: 16, flex: 1, justifyContent: 'center' }}
                >
                  <Text style={{ fontSize: 16 }}>{notif.content}</Text>
                  <Text style={{ color: color.textSecond }}>
                    {convertTimeToAgo(notif.createdAt)}
                  </Text>
                </View>
              </View>
            );
          })}
      </View>
    </View>
  );
};

export default NotificationScreen;
