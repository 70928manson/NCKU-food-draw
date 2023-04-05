import { combineReducers, configureStore } from '@reduxjs/toolkit';
import drawReducer from './slices/drawSlice';

import { googleSheetApiService } from './services/googleSheetApi';

const reducers = combineReducers({
  draw: drawReducer,
  [googleSheetApiService.reducerPath]: googleSheetApiService.reducer
})

export const store = configureStore({
  reducer: reducers,
  middleware: (getCurrentMiddlewares) => {
    return getCurrentMiddlewares().concat( googleSheetApiService.middleware)
  }
})