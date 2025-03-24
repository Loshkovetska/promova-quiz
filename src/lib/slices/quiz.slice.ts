import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  quiz: {},
  steps: [],
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setInitialState(state) {},
    updateState(
      state,
      action: PayloadAction<{ key: string; selected: string[]; next: string }>
    ) {},
  },
});

export const { setInitialState, updateState } = quizSlice.actions;

export default quizSlice;
