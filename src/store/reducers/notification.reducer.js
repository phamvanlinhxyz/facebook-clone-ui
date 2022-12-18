import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import notificationService from '../../services/notification.service';
import userOptionService from '../../services/userOption.service';

export const getLstNotification = createAsyncThunk(
  'notification/getLstNotification',
  async ({ limit, offset }) => {
    const res = await notificationService.listNotification(limit, offset);
    if (res.success) {
      return res.data;
    }
  }
);
/**
 * Lấy số thông báo chưa đọc
 */
export const getCountUnseenNotification = createAsyncThunk(
  'notification/getCountUnseenNotification',
  async () => {
    const res = await userOptionService.getOptionByName(
      'CountUnseenNotification'
    );
    if (res.success) {
      return res.data.data;
    }
  }
);

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    unseen: '0',
    lstNotification: [],
    totalNotification: 0,
    isLoading: true,
  },
  reducers: {
    /**
     * Cập nhật số thông báo chưa xem
     * @param {*} state
     * @param {*} action
     */
    updateUnseeen(state, action) {
      state.unseen = action.payload;
    },
    /**
     * Cập nhất notification (số thông báo chưa xem, thông báo mới)
     * @param {*} state
     * @param {*} action
     */
    updateNotification(state, action) {
      state.unseen = action.payload.unseenNotification;
      state.lstNotification.unshift(action.payload.newNotification);
    },
    /**
     * Clear danh sách thông báo khi đăng xuất
     * @param {*} state
     */
    clearNotification(state) {
      state.unseen = '0';
      state.lstNotification = [];
      state.totalNotification = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCountUnseenNotification.fulfilled, (state, action) => {
      state.unseen = action.payload.optionValue;
    });
    builder.addCase(getLstNotification.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getLstNotification.fulfilled, (state, action) => {
      state.lstNotification = [
        ...state.lstNotification,
        ...action.payload.data,
      ];
      state.totalNotification = action.payload.total;
      state.isLoading = false;
    });
  },
});

const notificationReducer = notificationSlice.reducer;

// Selector
export const notificationSelector = (state) => state.notificationReducer;

// Actions
export const { updateNotification, updateUnseeen, clearNotification } =
  notificationSlice.actions;

// Reducer
export default notificationReducer;
