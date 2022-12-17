import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import postsService from '../../services/posts.service';

/**
 * Lấy danh sách bài đăng
 */
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
    selectedPost: {},
  },
  reducers: {
    /**
     * Xóa bà viết
     * @param {*} state
     * @param {*} action
     */
    deletePost(state, action) {
      state.lstPost = state.lstPost.filter(
        (post) => post._id !== action.payload
      );
    },
    /**
     * Cập nhật thông tin bài đăng tại trang chủ
     * @param {*} state
     * @param {*} action
     */
    updatePost(state, action) {
      state.lstPost = state.lstPost.map((post) => {
        if (post._id === action.payload._id) {
          return action.payload;
        }
        return post;
      });
    },
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
    /**
     * Clear danh sách bài đăng khi đăng xuất
     * @param {*} state
     */
    clearPost(state) {
      state.lstPost = [];
      state.selectedPost = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getListPost.fulfilled, (state, action) => {
      state.lstPost = action.payload;
    });
  },
});

const postsReducer = postsSlice.reducer;

// Selector
export const postsSelector = (state) => state.postsReducer;

// Actions
export const {
  insertNewPost,
  setSelectedPost,
  updatePost,
  deletePost,
  clearPost,
} = postsSlice.actions;

// Reducer
export default postsReducer;
