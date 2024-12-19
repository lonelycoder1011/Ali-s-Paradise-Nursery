// store.js
import { configureStore } from '@reduxjs/toolkit';
import plantReducer from './plantSlice';
import avReducer from './avSlice';
import sectionthreeReducer from './sectionthreeSlice'
export default configureStore({
  reducer: {
    plant: plantReducer,
    av: avReducer,
    sectionthree: sectionthreeReducer,
  },
});