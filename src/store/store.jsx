import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from './Reducers/BookingReducer'; 

const store = configureStore({
  reducer: {
    booking: bookingReducer,
  },
});

export default store;
