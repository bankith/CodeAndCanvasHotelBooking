import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import hotelService from './hotelService';


const initialState = {    
    hotels: [],
    hotel: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

// Get All Hotels
export const getAllHotels = createAsyncThunk('hotels', async (user, thunkAPI) => {
    try {
        
        return await hotelService.getAllHotels();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
                        error.message || 
                        error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get hotel
export const getHotel = createAsyncThunk('gethotel', async (hotelId, thunkAPI) => {
    try {
        return await hotelService.getHotel(hotelId);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
                        error.message || 
                        error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});



export const hotelSlice = createSlice({
    name: 'hotel',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
            // state.hotels = [];
            // state.hotel = null;
        }
    },
    extraReducers: (builder) => {
        builder            
            .addCase(getAllHotels.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;                
                state.hotels = [];
            })
            .addCase(getAllHotels.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;                
                state.hotels = action.payload.data;
            })
            .addCase(getHotel.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;                
                state.hotel = null;
            })
            .addCase(getHotel.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;                
                state.hotel = action.payload.data;
            })
            
    }
});

export const { reset } = hotelSlice.actions;
export default hotelSlice.reducer;
