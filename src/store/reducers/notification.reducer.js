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
      return res.data.data;
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
  },
  extraReducers: {
    [getCountUnseenNotification.fulfilled]: (state, action) => {
      state.unseen = action.payload.optionValue;
    },
    [getLstNotification.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getLstNotification.fulfilled]: (state, action) => {
      state.lstNotification = action.payload;
      state.isLoading = false;
    },
  },
});

const notificationReducer = notificationSlice.reducer;

// Selector
export const notificationSelector = (state) => state.notificationReducer;

// Actions
export const { updateNotification, updateUnseeen } = notificationSlice.actions;

// Reducer
export default notificationReducer;
