import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import homeReducer from "../features/homeSlice";
import menuReducer from "../features/menuSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
    menu: menuReducer,
  },
});

export default store;
