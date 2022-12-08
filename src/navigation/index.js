import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthToken } from '../helpers';
import {
  HomeScreen,
  LoginScreen,
  AddPostScreen,
  RegisterScreen,
  SinglePostScreen,
  EditPostScreen,
  SearchScreen,
  SearchResultsScreen,
  FriendScreen,
  NotificationScreen,
} from '../screens';
import { authSelector } from '../store/reducers/auth.reducer';
import { Ionicons } from '@expo/vector-icons';
import { homeResource } from '../resources';
import { color } from '../core/common/styleVariables';
import { connectSocket, getSocket } from '../core/common/commonFunction';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import {
  getCountUnseenNotification,
  notificationSelector,
  updateNotification,
  updateUnseeen,
} from '../store/reducers/notification.reducer';
import userOptionService from '../services/userOption.service';
import { userOptionDictionary } from '../core/common/dictionary';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * Tab bạn bè
 * @returns
 */
const FriendTabScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='FriendScreen' component={FriendScreen} />
    </Stack.Navigator>
  );
};

const BottomBar = () => {
  const { unseen } = useSelector(notificationSelector);
  const dispatch = useDispatch();

  return (
    <Tab.Navigator
      initialRouteName='HomeScreen'
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{
          tabBarLabel: homeResource.home,
          tabBarLabelStyle: { fontSize: 12 },
          tabBarActiveTintColor: color.bluePrim,
          tabBarInactiveTintColor: color.textSecond,
          tabBarIcon: ({ color }) => (
            <Ionicons name='home' size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='FriendTabScreen'
        component={FriendTabScreen}
        options={{
          tabBarLabel: homeResource.friend,
          tabBarLabelStyle: { fontSize: 12 },
          tabBarActiveTintColor: color.bluePrim,
          tabBarInactiveTintColor: color.textSecond,
          tabBarIcon: ({ color }) => (
            <Ionicons name='people-sharp' size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='WatchScreen'
        component={HomeScreen}
        options={{
          tabBarLabel: homeResource.watch,
          tabBarLabelStyle: { fontSize: 12 },
          tabBarActiveTintColor: color.bluePrim,
          tabBarInactiveTintColor: color.textSecond,
          tabBarIcon: ({ color }) => (
            <Ionicons name='tv' size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='NotificationScreen'
        component={NotificationScreen}
        options={{
          tabBarLabel: homeResource.notification,
          tabBarLabelStyle: { fontSize: 12 },
          tabBarActiveTintColor: color.bluePrim,
          tabBarInactiveTintColor: color.textSecond,
          tabBarIcon: ({ color }) => (
            <View style={{ position: 'relative' }}>
              <Ionicons name='notifications' size={24} color={color} />
              {unseen !== '' && unseen !== '0' && (
                <Text style={styles.iconNumber}>{unseen}</Text>
              )}
            </View>
          ),
        }}
        listeners={{
          tabPress: async () => {
            console.log(111);
            await userOptionService.updateOptionByName(
              userOptionDictionary.countUnseenNotification,
              '0'
            );
            dispatch(updateUnseeen('0'));
          },
        }}
      />
      <Tab.Screen
        name='MeScreen'
        component={AddPostScreen}
        options={{
          tabBarLabel: homeResource.me,
          tabBarLabelStyle: { fontSize: 12 },
          tabBarActiveTintColor: color.bluePrim,
          tabBarInactiveTintColor: color.textSecond,
          tabBarIcon: ({ color }) => (
            <Ionicons name='person-circle' size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const RootNavigation = () => {
  const { isAuthenticate, userToken } = useSelector(authSelector);
  const [socket, setSocket] = useState(getSocket());
  const dispatch = useDispatch();

  useEffect(() => {
    if (userToken) {
      setAuthToken(userToken);
      let appSocket = connectSocket(userToken);
      if (!socket) {
        setSocket(appSocket);
      }
      dispatch(getCountUnseenNotification());
    }
  }, [userToken]);

  useEffect(() => {
    if (socket) {
      socket.on('pushNotification', (msg) => {
        dispatch(updateNotification(msg.data));
      });
    }
  }, [socket]);

  return (
    <NavigationContainer>
      {!isAuthenticate ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='LoginScreen' component={LoginScreen} />
          <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name='BottomBar'
            component={BottomBar}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen name='HomeScreen' component={HomeScreen} /> */}
          <Stack.Screen name='AddPostScreen' component={AddPostScreen} />
          <Stack.Screen name='SinglePostScreen' component={SinglePostScreen} />
          <Stack.Screen name='EditPostScreen' component={EditPostScreen} />
          <Stack.Screen name='SearchScreen' component={SearchScreen} />
          <Stack.Screen
            name='SearchResultsScreen'
            component={SearchResultsScreen}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  iconNumber: {
    position: 'absolute',
    color: '#fff',
    backgroundColor: '#d8163d',
    paddingHorizontal: 6,
    paddingVertical: 2,
    fontSize: 12,
    borderRadius: 10,
    right: -4,
    top: -2,
  },
});

export default RootNavigation;
