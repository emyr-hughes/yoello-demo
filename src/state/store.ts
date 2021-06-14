import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import basketReducer from "./basketSlice";
import fetchReducer from "./fetchSlice";

const store = configureStore({
  reducer: {
    basket: basketReducer,
    fetch: fetchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
