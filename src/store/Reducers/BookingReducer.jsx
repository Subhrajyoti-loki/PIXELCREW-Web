import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookingId: '',
};

const BookingReducer = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookingId(state, action) {
      state.bookingId = action.payload;
    },
  },
});

export const { setBookingId } = BookingReducer.actions;

export default BookingReducer.reducer;
