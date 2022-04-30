import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import tripReducer from '../features/trip/tripSlice';
import returnReducer from '../features/return';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        trip: tripReducer,
        return: returnReducer
    },
})