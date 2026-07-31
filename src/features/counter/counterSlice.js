import { createSlice } from '@reduxjs/toolkit';

/**
 * A trivial slice, kept only so the protected page has something to show and
 * so there is a second reducer demonstrating how state is composed. Delete it
 * when you start building something real.
 */
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 1 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    }
  }
});

export const { increment, decrement } = counterSlice.actions;
export const selectCount = (state) => state.counter.value;
export default counterSlice.reducer;
