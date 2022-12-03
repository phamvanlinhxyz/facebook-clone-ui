import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchHistory: [],
    currentSearch: null,
    searchResults: [],
  },
  reducers: {
    /**
     * Set tìm kiếm hiện tại
     * @param {*} state
     * @param {*} action
     */
    setCurrentSearch(state, action) {
      state.currentSearch = action.payload;
    },
    /**
     * Cập nhật kết quả tìm kiếm
     * @param {*} state
     * @param {*} action
     */
    setSearchResults(state, action) {
      state.searchResults = action.payload;
    },
    /**
     * Xóa 1 tìm kiếm
     * @param {*} state
     * @param {*} action
     */
    removeSearchHistory(state, action) {
      state.searchHistory = state.searchHistory.filter(
        (search, i) => i !== action.payload
      );
    },
    /**
     * Lưu lịch sử tìm kiếm
     * @param {*} state
     * @param {*} action
     */
    addSearhHistory(state, action) {
      state.currentSearch = action.payload;
      state.searchHistory.unshift(action.payload);
      if (state.searchHistory.length > 20) {
        state.searchHistory.pop();
      }
    },
  },
});

const searchReducer = searchSlice.reducer;

// Selector
export const searchSelector = (state) => state.searchReducer;

// Actions
export const {
  removeSearchHistory,
  addSearhHistory,
  setSearchResults,
  setCurrentSearch,
} = searchSlice.actions;

// Reducer
export default searchReducer;
