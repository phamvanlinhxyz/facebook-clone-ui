import { createSlice } from '@reduxjs/toolkit';
import { enumPolicyType } from '../../core/common/enum';

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    policyType: enumPolicyType.term,
  },
  reducers: {
    /**
     * Set kiểu chính sách
     */
    setPolicyType(state, action) {
      state.policyType = action.payload;
    },
  },
});

const menuReducer = menuSlice.reducer;

// Selector
export const menuSelector = (state) => state.menuReducer;

// Actions
export const { setPolicyType } = menuSlice.actions;

// Reducer
export default menuReducer;
