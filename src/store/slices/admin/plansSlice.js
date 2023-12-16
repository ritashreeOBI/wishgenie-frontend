import {
  CREATE_PLAN,
  EDIT_PLAN,
  GET_ALL_PLANS,
  REMOVE_PLAN_BY_ID,
  SET_DEFAULT_PLAN,
} from "@/api/AdminApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllPlans = createAsyncThunk(
  "plans/getAllPlans",
  async (userData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios({
        method: "GET",
        url: GET_ALL_PLANS,
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log("response", response);
      return response.data;
    } catch (error) {
      console.log("error", error);
      if (error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        throw new Error("Failed to fetch plan list");
      }
    }
  }
);

export const deletePlanById = createAsyncThunk(
  "plans/deletePlanById",
  async (planId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios({
        method: "DELETE",
        url: REMOVE_PLAN_BY_ID,
        headers: {
          Authorization: `${token}`,
        },
        data: {
          id: planId,
        },
      });
      console.log("response", response);
      return response.data;
    } catch (error) {
      console.log("error", error);
      if (error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        throw new Error("Failed to fetch plan list");
      }
    }
  }
);
export const addNewPlan = createAsyncThunk(
  "plans/addNewPlan",
  async (planData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios({
        method: "POST",
        url: CREATE_PLAN,
        headers: {
          Authorization: `${token}`,
          "Content-Type": "multipart/form-data",
        },
        data: planData,
      });
      console.log("response", response);
      return response.data;
    } catch (error) {
      console.log("error", error);
      if (error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        throw new Error("Failed to fetch plan list");
      }
    }
  }
);
export const editPlan = createAsyncThunk(
  "plans/editPlan",
  async (planData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios({
        method: "PATCH",
        url: EDIT_PLAN,
        headers: {
          Authorization: `${token}`,
          "Content-Type": "multipart/form-data",
        },
        data: planData,
      });
      console.log("response", response);
      return response.data;
    } catch (error) {
      console.log("error", error);
      if (error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        throw new Error("Failed to fetch plan list");
      }
    }
  }
);
export const setDefaultPlanThunk = createAsyncThunk(
  "plans/setDefaultPlanThunk",
  async (planId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios({
        method: "PATCH",
        url: SET_DEFAULT_PLAN,
        headers: {
          Authorization: `${token}`,
        },
        data: { id: planId },
      });
      console.log("response", response);
      return response.data;
    } catch (error) {
      console.log("error", error);
      if (error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        throw new Error("Failed to fetch plan list");
      }
    }
  }
);
export const plansSlice = createSlice({
  name: "plansSlice",
  initialState: {
    isLoading: false,
    planList: [],
    selectedPlan: {},
  },
  reducers: {
    setSelectedPlan: (state, action) => {
      state.selectedPlan = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPlans.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPlans.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.isLoading = false;
        state.planList = data;
      })
      .addCase(getAllPlans.rejected, (state, action) => {
        state.isLoading = false;
      });
    builder.addCase(deletePlanById.fulfilled, (state, action) => {
      const { data } = action.payload;
      const planList = state.planList.filter((plan) => plan._id !== data._id);
      state.planList = planList;
    });
    builder.addCase(addNewPlan.fulfilled, (state, action) => {
      const { data } = action.payload;
      console.log("data", data);
      const planList = state.planList;
      planList.push(data);
      state.planList = planList;
    });
    builder.addCase(editPlan.fulfilled, (state, action) => {
      const { data } = action.payload;
      console.log("data", data);
      const planList = state.planList;
      const index = planList.findIndex((plan) => plan._id === data._id);
      if (index > -1) {
        planList[index] = data;
      }
      state.planList = planList;
    });
    builder.addCase(setDefaultPlanThunk.fulfilled, (state, action) => {
      const { data } = action.payload;
      let planList = state.planList;
      planList = planList.map((plan) => {
        if (plan._id === data._id) {
          return { ...plan, isDefault: true };
        } else {
          return { ...plan, isDefault: false };
        }
      });

      state.planList = planList;
    });
  },
});

export const { setSelectedPlan } = plansSlice.actions;

export default plansSlice.reducer;
