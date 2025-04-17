// Handles loading, success, error, and logic for the booking flow

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bookingService from './bookingService';

export const createBooking = createAsyncThunk('booking/create', async (payload, thunkAPI) => {
  try {
    return await bookingService.createBooking(payload.hotelId, payload.bookingDate, payload.userId);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Booking failed');
  }
});

const bookingSlice = createSlice({
  name: 'booking',
  initialState: { isLoading: false, isSuccess: false, isError: false, message: '' },
  reducers: {
    reset: (state) => { /* resets state */ },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => { state.isLoading = true; })
      .addCase(createBooking.fulfilled, (state) => { state.isLoading = false; state.isSuccess = true; })
      .addCase(createBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const getBooking = createAsyncThunk(
  'booking/getOne',
  async (bookingId, thunkAPI) => {
    try {
      return await bookingService.getBooking(bookingId);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Error getting booking';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const { reset } = bookingSlice.actions;
export default bookingSlice.reducer;
