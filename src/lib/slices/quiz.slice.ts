import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quiz: {},
  steps: [],
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {},
});

export const {} = quizSlice.actions;

export default quizSlice;
