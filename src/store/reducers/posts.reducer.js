import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import postsService from '../../services/posts.service';

export const getListPost = createAsyncThunk(
  'posts/list',
  async (userToken, { rejectWithValue }) => {
    const res = await postsService.getList(userToken);
    if (res.success) {
      return res.data.data;
    } else {
      return rejectWithValue();
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    lstPost: [],
    selectedPost: null,
  },
  reducers: {
    /**
     * Chọn một bài đăng
     * @param {*} state
     * @param {*} action
     */
    setSelectedPost(state, action) {
      state.selectedPost = action.payload;
    },
    /**
     * Thêm bài viết mới vào đầu danh sách
     * @param {*} state
     * @param {*} action
     */
    insertNewPost(state, action) {
      state.lstPost.unshift(action.payload);
    },
  },
  extraReducers: {
    [getListPost.fulfilled]: (state, action) => {
      state.lstPost = action.payload;
    },
  },
});

const postsReducer = postsSlice.reducer;

// Selector
export const postsSelector = (state) => state.postsReducer;

// Actions
export const { insertNewPost, setSelectedPost } = postsSlice.actions;

// Reducer
export default postsReducer;
