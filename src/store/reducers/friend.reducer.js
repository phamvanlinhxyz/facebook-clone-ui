import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import friendService from '../../services/friend.service';

/**
 * Lấy 1 lời mời kết bạn
 */
export const getSingleRequest = createAsyncThunk(
  'friend/getSingleRequest',
  async (sender) => {
    const res = await friendService.singleRequest(sender);
    if (res.success) {
      return res.data;
    }
    return null;
  }
);

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

/**
 * Lấy danh sách bạn bè
 */
export const getListFriend = createAsyncThunk(
  'friend/listFriend',
  async ({ userToken, offset, search }) => {
    if (!search) {
      search = '';
    }
    const res = await friendService.listFriend(userToken, offset, search);
    if (res.success) {
      return res.data;
    }
    return [];
  }
);

/**
 * Lấy danh sách bạn bè theo tìm kiếm
 */
export const getListFriendBySearch = createAsyncThunk(
  'friend/listFriendBySearch',
  async ({ userToken, search }) => {
    console.log(search);
    if (!search) {
      search = '';
    }
    const res = await friendService.listFriend(userToken, 0, search);
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
    totalRequests: 0,
    loadingRequest: true,
    lstSuggest: [],
    totalSuggests: 0,
    loadingSuggest: true,
    lstFriend: [],
    totalFriends: 0,
    loadingFriend: true,
  },
  reducers: {
    /**
     * Xét trạng thái load bạn bè
     * @param {*} state
     * @param {*} action
     */
    setLoadingFriend(state, action) {
      state.loadingFriend = action.payload;
    },
    /**
     * Nhận lời mời kết bạn mới
     * @param {*} state
     * @param {*} action
     */
    pushNewRequest(state, action) {
      state.lstRequest.unshift(action.payload);
      state.totalRequests++;
    },
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
  extraReducers: (builder) => {
    builder.addCase(getListRequest.pending, (state) => {
      state.loadingRequest = true;
    });
    builder.addCase(getListRequest.fulfilled, (state, action) => {
      state.lstRequest = [...state.lstRequest, ...action.payload.data];
      state.totalRequests = action.payload.totalRequests;
      state.loadingRequest = false;
    });
    builder.addCase(getListSuggest.pending, (state) => {
      state.loadingSuggest = true;
    });
    builder.addCase(getListSuggest.fulfilled, (state, action) => {
      state.lstSuggest = [...state.lstSuggest, ...action.payload.data];
      state.totalSuggests = action.payload.totalSuggests;
      state.loadingSuggest = false;
    });
    builder.addCase(getSingleRequest.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.lstRequest.unshift(action.payload.data);
      }
    });
    builder.addCase(getListFriend.pending, (state) => {
      state.loadingFriend = true;
    });
    builder.addCase(getListFriend.fulfilled, (state, action) => {
      if (action.payload) {
        state.lstFriend = [...state.lstFriend, ...action.payload.data];
        state.totalFriends = action.payload.totalFriends;
        state.loadingFriend = false;
      }
    });
    builder.addCase(getListFriendBySearch.pending, (state) => {
      state.lstFriend = [];
      state.loadingFriend = true;
    });
    builder.addCase(getListFriendBySearch.fulfilled, (state, action) => {
      state.lstFriend = action.payload.data;
      state.totalFriends = action.payload.totalFriends;
      state.loadingFriend = false;
    });
  },
});

const friendReducer = friendSlice.reducer;

// Selector
export const friendSelector = (state) => state.friendReducer;

// Actions
export const { replyRequest, sendRequest, pushNewRequest, setLoadingFriend } =
  friendSlice.actions;

// Reducer
export default friendReducer;
