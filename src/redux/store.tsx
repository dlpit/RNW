import { configureStore } from "@reduxjs/toolkit";
import recruitmentReducer from "./recruitment/recruitmentSlice";
import authReducer from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    recruitment: recruitmentReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
