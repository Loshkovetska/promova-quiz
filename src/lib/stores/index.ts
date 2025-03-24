import quizSlice from "@/lib/slices/quiz.slice";
import { configureStore } from "@reduxjs/toolkit";

export const store = () => {
  return configureStore({
    reducer: {
      [quizSlice.reducerPath]: quizSlice.reducer,
    },
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
