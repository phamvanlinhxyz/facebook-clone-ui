import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticate: false,
    user: null,
    userToken: null,
    firstName: '',
    middleName: '',
    lastName: '',
  },
  reducers: {
    /**
     * Cập nhật thông tin user
     * @param {*} state
     * @param {*} action
     */
    updateUserInfo(state, action) {
      state.user = action.payload.data;
      state.firstName = action.payload.data.firstName;
      state.middleName = action.payload.data.middleName;
      state.lastName = action.payload.data.lastName;
    },
    /**
     * Lưu tạm tên
     * @param {*} state
     * @param {*} action
     */
    saveTempName(state, action) {
      state.firstName = action.payload.firstName;
      state.middleName = action.payload.middleName;
      state.lastName = action.payload.lastName;
    },
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
      state.firstName = action.payload.data.firstName;
      state.middleName = action.payload.data.middleName;
      state.lastName = action.payload.data.lastName;
    },
    /**
     * Đăng xuất
     * @param {*} state
     * @param {*} action
     */
    logout(state) {
      state.isAuthenticate = false;
    },
  },
});

const authReducer = authSlice.reducer;

// Selector
export const authSelector = (state) => state.authReducer;

// Actions
export const { setUserInfo, logout, saveTempName, updateUserInfo } =
  authSlice.actions;

// Reducer
export default authReducer;
