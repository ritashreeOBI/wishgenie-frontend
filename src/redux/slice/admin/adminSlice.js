import { ADMIN_CHECK_AUTH } from "@/api/AdminApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
export const checkAuthOnLoadAdmin = createAsyncThunk('userAuth/checkAuthOnLoadAdmin', async (userData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios({
      method: 'GET', url: ADMIN_CHECK_AUTH, headers: {
        Authorization: `${token}`,
      },
    });
    console.log('response', response)
    return response.data;
  } catch (error) {
    console.log('error', error)
    if (err.response.data) {
      return rejectWithValue(err.response.data.message)
    } else {
      throw new Error('Failed to authenticate');
    }
  }
});
export const adminSlice = createSlice({
  name: "adminSlice",
  initialState: {
    isLogin: false,
    isLoading: false,
    user: {
      createdAt: "",
      email: "",
      roleType: "",
      updatedAt: "",
      userId: "",
      userName: "",
      // verified: null
    },
  },
  reducers: {
    loginHandler: (state, action) => {
      const { user, token } = action.payload
      state.user = user
      state.isLogin = true;
      localStorage.setItem('token', token)

    },
    logoutHandler: (state) => {
      state.isLogin = false;
      localStorage.removeItem('token')
      state.user = {
        createdAt: "",
        email: "",
        roleType: "",
        updatedAt: "",
        userId: "",
        userName: "",
        // verified: null
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthOnLoadAdmin.pending, (state) => {
        state.isLoading = false;
        // state.isLoading = true;
      })
      .addCase(checkAuthOnLoadAdmin.fulfilled, (state, action) => {
        const { user } = action.payload
        state.isLoading = false;
        state.isLogin = true;
        state.user = user;
        // localStorage.setItem("chatUserId", id);
      })
      .addCase(checkAuthOnLoadAdmin.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { loginHandler, logoutHandler } = adminSlice.actions;

export default adminSlice.reducer;
