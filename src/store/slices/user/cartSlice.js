import { GET_ADDRESSES } from "@/api/Api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// export const getUserAddresses = createAsyncThunk(
//   "cart/getUserAddresses",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("u-token");
//       const response = await axios({
//         method: "GET",
//         url: GET_ADDRESSES,
//         headers: {
//           Authorization: `${token}`,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       if (error.response.data) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         throw new Error("Failed to fetch addresses");
//       }
//     }
//   }
// );

const initialState = {
  cartList: [
    {
      id: 100,
      img: "/dummy-Image-request/tshirt01.png",
      qty: 1,
      price: 49,
    },
    {
      id: 101,
      img: "/dummy-Image-request/tshirt02.png",
      qty: 2,
      price: 49,
    },
    {
      id: 102,
      img: "/dummy-Image-request/tshirt03.png",
      qty: 1,
      price: 69,
    },
  ],
};
export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    removeCartItemById: (state, action) => {
      const id = action.payload;
      console.log("id", id);
      state.cartList = state.cartList.filter((product) => product.id !== id);
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(getUserAddresses.pending, (state) => {
  //     state.loadingAddress = true;
  //   });
  // },
});

export const { removeCartItemById } = cartSlice.actions;

export default cartSlice.reducer;
