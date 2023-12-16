import { shopping_results } from "@/components/originalList";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messageQueue: [
    {
      message:
        "Welcome to Wish Genie,your shopping assistant! Simply share an image or describe what it is you want.",
      user: false,
      action: false,
    },
  ],
  userName: "user",
  pending: false,
  api: "",
  keyword: "",
  reqQuery: "",
  error: false,
  detectionFeature: false,
  selectedDetectedFeature: "",
  products: [],
  openModal: false,
  showPastedImage: false,
  uploadImageStatus: false,
  chatMessageing: false,
  isChatVisible: true,
};

export const chatInteraction = createSlice({
  name: "chatInteraction",
  initialState,

  reducers: {
    ChatActionInitiated: (state) => {
      state.pending = true;
    },
    ChatActionResult: (state, action) => {
      state.pending = false;
      state.messageQueue = [...state.messageQueue, action.payload];
      state.api = action.payload.api;
      state.keyword = action.payload.keyword;
      state.detectionFeature = action.payload.detectionFeature;
      state.reqQuery = action.payload.reqQuery;
    },

    SeletedDeteactedFeature: (state, action) => {
      state.selectedDetectedFeature = action.payload.selectedDetectedFeature;
    },
    ChatActionFailed: (state) => {
      state.pending = false;
      state.error = true;
    },
    updateProductList: (state, action) => {
      state.products = action.payload.product;
    },
    clearProductList: (state, action) => {
      state.products = [];
    },
    setKeyword: (state, action) => {
      state.keyword = action.payload.keyword;
    },
    pendingRunning: (state, action) => {
      state.pending = true;
    },
    pendingStop: (state, action) => [(state.pending = false)],

    toggleModal: (state, action) => {
      state.openModal = !state.openModal;
    },
    hidePastedImage: (state, action) => {
      state.showPastedImage = false;
    },
    displayPastedImage: (state, action) => {
      state.showPastedImage = true;
    },
    changeUploadImageStatus: (state, action) => {
      state.uploadImageStatus = action.payload;
    },
    changeChatMessageing: (state, action) => {
      state.chatMessageing = action.payload;
    },

    hideChatBox: (state, action) => {
      state.isChatVisible = false;
    },
    showChatBox: (state, action) => {
      state.isChatVisible = true;
    },
    setMessageQueueFromLocalStorage: (state, action) => {
      state.messageQueue = action.payload;
    },
  },
});

export const {
  ChatActionInitiated,
  ChatActionResult,
  ChatActionFailed,
  SeletedDeteactedFeature,
  updateProductList,
  clearProductList,
  pendingStop,
  pendingRunning,
  setKeyword,
  toggleModal,
  hidePastedImage,
  displayPastedImage,
  changeUploadImageStatus,
  changeChatMessageing,

  showChatBox,
  hideChatBox,
  setMessageQueueFromLocalStorage,
} = chatInteraction.actions;

export default chatInteraction.reducer;
