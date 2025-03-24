import { getQuizSteps } from "@/lib/utils";
import { InitialStateType } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: InitialStateType = {
  quiz: {},
  steps: [],
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setInitialState(state) {
      if (typeof window !== "undefined") {
        const data = sessionStorage.getItem("quiz");
        const currentPath = window.location.pathname.split("/")[2];
        const isQuiz = currentPath !== "result";

        if (data) {
          const st: InitialStateType = JSON.parse(data || "{}");

          if (st.steps.includes("result") && isQuiz) {
            state.steps = [currentPath];
            state.quiz = {};

            sessionStorage.setItem("quiz", JSON.stringify(state));
            return;
          }
          state.quiz = st.quiz;

          state.steps = getQuizSteps(st.steps, currentPath);
          return;
        }
        if (isQuiz) state.steps = [currentPath];
      }
    },
    updateState(
      state,
      action: PayloadAction<{ key: string; selected: string[]; next: string }>
    ) {
      const { key, selected, next } = action.payload;
      state.quiz[key] = selected;

      const inside =
        state.steps.includes("result") && state.steps.includes(key);

      if (inside && !state.steps.includes(next)) {
        state.steps = getQuizSteps(state.steps, key);
      }

      state.steps = getQuizSteps(state.steps, next, key);

      sessionStorage.setItem("quiz", JSON.stringify(state));
    },
  },
});

export const { setInitialState, updateState } = quizSlice.actions;

export default quizSlice;
