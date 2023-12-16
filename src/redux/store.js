import { combineReducers, configureStore } from "@reduxjs/toolkit";
import chatInteraction from "./slice/chatInteraction";
import ProductList from "./slice/ProductSlice";
import adminSlice from "./slice/admin/adminSlice";
import userAuthSlice from "./slice/user/userAuth";
import userAddressSlice from "./slice/user/userAddressSlice";
import { createWrapper } from "next-redux-wrapper";

const combinedReducer = combineReducers({
  chatInteraction,
  ProductList,
  adminSlice,
  userAuthSlice,
  userAddressSlice,
});

export const store = () =>
  configureStore({
    reducer: combinedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });

export const StoreWrapper = createWrapper(store);
