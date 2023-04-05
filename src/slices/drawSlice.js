import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  store: [],
  vageStore: [],
  mapSrc: [],
  vageMapSrc: [],
}

export const drawSlice = createSlice({
  name: 'draw',
  initialState,
  reducers: {
    setStoreData: (state, action) => {
      state.store = action.payload;
    },
    setVageStoreData: (state, action) => {
      state.vageStore = action.payload;
    },
    setStoreSrc: (state, action) => {
      state.mapSrc = action.payload;
    },
    setVageStoreSrc: (state, action) => {
      state.vageMapSrc = action.payload;
    },
    changeDrawShop: (state, action) => {
      state.store[0] = state.store.splice(action.payload, 1, state.store[0])[0];
    },
    changeDrawVageShop: (state, action) => {
      state.vageStore[0] = state.vageStore.splice(action.payload, 1, state.vageStore[0])[0];
    },
    changeDrawSrc: (state, action) => {
      state.mapSrc[0] = state.mapSrc.splice(action.payload, 1, state.mapSrc[0])[0];
    },
    changeDrawVageSrc: (state, action) => {
      state.vageMapSrc[0] = state.vageMapSrc.splice(action.payload, 1, state.vageMapSrc[0])[0];
    }
  },
})

// Action creators are generated for each case reducer function
export const { setStoreData, setVageStoreData, setStoreSrc, setVageStoreSrc, changeDrawShop, changeDrawVageShop, changeDrawSrc, changeDrawVageSrc } = drawSlice.actions

export default drawSlice.reducer