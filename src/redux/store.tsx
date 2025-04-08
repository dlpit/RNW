import { configureStore } from "@reduxjs/toolkit";
import recruitmentReducer from "./recruitment/recruitmentSlice";

export const store = configureStore({
  reducer: {
    recruitment: recruitmentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
