import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticate: false,
    user: null,
    userToken: null,
  },
  reducers: {
    /**
     * Lưu thông tin use sau khi đăng nhập/đăng ký
     * @param {*} state
     * @param {*} action
     * Created by: phamvanlinhxyz - 15.11.2022
     */
    setUserInfo(state, action) {
      state.isAuthenticate = true;
      state.user = action.payload.data;
      state.userToken = action.payload.token;
    },
    /**
     * Đăng xuất
     * @param {*} state
     * @param {*} action
     */
    logout(state, action) {
      state.isAuthenticate = false;
    },
  },
  extraReducers: {},
});

const authReducer = authSlice.reducer;

// Selector
export const authSelector = (state) => state.authReducer;

// Actions
export const { setUserInfo, logout } = authSlice.actions;

// Reducer
export default authReducer;
