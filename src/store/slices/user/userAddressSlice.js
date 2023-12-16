import {
  ADD_ADDRESS,
  DELETE_ADDRESS,
  GET_ADDRESSES,
  SET_DEFAULT_ADDRESS,
  UPDATE_ADDRESS,
} from "@/api/Api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getUserAddresses = createAsyncThunk(
  "userAddress/getUserAddresses",
  async (userData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("u-token");
      const response = await axios({
        method: "GET",
        url: GET_ADDRESSES,
        headers: {
          Authorization: `${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        throw new Error("Failed to fetch addresses");
      }
    }
  }
);
export const addUserAddresses = createAsyncThunk(
  "userAddress/addUserAddresses",
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("u-token");
      const response = await axios({
        method: "POST",
        url: ADD_ADDRESS,
        headers: {
          Authorization: `${token}`,
        },
        data: data,
      });
      return response.data;
    } catch (error) {
      if (error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        throw new Error("Failed to add address");
      }
    }
  }
);
export const setDetaultAddress = createAsyncThunk(
  "userAddress/setDetaultAddress",
  async (addressId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("u-token");
      const response = await axios({
        method: "PATCH",
        url: SET_DEFAULT_ADDRESS,
        headers: {
          Authorization: `${token}`,
        },
        data: { addressId: addressId },
      });
      return response.data;
    } catch (error) {
      if (error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        throw new Error("Failed to update");
      }
    }
  }
);
export const updateUserAddress = createAsyncThunk(
  "userAddress/updateUserAddress",
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("u-token");
      const response = await axios({
        method: "PATCH",
        url: UPDATE_ADDRESS,
        headers: {
          Authorization: `${token}`,
        },
        data: data,
      });
      return response.data;
    } catch (error) {
      if (error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        throw new Error("Failed to update");
      }
    }
  }
);
export const deleteUserAddress = createAsyncThunk(
  "userAddress/deleteUserAddress",
  async (addressId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("u-token");
      const response = await axios({
        method: "DELETE",
        url: DELETE_ADDRESS,
        headers: {
          Authorization: `${token}`,
        },
        data: { addressId: addressId },
      });
      return response.data;
    } catch (error) {
      if (error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        throw new Error("Failed to update");
      }
    }
  }
);

const initialState = {
  loadingAddress: true,
  addresses: [],
  selectedAddress: { addressId: "" },
  selectedDeliveryAddress: { addressId: "" },
};
export const userAddressSlice = createSlice({
  name: "userAddress",
  initialState: initialState,
  reducers: {
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
    setSelectedAddressForDelivery: (state, action) => {
      state.selectedDeliveryAddress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserAddresses.pending, (state) => {
      state.loadingAddress = true;
    });
    builder.addCase(getUserAddresses.fulfilled, (state, action) => {
      const { addresses } = action.payload;
      state.loadingAddress = false;
      state.addresses = addresses;
    });
    builder.addCase(getUserAddresses.rejected, (state, action) => {
      state.loadingAddress = false;
    });
    builder.addCase(deleteUserAddress.pending, (state) => {});
    builder.addCase(deleteUserAddress.fulfilled, (state, action) => {
      const { addressId } = action.payload;
      let addresses = state.addresses;
      addresses = addresses.filter(
        (address) => address.addressId !== addressId
      );
      state.addresses = addresses;
    });
    builder.addCase(deleteUserAddress.rejected, (state, action) => {});
  },
});

export const { setSelectedAddress, setSelectedAddressForDelivery } =
  userAddressSlice.actions;

export default userAddressSlice.reducer;
