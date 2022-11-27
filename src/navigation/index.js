import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setAuthToken } from '../helpers';
import {
  HomeScreen,
  LoginScreen,
  PostDetailScreen,
  RegisterScreen,
} from '../screens';
import { authSelector } from '../store/reducers/auth.reducer';

const Stack = createStackNavigator();

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
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='PostDetailScreen' component={PostDetailScreen} />
          <Stack.Screen name='HomeScreen' component={HomeScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default RootNavigation;
