import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';

const store = configureStore({
 reducer: {
 user: userSlice,
 },
 devTools: true,
});

export { store };

