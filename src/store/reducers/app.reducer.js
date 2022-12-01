import { createSlice } from '@reduxjs/toolkit';
import { enumEditMode } from '../../core/common/enum';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    editMode: enumEditMode.add,
  },
  reducers: {
    /**
     * Tùy chỉnh editMode cho các thao tác
     * @param {*} state
     * @param {*} action
     */
    setEditmode(state, action) {
      state.editMode = action.payload;
    },
  },
});

const appReducer = appSlice.reducer;

// Selector
export const appSelector = (state) => state.appReducer;

// Actions
export const { setEditmode } = appSlice.actions;

// Reducer
export default appReducer;
