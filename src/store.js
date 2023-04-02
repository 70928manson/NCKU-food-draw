import { configureStore } from '@reduxjs/toolkit';
import drawReducer from './slices/drawSlice';

export const store = configureStore({
  reducer: {
    drawReducer,
  },
})