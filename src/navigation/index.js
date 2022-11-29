import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setAuthToken } from '../helpers';
import {
  HomeScreen,
  LoginScreen,
  PostDetailScreen,
  RegisterScreen,
  SinglePostScreen,
} from '../screens';
import { authSelector } from '../store/reducers/auth.reducer';
import { Ionicons } from '@expo/vector-icons';
import { homeResource } from '../resources';
import { color } from '../core/common/styleVariables';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomBar = () => {
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
        name='FriendScreen'
        component={HomeScreen}
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
        name='NotificationScreen'
        component={HomeScreen}
        options={{
          tabBarLabel: homeResource.notification,
          tabBarLabelStyle: { fontSize: 12 },
          tabBarActiveTintColor: color.bluePrim,
          tabBarInactiveTintColor: color.textSecond,
          tabBarIcon: ({ color }) => (
            <Ionicons name='notifications' size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='MeScreen'
        component={PostDetailScreen}
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

  useEffect(() => {
    setAuthToken(userToken);
  }, [userToken]);

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
          <Stack.Screen name='HomeScreen' component={HomeScreen} />
          <Stack.Screen name='PostDetailScreen' component={PostDetailScreen} />
          <Stack.Screen name='SinglePostScreen' component={SinglePostScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default RootNavigation;
