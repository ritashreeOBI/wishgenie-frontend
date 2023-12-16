import { combineReducers, configureStore } from "@reduxjs/toolkit";
import chatInteraction from "./slices/chatInteraction";
import ProductList from "./slices/ProductSlice";
import adminSlice from "./slices/admin/adminSlice";
import plansSlice from "./slices/admin/plansSlice";
import userAuthSlice from "./slices/user/userAuth";
import userAddressSlice from "./slices/user/userAddressSlice";
import cartSlice from "./slices/user/cartSlice";
import { createWrapper } from "next-redux-wrapper";
import { apiSlice } from "./api/api-slice";
import templateSlice from "./slices/editor/template-slice";
import orderSlice from "./slices/editor/order-slice";
import copiedObjectReducer from "./slices/editor/copied-objects-slice";
import selectedObjectReducer from "./slices/editor/selected-objects-slice";
import stageObjectReducer from "./slices/editor/stage-object-slice";
import frameSlice from "./slices/editor/frame-slice";
import authSlice from "./slices/editor/auth-slice";
import fontListSlice from "./slices/editor/font-list-slice";
import searchQuerySlice from "./slices/art-wall/search-query-slice";

const combinedReducer = combineReducers({
  chatInteraction,
  ProductList,
  adminSlice,
  userAuthSlice,
  userAddressSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
  frame: frameSlice,
  stage: stageObjectReducer,
  selected: selectedObjectReducer,
  auth: authSlice,
  fontList: fontListSlice,
  copied: copiedObjectReducer,
  template: templateSlice,
  order: orderSlice,
  searchQuery: searchQuerySlice,
  cartSlice: cartSlice,
  planSlice: plansSlice,
});

export const store = () =>
  configureStore({
    reducer: combinedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        // immutableCheck: { warnAfter: 128 },
        immutableCheck: false,
      }).concat(apiSlice.middleware),
  });

export const StoreWrapper = createWrapper(store);
