import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import friendService from '../../services/friend.service';

/**
 * Lấy danh sách lời mời kết bạn
 */
export const getListRequest = createAsyncThunk(
  'friend/listRequest',
  async ({ userToken, offset }) => {
    const res = await friendService.listRequest(userToken, offset);
    if (res.success) {
      return res.data;
    }
    return [];
  }
);

/**
 * Lấy danh sách gợi ý
 */
export const getListSuggest = createAsyncThunk(
  'friend/listSuggest',
  async ({ userToken, offset }) => {
    const res = await friendService.listSuggest(userToken, offset);
    if (res.success) {
      return res.data;
    }
    return [];
  }
);

const friendSlice = createSlice({
  name: 'friend',
  initialState: {
    lstRequest: [],
    friends: [],
    totalRequests: 0,
    loadingRequest: true,
    lstSuggest: [],
    totalSuggests: 0,
    loadingSuggest: true,
  },
  reducers: {
    /**
     * Gửi yêu cầu kết bạn
     * @param {*} state
     * @param {*} action
     */
    sendRequest(state, action) {
      state.lstSuggest = state.lstSuggest.filter(
        (req) => req._id !== action.payload
      );
      state.totalSuggests = state.lstSuggest.length;
    },
    /**
     * Trả lời yêu cầu kết bạn
     * @param {*} state
     * @param {*} action
     */
    replyRequest(state, action) {
      state.lstRequest = state.lstRequest.filter(
        (req) => req.sender._id !== action.payload
      );
      state.totalRequests = state.lstRequest.length;
    },
  },
  extraReducers: {
    [getListRequest.pending]: (state, action) => {
      state.loadingRequest = true;
    },
    [getListRequest.fulfilled]: (state, action) => {
      state.lstRequest = [...state.lstRequest, ...action.payload.data];
      state.totalRequests = action.payload.totalRequests;
      state.loadingRequest = false;
    },
    [getListSuggest.pending]: (state, action) => {
      state.loadingSuggest = true;
    },
    [getListSuggest.fulfilled]: (state, action) => {
      state.lstSuggest = [...state.lstSuggest, ...action.payload.data];
      state.totalSuggests = action.payload.totalSuggests;
      state.loadingSuggest = false;
    },
  },
});

const friendReducer = friendSlice.reducer;

// Selector
export const friendSelector = (state) => state.friendReducer;

// Actions
export const { replyRequest, sendRequest } = friendSlice.actions;

// Reducer
export default friendReducer;
