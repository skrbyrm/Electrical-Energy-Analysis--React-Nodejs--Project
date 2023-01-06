import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../state/index";
import { api } from "state/api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});


