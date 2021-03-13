import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./CombineReducer";

export const store = configureStore({
  reducer: rootReducer,
});
