import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// Get user from localStorage
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const initialState = {
    user: user,
    hotels: [],
    hotel: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

// Register new user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        const response = await authService.register(user);
        console.log(user);
        return response;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
                        error.message || 
                        error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
                        error.message || 
                        error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});


// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout();
});


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
            state.user = null;
            // state.hotels = [];
            // state.hotel = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;                
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
            
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
