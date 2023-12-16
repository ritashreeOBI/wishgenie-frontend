import { CHECK_AUTH, SEND_OTP, VERIFY_EMAIL_ADDRESS } from "@/api/Api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
export const checkAuthOnLoad = createAsyncThunk('userAuth/checkAuthOnLoad', async (userData, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('u-token')
        const response = await axios({
            method: 'GET', url: CHECK_AUTH, headers: {
                Authorization: `${token}`,
            },
        });
        console.log('response', response)
        return response.data;
    } catch (error) {
        if (error.response.data) {
            return rejectWithValue(error.response.data.message)
        } else {
            throw new Error('Failed to authenticate');
        }
    }
});
export const asyncSendOtp = createAsyncThunk('userAuth/asyncSendOtp', async (email, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('u-token')
        const response = await axios({
            method: 'POST', url: SEND_OTP, headers: {
                Authorization: `${token}`,
            },
            data: {
                email: email
            }
        });
        return response.data;
    } catch (error) {
        if (error.response.data) {
            return rejectWithValue(error.response.data.message)
        } else {
            throw new Error(error.message);
        }
    }
});
export const asyncVerifyOtp = createAsyncThunk('userAuth/asyncVerifyOtp', async (data, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('u-token')
        const response = await axios({
            method: 'POST', url: VERIFY_EMAIL_ADDRESS, headers: {
                Authorization: `${token}`,
            },
            data: {
                email: data.email,
                otp: data.otp
            }
        });
        return response.data;
    } catch (error) {
        console.log('error', error)
        if (error.response.data) {
            return rejectWithValue(error.response.data.message)
        } else {
            throw new Error(error.message);
        }
    }
});

const initialState = {
    isLoading: true,
    loggedIn: false,
    user: {
        createdAt: "",
        email: "",
        roleType: "",
        updatedAt: "",
        userId: "",
        userName: "",
        verified: null
    },
    showVerifyForm: false,
    showOtpForm: false,
}
export const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState: initialState,
    reducers: {
        userLoginHandler: (state, action) => {
            const { user, token } = action.payload
            state.user = user
            state.loggedIn = true;
            localStorage.setItem('u-token', token)
        },
        userLogoutHandler: (state, action) => {
            state.loggedIn = false;
            state.user = {
                createdAt: "",
                email: "",
                roleType: "",
                updatedAt: "",
                userId: "",
                userName: "",
                verified: null
            }
            localStorage.removeItem('u-token')
            localStorage.removeItem('submitted')
            localStorage.removeItem('regEmail')

        },
        userVerifiedHandler: (state, action) => {
            state.user.verified = true
        },
        displayVerifyFormHandler: (state, action) => {
            state.showVerifyForm = true
        },
        hideVerifyFormHandler: (state, action) => {
            state.showVerifyForm = false
        },
        displayOtpFormHandler: (state, action) => {
            state.showOtpForm = true
        },
        hideOtpFormHandler: (state, action) => {
            state.showOtpForm = false
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuthOnLoad.pending, (state) => {
                state.isLoading = true;
            });
        builder
            .addCase(checkAuthOnLoad.fulfilled, (state, action) => {
                console.log('action.payload', action.payload)
                const { user } = action.payload
                state.isLoading = false;
                state.loggedIn = true;
                state.user = user;
                localStorage.setItem("chatUserId", user.email);
            });
        builder
            .addCase(checkAuthOnLoad.rejected, (state, action) => {
                state.isLoading = false;
            });

        builder
            .addCase(asyncSendOtp.fulfilled, (state, action) => {
                console.log('action.payload', action.payload)
                state.showOtpForm = true;
            });

        builder
            .addCase(asyncSendOtp.rejected, (state, action) => {
                console.log('action.payload', action.payload)
            });
        builder
            .addCase(asyncVerifyOtp.fulfilled, (state, action) => {
                console.log('action.payload', action.payload)
                state.showOtpForm = false;
            });

        builder
            .addCase(asyncVerifyOtp.rejected, (state, action) => {
                console.log('action.payload', action.payload)
            });

    },
})


export const { userLoginHandler, userLogoutHandler, userVerifiedHandler } = userAuthSlice.actions

export default userAuthSlice.reducer